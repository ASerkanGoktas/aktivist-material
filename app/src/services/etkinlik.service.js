class EtkinlikService{


    constructor($http){
        this.http = $http;
        this.selected = {};
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



}

export default EtkinlikService;