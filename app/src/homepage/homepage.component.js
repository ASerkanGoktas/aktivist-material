import tpl from "./homepage.template.html"

class HomepageController{
    constructor(EtkinlikService){
        this.acts = []
        this.et = EtkinlikService;

        EtkinlikService.getAllTemporary().then(response => {
            console.log(response);
            this.acts = response.data;
            
        });
    }
}

export default {
    template: tpl,
    controller: HomepageController
}

HomepageController.$inject = ["EtkinlikService"];