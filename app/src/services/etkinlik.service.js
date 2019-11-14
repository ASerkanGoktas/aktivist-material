class EtkinlikService{


    constructor($http){
        this.http = $http;
        this.loadedActs = [];
    }

    getAllTemporary(){
        return this.http.get("/deneme");
    }

    getActivity(instance_id){
        return this.http.get("/get_activity/" + instance_id);
    }

    getPricesOfActivity(instance_id){
        return this.http.get("/get_prices_of_activity/" + instance_id);
    }

    filter_date(date){
        console.log("date:");
        console.log(date);
        console.log(date.getMonth());

        const year = date.getFullYear()
        const month = parseInt(date.getMonth()) + 1;
        const day = date.getDay();
        return this.http.get("/filter_date/".concat(year, "-", month, "-", day));
    }

}

export default EtkinlikService;