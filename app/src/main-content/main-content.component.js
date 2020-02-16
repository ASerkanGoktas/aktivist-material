import tpl from './main-content.template.html'

class MainContentController {


    constructor($mdMedia, EtkinlikService, $scope, $rootScope) {
      
        this.mdMedia = $mdMedia;
        this.searchText = "";
        this.rootScope = $rootScope;
        this.etc = EtkinlikService;
        this.scope = $scope;
        
        this.scope.$on("sendData", (evt, data) => {
            this.acts = data;
            this.showPlaces = false;
        });

        this.scope.$on("sendPlaces", (evt, data) => {
            this.places = data;
            this.showPlaces = true;
        });

        this.scope.$on("filterSet", (evt, data) => {
            this.filters = data;
        });

        this.gunler = {
            0 : "Pazar",
            1 : "Pazartesi",
            2 : "Salı",
            3 : "Çarşamba",
            4 : "Perşembe",
            5 : "Cuma",
            6 : "Cumartesi"
        }

        this.aylar = {
            0 : "Ocak",
            1 : "Şubat",
            2 : "Mart",
            3 : "Nisan",
            4 : "Mayıs",
            5 : "Haziran",
            6 : "Temmuz",
            7 : "Ağustos",
            8 : "Eylül",
            9 : "Ekim",
            10: "Kasım",
            11: "Aralık"
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

    trim_name(name){
        name = name.replace(/=/, "'");
        return ((name.length < 60) ? name : name.slice(0, 56) + "...")
    }

    get_subtitle(act){
        if(!act.place)
            return ""

        if(act.event_count == 1)
            return act.place
        else
            return `${act.event_count} Farklı mekan`
    }

    get_gun(datestr){
        var temp_date = new Date(datestr);

        return this.gunler[temp_date.getDay()];
    }

    toggle_actsOfplace(index, place){
        if(this.selectedIndex === index)
            this.selectedIndex = -1;
        else{
            this.selectedIndex = index;
            this.get_moviesByplace(place)
        }
    }

    get_ay(datestr){
        var temp_date = new Date(datestr);

        return this.aylar[temp_date.getMonth()];
    }

    get_saat(timestr){
        var temp_date = new Date(timestr);
        var saat = temp_date.getHours();
        var dakika = temp_date.getMinutes();
        if(dakika == 0){
            dakika = "00";
        }

        //GMT +3
        saat = saat - 3;

        return saat + ":" + dakika; 
    }

    get_gunSayi(datestr){
        var temp_date = new Date(datestr);

        return temp_date.getDate();
    }

    get_moviesByplace(place){
        this.etc.get_moviesByplace(place).then(response => {
            this.acts = response.data;
            
        });
    }

    bitistir(str){
        return str.replace(/ /g, "+");
    }
}

MainContentController.$inject = ["$mdMedia", "EtkinlikService", "$scope", "$rootScope"];

export default {
    template: tpl,
    controller: MainContentController
}