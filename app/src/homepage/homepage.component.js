import tpl from "./homepage.template.html"

class HomepageController{
    constructor(EtkinlikService, $rootScope){
        this.acts = []
        this.et = EtkinlikService;

        EtkinlikService.getAllTemporary().then(response => {
            console.log(response);
            this.acts = response.data;
            
        });

        $rootScope.$broadcast("clearSearch", null);
    }
}

export default {
    template: tpl,
    controller: HomepageController
}

HomepageController.$inject = ["EtkinlikService", "$rootScope"];