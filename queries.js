const Pool = require('pg').Pool

const pool = new Pool( /* {
    user: "kqddeaplbhelix",
    host: "ec2-46-137-113-157.eu-west-1.compute.amazonaws.com",
    database: "d9bblfnn09vkg7",
    port: "5432",
    password: "8257debded76d2a2b1cdf810cfb28939b450e88616b9778ee18b70308922501a"
}*/ 
{
    user: "postgres",
    host: "localhost",
    database: "0000c",
    port: "5432",
    password: "1998684952",

})

const get_today = () => {
    var today = new Date();

    today= `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    return today;
}


const get_moviesByPlace = (request, response) => {

    var today = new Date();

        //yy mm dd
    today= `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate() - 10}`;

    var qry = `SELECT DISTINCT ON (event_id) * FROM event JOIN instance ON (event.event_id = instance.event) WHERE
                    instance.place = ${request.params.place} and date >= '${today}'::date`

    console.log(qry)
    pool.query(qry, (error, results) => {
        if(error){
            console.log(error)
        }else{
            response.status(200).json(results.rows)
        }
    });
}

const get_places = (request, response) => {

    var type = request.params.type;
    var city = request.params.city;

    var qry = `SELECT DISTINCT ON (instance.place,place.subcity) place.place_name, instance.place AS place_id, place.city, place.subcity
	FROM event, instance, place
			WHERE event.event_id = instance.event AND instance.place = place.place_id AND event.type = '${type}'`

    if(city != "NONE"){
        qry = qry.concat(` AND place.city = '${city}'`);
    }

    qry = qry.concat(` ORDER BY place.subcity,instance.place;`);
    
    console.log(qry)

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
    var city = request.params.city;

    var qry = `SELECT * FROM 
                (SELECT DISTINCT ON(event,date) event, date, instance.place, city
                FROM instance,place WHERE instance.place = place.place_id) AS foo 
                    JOIN event ON (event.event_id = foo.event) WHERE`;

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

    if(city != NONE){
        qry = qry.concat(` city = '${city}' AND`);
    }
    //  selected_discount = '%hopi%' OR '%lale%' OR '%1alana1bedava%' OR  '%TAV%'
/*
    if(selected_discount != NONE){
        qry = qry.concat(` event IN(
            (SELECT event FROM public.instance
               WHERE instance_id IN
               (SELECT instance
                   FROM public.price WHERE price_discount ILIKE '${selected_discount}'))) AND`);
    }
*/
    //To remove last AND
    qry = qry.substring(0, qry.length - 3);

    qry = qry.concat('ORDER BY date')
    console.log(qry)
    pool.query(qry, (error, results) => {
        
        if(error){
        
        }else{
            
            var start = card_num*(page_num - 1)
            var end = card_num*(page_num)
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
    
    var place_condition = "";
    var place = request.params.place_id
    
    if(place == "NONE")
        place_condition = "True"
    else
        place_condition = `place = ${place}`

    var qry = `SELECT *
	FROM event,instance,place 
	WHERE event = event_id AND place.place_id = instance.place AND ${place_condition} AND name IN
(SELECT name
	FROM event,instance
	WHERE event = event_id AND place.place_id = instance.place AND event_id = '${request.params.event_id}' AND type = 'Sinema' AND date >= '${get_today()}')
