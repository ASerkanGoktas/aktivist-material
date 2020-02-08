class EtkinlikService {


    constructor($http) {
        this.http = $http;
        this.loadedActs = [];
        
    }

    getEvent(event_id) {
        return this.http.get("/get_event/" + event_id);
    }

    getPricesOfActivity(instance_id) {
        return this.http.get("/get_prices_of_activity/" + instance_id);
    }

    filter_activities_date(dateFirst, dateSecond, city) {

        let query = "/filter_activities_date/";
        const NONE = "NONE";

        if (dateFirst != null) {
            const year = dateFirst.getFullYear()
            const month = parseInt(dateFirst.getMonth()) + 1;
            const day = dateFirst.getDate();

            query = query.concat(year, "-", month, "-", day, "/");
        }else{
            query = query.concat(NONE, "/");
        }

        if (dateSecond != null) {
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

    liveSearch(actName){
        return this.http.get("/livesearch/".concat(actName));
    }

    getActivitiesDistinctWithCount(start, end, type, subtype){
        const base = "/get_activities_distinct_withCount";
        const NONE = "NONE";

        if(start == null){
            start = NONE;
        }else{
            const year = start.getFullYear()
            const month = parseInt(start.getMonth()) + 1;
            const day = start.getDate();

            start = `${year}-${month}-${day}`;
        }

        if(end == null){
            end = NONE;
        }else{
            const year = end.getFullYear()
            const month = parseInt(end.getMonth()) + 1;
            const day = end.getDate();

            end = `${year}-${month}-${day}`;
        }

        if(type == null)
            type = NONE
        if(subtype == null)
            subtype = NONE

        const qry = `${base}/${start}/${end}/${type}/${subtype}`;
        return this.http.get(qry);
    }

    get_instances(event_id){
        return this.http.get(`/get_instances/${event_id}`);
    }

}

export default EtkinlikService;