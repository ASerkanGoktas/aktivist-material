import tpl from './main-content.template.html'

class MainContentController {


    constructor($mdMedia) {
      
        this.mdMedia = $mdMedia;
        this.acts = []
        for(let i = 0; i<12; i++){
            this.acts.push(i);
        }
        
    }

    isLandscape(){
        return this.mdMedia("landscape");
    };

    isSmaller(brkpoint){
        return this.mdMedia("max-width: " + brkpoint);
    }

    isPhoneLandscape(){

        let probablemaxphonewidth = "750px";

        let land = this.mdMedia("landscape");
        let phone = this.mdMedia("max-width:" + probablemaxphonewidth);

        return land == phone;
    }

    getLayout(){
        
    }
}

MainContentController.$inject = ["$mdMedia"];

export default {
    template: tpl,
    controller: MainContentController
}