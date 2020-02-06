const Pool = require('pg').Pool

const pool = new Pool(/* {
    user: "kqddeaplbhelix",
    host: "ec2-46-137-113-157.eu-west-1.compute.amazonaws.com",
    database: "d9bblfnn09vkg7",
    port: "5432",
    password: "8257debded76d2a2b1cdf810cfb28939b450e88616b9778ee18b70308922501a"
} */{
    user: "seko",
    host: "localhost",
    database: "aktivist_local",
    port: "5432",
    password: "279157",

})


const get_activities_distinct_withCount = (request, response) => {
    
    const NONE = "NONE";

    console.log(request.params);
    var start = request.params.start;
    var end = request.params.end; 
    var type = request.params.type;
    var subtype = request.params.subtype;

    var qry = `SELECT * FROM (SELECT event, COUNT(event) AS event_count, MIN(date) AS first_date FROM instance GROUP BY event, date) AS foo
    JOIN event ON (event.event_id = foo.event) WHERE`;

    if(start != NONE){
        var today = new Date();

        //yy mm dd
        start= `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
        qry = qry.concat(` first_date >= '${start}'::date AND`);
    }

    if(end != NONE){
        qry = qry.concat(` first_date <= '${start}'::date AND`);
    }

    if(type != NONE){
        qry = qry.concat(` type = '${type}' AND`);
    }

    if(subtype != NONE){
        qry = qry.concat(` subtype = ${subtype}' AND`);
    }

    //To remove last AND
    qry = qry.substring(0, qry.length - 3);

    console.log(qry);
    pool.query(qry, (error, results) => {
        
        if(error){
            console.log(error);
        }else{
            console.log("commming");
            response.status(200).json(results.rows);
        }
    });
};

const get_activity = (request, response) => {
    pool.query('SELECT *  FROM event JOIN instance ON' + 
    '(event.event_id = instance.event) WHERE instance_id = ' + request.params.id, (error, results) => {
        
        if(error){
            console.log(error);
        }
        else{
            console.log(results.rows[0]);
            response.status(200).json(results.rows[0]);
        }
    });
}

const get_prices_of_act = (request, response) => {
    pool.query('SELECT * FROM price WHERE instance = ' + request.params.id, (error, results) => {
        
        if(error){
            
        }
        else{
            
            response.status(200).json(results.rows);
        }
    });
}

const get_instances = (request, response) => {
    pool.query("SELECT * FROM instance JOIN event ON (instance.event = '"+ request.params.event_id +"')", (error, results) =>{
        if(error){
            
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

const filter_types = (request, response) => {
    var type = request.params.type
    var subtype = request.params.subtype
    qry = "SELECT * FROM instance JOIN event ON (event.event_id = instance.event) WHERE event.type ='"
    qry = qry.concat(type, "'")
    if(subtype != 'null'){
        qry = qry.concat(" AND event.subtype ='", subtype, "'")
    }
        

    console.log(qry)
    pool.query(qry, (error, results) => {
        if(error){
            console.log(error)
        }else{
            response.status(200).json(results.rows)
        }
    });
}

module.exports = {
    get_instances,
    get_activity,
    get_prices_of_act,
    filter_activities_date,
    liveSearch,
    filter_types,
    get_activities_distinct_withCount
};