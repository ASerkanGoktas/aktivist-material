import tpl from "./homepage.template.html"

class HomepageController{
    constructor($http){
        this.acts = []

        $http.get('/deneme').then(response => {
            console.log(response);
            this.acts = response.data;
        });
    }
}

export default {
    template: tpl,
    controller: HomepageController
}

HomepageController.$inject = ["$http"];