const Pool = require('pg').Pool

const pool = new Pool( {/*
    user: "kqddeaplbhelix",
    host: "ec2-46-137-113-157.eu-west-1.compute.amazonaws.com",
    database: "d9bblfnn09vkg7",
    port: "5432",
    password: "8257debded76d2a2b1cdf810cfb28939b450e88616b9778ee18b70308922501a"
}  */
    user: "seko",
    host: "localhost",
    database: "aktivist_local",
    port: "5432",
    password: "279157",

})

const get_moviesByPlace = (request, response) => {

    var today = new Date();

        //yy mm dd
    today= `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate() - 10}`;

    var qry = `SELECT DISTINCT ON (event_id) * FROM event JOIN instance ON (event.event_id = instance.event) WHERE
                    instance.place LIKE '${request.params.place}' and date >= '${today}'::date`

    

    pool.query(qry, (error, results) => {
        if(error){
            console.log(error)
        }else{
            response.status(200).json(results.rows)
        }
    });
}

const get_places = (request, response) => {

    var qry = `SELECT DISTINCT place FROM event JOIN instance ON (event.event_id = instance.event) WHERE 
                event.type = '${request.params.type}'`

    pool.query(qry, (error, results) => {
        if(error){
            console.log(error)
        }else{
            response.status(200).json(results.rows);
        }
    });
}


const get_activities_distinct_withCount = (request, response) => {
    
    const NONE = "NONE";

    var card_num = 18;
    var page_num = parseInt(request.params.page_num);
    var start = request.params.start;
    var end = request.params.end; 
    var type = request.params.type;
    var subtype = request.params.subtype;

    var qry = `SELECT * FROM (SELECT event, COUNT(event) AS event_count, MIN(date) AS date FROM instance GROUP BY event, date) AS foo JOIN event ON (event.event_id = foo.event) WHERE`;

    if(start != NONE){
        var start = new Date(start);

        //yy mm dd
        start= `${start.getFullYear()}-${start.getMonth() + 1}-${start.getDate()}`;
        qry = qry.concat(` first_date >= '${start}'::date AND`);
    }

    if(end != NONE){

        var endDate = new Date(end);

        end = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`
        qry = qry.concat(` first_date <= '${end}'::date AND`);
    }

    if(type != NONE){
        qry = qry.concat(` type = '${type}' AND`);
    }

    if(subtype != NONE){
        qry = qry.concat(` subtype = '${subtype}' AND`);
    }

    //To remove last AND
    qry = qry.substring(0, qry.length - 3);

    qry = qry.concat('ORDER BY date')
    
    
    pool.query(qry, (error, results) => {
        
        if(error){
        
        }else{
            
            var start = card_num*(page_num)
            var end = card_num*(page_num + 1)
            var res = results.rows.slice(start, end)
  

            response.status(200).json({rows: res, count: results.rows.length});
        }
    });
};

const get_event = (request, response) => {

    var qry = `SELECT * FROM event WHERE event_id = '${request.params.event_id}'`
    pool.query(qry, (error, results) => {
        
        if(error){
            console.log(error);
        }
        else{
            
            response.status(200).json(results.rows[0]);
        }
    });
}

const get_prices_of_act = (request, response) => {
    pool.query('SELECT * FROM price WHERE instance = ' + request.params.id, (error, results) => {
        
        if(error){
            console.log(error)
        }
        else{
            
            response.status(200).json(results.rows);
        }
    });
}

const get_instances = (request, response) => {  // Tarih'te değişikli yapılacaktır
    var today = new Date();
    var start = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()-3}`;
    var qry = `SELECT *
	FROM event,instance 
	WHERE event = event_id AND name IN
(SELECT name
	FROM event,instance
	WHERE event = event_id AND event_id = '${request.params.event_id}' AND type = 'Sinema' AND date >= '2020-2-11')
UNION
SELECT *
	FROM event,instance
    WHERE event = event_id AND event_id = '${request.params.event_id}' AND date >= '2020-2-11' 
    ORDER BY date;`;

    console.log(qry)

    pool.query(qry, (error, results) =>{
        if(error){
            console.log(error);
        }
        else{
            
            response.status(200).json(results.rows);
        }
    });
}
//Creates a sql query that filters the activities by given paramaters
const filter_activities_date = (request, response) => {

    const NONE = "NONE";
    qry = "SELECT * FROM instance JOIN event ON (event.event_id = instance.event) WHERE";
    let dateFirst, dateSecond, city;
    dateFirst = request.params.datefirst;
    dateSecond = request.params.datesecond;
    city = request.params.city;

    if (dateFirst != NONE){
        qry = qry.concat(" date >= '", dateFirst, "'::date AND");
    }

    if(dateSecond != NONE){
        qry = qry.concat(" date <= '", dateSecond, "'::date AND");
    }

    if(city != NONE){
        qry = qry.concat(" city = '", city, "' AND");
    }

    //To remove last AND
    qry = qry.substring(0, qry.length - 3);
    
    pool.query(qry, (error, results) => {
        
        
        
        if(error){
            
        }
        else{
            
            response.status(200).json(results.rows);
        }
    });
}


const liveSearch = (request, response) => {
    qry = "SELECT DISTINCT ON(name) name, * FROM instance JOIN event ON (event.event_id = instance.event) WHERE";
    qry = qry.concat(" LOWER(event.name) LIKE LOWER('", request.params.actname, "%')");
    qry = qry.concat(" LIMIT 5");

    
    pool.query(qry, (error, results) => {
        if(error){
            
        }else{
            response.status(200).json(results.rows);
            
        }
    });
}

const search_name = (request, response) => {

    qry = `SELECT DISTINCT ON(date) place, * FROM instance JOIN event ON (event.event_id = instance.event) WHERE LOWER(name) LIKE LOWER('%${request.params.text}%') ORDER BY date ASC`

    pool.query(qry, (error, results) => {
        if(error){
            console.log(error);
        }else{
            response.status(200).json(results.rows);
        }
    });
}

const filter_types = (request, response) => {
    var type = request.params.type
    var subtype = request.params.subtype
    qry = "SELECT * FROM instance JOIN event ON (event.event_id = instance.event) WHERE event.type ='"
    qry = qry.concat(type, "'")
    if(subtype != 'null'){
        qry = qry.concat(" AND event.subtype ='", subtype, "'")
    }
        

    
    pool.query(qry, (error, results) => {
        if(error){
            console.log(error)
        }else{
            response.status(200).json(results.rows)
        }
    });
}

const get_instances_date = (request, response) => {
     var date = request.params.date
     var event_id = request.params.event_id

     var qry = `SELECT *
     FROM event,instance
     WHERE event = event_id AND date = '${request.params.date}'::date AND name IN
 (SELECT name
     FROM event,instance
     WHERE event = event_id AND event_id = '${request.params.event_id}' AND type = 'Sinema')
 UNION
 SELECT *
     FROM event,instance
     WHERE event = event_id AND event_id = '${request.params.event_id}'  AND date = '${request.params.date}'::date;`

    console.log(qry)
   

     pool.query(qry, (error, results) =>{
         if(error){
             console.log(error);
         }
         else{
             
             response.status(200).json(results.rows);
         }
     });
 }



module.exports = {
    get_instances,
    get_event,
    get_prices_of_act,
    filter_activities_date,
    liveSearch,
    filter_types,
    get_activities_distinct_withCount,
    get_places,
    get_moviesByPlace,
    search_name,
    get_instances_date
};