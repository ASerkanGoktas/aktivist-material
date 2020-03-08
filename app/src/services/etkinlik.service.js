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
        } else {
            query = query.concat(NONE, "/");
        }

        if (dateSecond != null) {
            const year = dateSecond.getFullYear()
            const month = parseInt(dateSecond.getMonth()) + 1;
            const day = dateSecond.getDate();

            query = query.concat(year, "-", month, "-", day, "/");
        } else {
            query = query.concat(NONE, "/");
        }


        if (city != null) {
            query = query.concat(city);
        } else {
            query = query.concat(NONE);
        }



        console.log("get method:" + query);
        return this.http.get(query);
    }

    liveSearch(actName) {
        return this.http.get("/livesearch/".concat(actName));
    }

    getActivitiesDistinctWithCount(start, end, type, subtype, city, page_num) {
        const base = "/get_activities_distinct_withCount";
        const NONE = "NONE";

        if (start == null) {
            start = NONE;
        } else {
            const year = start.getFullYear()
            const month = parseInt(start.getMonth()) + 1;
            const day = start.getDate();

            start = `${year}-${month}-${day}`;
        }

        if (end == null) {
            end = NONE;
        } else {
            const year = end.getFullYear()
            const month = parseInt(end.getMonth()) + 1;
            const day = end.getDate();

            end = `${year}-${month}-${day}`;
        }

        if (type == null)
            type = NONE
        if (subtype == null)
            subtype = NONE

        const qry = `${base}/${start}/${end}/${type}/${subtype}/${city}/${page_num}`;
        return this.http.get(qry);
    }

    get_instances(event_id, place_id) {
        return this.http.get(`/get_instances/${event_id}/${place_id}`);
    }


    get_places(type, city) {
        return this.http.get(`/get_places/${type}/${city}`);
    }

    get_moviesByplace(place) {
        return this.http.get(`/get_moviesByplace/${place}`);
    }

    search_name(text, page_num, city) {
        if(city == null){
            city = "NONE"
        }
        return this.http.get(`/search_name/${text}/${page_num}/${city}`);
    }

    get_instances_date(event_id, date, city){
        if(city == "Tüm Şehirler"){
            city = "NONE";
        }

        var date_formatted = this.format_date(date);

        return this.http.get(`/get_instances_date/${event_id}/${date_formatted}/${city}`);
    }

    format_date(date) {
        date = new Date(date);
        const year = date.getFullYear()
        const month = parseInt(date.getMonth()) + 1;
        const day = date.getDate();

        var result = `${year}-${month}-${day}`;
        return result;
    }

    get_propertiesOfplace(place){
        
        return this.http.get(`/get_propertiesOfplace/${place}`);
    }

}

export default EtkinlikService;