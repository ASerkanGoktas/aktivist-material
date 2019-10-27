import tpl from "./homepage.template.html"

class HomepageController{
    constructor(){
        this.acts = [1, 2, 3, 4, 5, 6, 7, 8]
    }
}

export default {
    template: tpl,
    controller: HomepageController
}