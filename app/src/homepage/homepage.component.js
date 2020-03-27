import tpl from "./homepage.template.html"

class HomepageController{
    constructor(EtkinlikService, FilterService, $rootScope, $document){
        this.acts = []
        this.et = EtkinlikService;
        this.et.get_todays_movies("İstanbul").then(response => {
            this.todays_movies = response.data;
        });
        this.filtersrv = FilterService;
        this.today = this.get_today();
        this.document = $document;
        
        $rootScope.$broadcast("clearSearch", null);
    }

    get_today(){
        var today = new Date();
    
        today= `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate() - 15}`;
        return today;
    }

    trim_name(name) {
        name = name.replace(/=/, "'");
        return ((name.length < 60) ? name : name.slice(0, 56) + "...")
    }

    get_subtitle(act) {
        var day = this.get_gunSayi(act.date);
        var month = this.get_ay(act.date);

        var day_name = this.get_gun(act.date);

        return `${day} ${month} ${day_name}`;
    }

    get_gun(datestr) {
        var temp_date = new Date(datestr);

        return this.gunler[temp_date.getDay()];
    }

    get_ay(datestr) {
        var temp_date = new Date(datestr);

        return this.aylar[temp_date.getMonth()];
    }

    get_saat(timestr) {
        var temp_date = new Date(timestr);
        var saat = temp_date.getHours();
        var dakika = temp_date.getMinutes();
        if (dakika == 0) {
            dakika = "00";
        }

        //GMT +3
        saat = saat - 3;

        return saat + ":" + dakika;
    }

    get_gunSayi(datestr) {
        var temp_date = new Date(datestr);

        return temp_date.getDate();
    }

    scroll_right(id){
        var list = this.document[0].getElementById(id)

        var scrollAmount = 0
        var slideTimer = setInterval(function(){
            list.scrollLeft += 60;
            scrollAmount += 10;
            if(scrollAmount >= 100){
                window.clearInterval(slideTimer);
            }
        }, 25);
    }

    scroll_left(id){
        var list = this.document[0].getElementById(id)

        var scrollAmount = 0
        var slideTimer = setInterval(function(){
            list.scrollLeft -= 60;
            scrollAmount += 10;
            if(scrollAmount >= 100){
                window.clearInterval(slideTimer);
            }
        }, 25);
    }
}

export default {
    template: tpl,
    controller: HomepageController
}

HomepageController.$inject = ["EtkinlikService", "FilterService", "$rootScope", "$document"];