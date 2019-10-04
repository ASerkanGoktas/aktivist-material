import tpl from './main-content.template.html'

class MainContentController {


    constructor($mdMedia) {
      
        this.mdMedia = $mdMedia;
        this.acts = []
        for(let i = 0; i<9; i++){
            this.acts.push(i);
        }
        
    }

    isLandscape(){
        return this.mdMedia("landscape");
    };

}

MainContentController.$inject = ["$mdMedia"];

export default {
    template: tpl,
    controller: MainContentController
}