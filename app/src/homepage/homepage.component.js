import tpl from "./homepage.template.html"

class HomepageController{
    constructor(EtkinlikService, $rootScope){
        this.acts = []
        this.et = EtkinlikService;
        this.et.get_todays_movies("İstanbul").then(response => {
            this.todays_movies = response.data;
        });

        $rootScope.$broadcast("clearSearch", null);
    }
}

export default {
    template: tpl,
    controller: HomepageController
}

HomepageController.$inject = ["EtkinlikService", "$rootScope"];