UNION
SELECT * FROM event,instance,place WHERE event = event_id  AND place.place_id = instance.place AND place.place_id = instance.place AND ${place_condition} AND event_id = '${request.params.event_id}' AND date >= '${get_today()}' ORDER BY date,time;`;

    console.log(qry)
    
    pool.query(qry, (error, results) =>{
        if(error){
            console.log("hello")
            console.log(error);
        }
        else{
            console.log("hello")
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
    qry = qry.concat(" LOWER(event.name) LIKE LOWER('%", request.params.actname, "%')");
    qry = qry.concat(` AND date >= '${get_today()}' LIMIT 5 `);

    console.log(qry);
    pool.query(qry, (error, results) => {
        if(error){
            
        }else{
            response.status(200).json(results.rows);
            
        }
    });
}

const search_name = (request, response) => {

    var city = request.params.city;
    var qry = "";
    if(city == "NONE"){
        qry = `SELECT DISTINCT ON(date) * 
        FROM instance,event,place 
            WHERE event.event_id = instance.event AND instance.place = place.place_id AND LOWER(name) LIKE LOWER('%${request.params.text}%') 
                    `;
    }else{
        qry = `SELECT DISTINCT ON(date) * 
	        FROM instance,event,place 
		        WHERE event.event_id = instance.event AND instance.place = place.place_id AND
			        city = '${request.params.city}' AND LOWER(name) LIKE LOWER('%${request.params.text}%') 
                        `
    }
    //  selected_discount = '%hopi%' OR '%lale%' OR '%1alana1bedava%' OR  '%TAV%'
    /*
    if(selected_discount != NONE){
        qry = qry.concat(` AND event IN(
            (SELECT event FROM public.instance
               WHERE instance_id IN
               (SELECT instance
                   FROM public.price WHERE price_discount ILIKE '${request.params.text}')))`);
    }
    */
    qry = qry.concat('ORDER BY date ASC')

    let card_num = 18;
    let page_num = parseInt(request.params.page_num);
    console.log(qry)
    pool.query(qry, (error, results) => {
        if(error){
            console.log(error);
        }else{
            
            var start = card_num*(page_num - 1)
            var end = card_num*(page_num)
            var res = results.rows.slice(start, end)
  

            response.status(200).json({rows: res, count: results.rows.length});

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
     var city = request.params.city;

     var qry = "";
     if(city == "NONE"){
        qry = `SELECT *
     FROM event,instance,place
     WHERE event = event_id AND instance.place = place.place_id AND date = '${request.params.date}'::date AND name IN
 (SELECT name
     FROM event,instance
     WHERE event = event_id AND event_id = '${request.params.event_id}' AND type = 'Sinema')
 UNION
 SELECT *
     FROM event,instance,place
     WHERE event = event_id AND instance.place = place.place_id AND  event_id = '${request.params.event_id}'  AND date = '${request.params.date}'::date`

     }else{
        
        qry = `SELECT *
        FROM event,instance,place
        WHERE event = event_id AND instance.place = place.place_id AND city ='${city}' AND date = '${request.params.date}'::date AND name IN
    (SELECT name
        FROM event,instance
        WHERE event = event_id AND event_id = '${request.params.event_id}' AND type = 'Sinema')
    UNION
    SELECT *
        FROM event,instance,place
        WHERE event = event_id AND instance.place = place.place_id AND event_id = '${request.params.event_id}' AND city ='${city}' AND date = '${request.params.date}'::date`
     }
     
     qry = qry.concat(" ORDER BY time;")
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

 const get_propertiesOfplace = (request, response) => {
    var qry = `SELECT DISTINCT ON(place.place_id) *
	            FROM place,instance
                    WHERE instance.place = place.place_id AND place.place_id ='${request.params.place}'`
     pool.query(qry, (error, results) =>{
         if(error){
             console.log(error);
         }
         else{
             
             response.status(200).json(results.rows[0]);
         }
     });
 }

const filter_discount= (request, response) => {
    
    var qry = `SELECT * FROM public.event, public.instance, public.price
                WHERE event.event_id = instance.event AND instance.instance_id = price.instance AND event_id IN	
                (SELECT event FROM public.instance
                    WHERE instance_id IN
                    (SELECT instance
                        FROM public.price WHERE price_discount ILIKE '${request.params.selected_discount}'));`
                        // request.params.selected_discount = '%hopi%' OR '%lale%' OR '%1alana1bedava%' OR  '%TAV%'
     pool.query(qry, (error, results) =>{
         if(error){
             console.log(error);
         }
         else{
             
             response.status(200).json(results.rows[0]);
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
    get_instances_date,
    get_propertiesOfplace
};