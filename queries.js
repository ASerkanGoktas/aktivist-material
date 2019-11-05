const Pool = require('pg').Pool

const pool = new Pool({
    user: "kqddeaplbhelix",
    host: "ec2-46-137-113-157.eu-west-1.compute.amazonaws.com",
    database: "d9bblfnn09vkg7",
    port: "5432",
    password: "8257debded76d2a2b1cdf810cfb28939b450e88616b9778ee18b70308922501a"
})

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

module.exports = {
    getAll
};