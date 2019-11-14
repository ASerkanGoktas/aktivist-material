const Pool = require('pg').Pool

const pool = new Pool({
    user: "kqddeaplbhelix",
    host: "ec2-46-137-113-157.eu-west-1.compute.amazonaws.com",
    database: "d9bblfnn09vkg7",
    port: "5432",
    password: "8257debded76d2a2b1cdf810cfb28939b450e88616b9778ee18b70308922501a"
}/*{
    user: "postgres",
    host: "localhost",
    database: "aktivistlocal",
    port: "5432",
    password: "279157"
}*/)

const getAll = (request, response) => {
    pool.query('SELECT * FROM etkinlik JOIN instances ON (etkinlik.etkinlik_id = instances.etkinlik_id)', (error, results) => {
        console.log('nabeeer be kankaaa');
        if(error){
            console.log("error");
            console.log(error);
        }else{
            response.status(200).json(results.rows);
        }
    });
};

const get_activity = (request, response) => {
    pool.query('SELECT * FROM etkinlik JOIN instances ON' + 
    '(etkinlik.etkinlik_id = instances.etkinlik_id) WHERE instance_id = ' + request.params.id, (error, results) => {
        console.log('off manyak');
        if(error){
            console.log("error");
            console.log(error);
        }
        else{
            response.status(200).json(results.rows[0]);
        }
    });
}

const get_prices_of_act = (request, response) => {
    pool.query('SELECT * FROM fiyat WHERE instance_id = ' + request.params.id, (error, results) => {
        console.log('fiyat caigirldi');
        if(error){
            console.log("error");
            console.log(error);
        }
        else{
            console.log(results.rows);
            response.status(200).json(results.rows);
        }
    });
}

const filter_date = (request, response) => {
    qry = "SELECT * FROM instances JOIN etkinlik ON (etkinlik.etkinlik_id = instances.etkinlik_id) WHERE date >= '" + request.params.date + "'::date";
    console.log(qry);
    pool.query(qry, (error, results) => {
        console.log("filtreleeee");
        console.log(request.params.date);
        
        if(error){
            console.log("error");
            console.log(error);
        }
        else{
            console.log(results.rows);
            response.status(200).json(results.rows);
        }
    });
}

module.exports = {
    getAll,
    get_activity,
    get_prices_of_act,
    filter_date
};