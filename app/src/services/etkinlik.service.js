class EtkinlikService {


    constructor($http) {
        this.http = $http;
        this.loadedActs = [];
    }

    getAllTemporary() {
        return this.http.get("/deneme");
    }

    getActivity(instance_id) {
        return this.http.get("/get_activity/" + instance_id);
    }

    getPricesOfActivity(instance_id) {
        return this.http.get("/get_prices_of_activity/" + instance_id);
    }

    filter_activities(dateFirst, dateSecond, city) {

        let query = "/filter_activities/";
        const NONE = "NONE";

        if (dateFirst != null) {
            const year = dateFirst.getFullYear()
            const month = parseInt(dateFirst.getMonth()) + 1;
            const day = dateFirst.getDate();

            query = query.concat(year, "-", month, "-", day, "/");
        }else{
            query = query.concat(NONE, "/");
        }

        if (dateFirst != null) {
            const year = dateSecond.getFullYear()
            const month = parseInt(dateSecond.getMonth()) + 1;
            const day = dateSecond.getDate();

            query = query.concat(year, "-", month, "-", day, "/");
        }else{
            query = query.concat(NONE, "/");
        }


        if(city != null){
            query = query.concat(city);
        }else{
            query = query.concat(NONE);
        }



        console.log("get method:" + query);
        return this.http.get(query);
    }

}

export default EtkinlikService;