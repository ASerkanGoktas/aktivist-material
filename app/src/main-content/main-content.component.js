import tpl from './main-content.template.html'

class MainContentController {


    constructor($mdMedia, EtkinlikService, $scope) {
      
        this.mdMedia = $mdMedia;
        this.acts = EtkinlikService.loadedActs;
        this.searchText = "";

        this.etc = EtkinlikService;
        
        $scope.$on("sendData", (evt, data) => {
            this.acts = this.etc.loadedActs;
        });

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

    trim_name(name){
        return ((name.length < 60) ? name : name.slice(0, 56) + "...")
    }

}

MainContentController.$inject = ["$mdMedia", "EtkinlikService", "$scope"];

export default {
    template: tpl,
    controller: MainContentController
}