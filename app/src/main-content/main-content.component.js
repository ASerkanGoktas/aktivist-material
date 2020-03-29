import tpl from './main-content.template.html'

class MainContentController {


    constructor($mdMedia, EtkinlikService, $scope, $rootScope, $location, $route, FilterService, $document) {


        this.mdMedia = $mdMedia;
        this.searchText = "";
        this.rootScope = $rootScope;
        this.etc = EtkinlikService;
        this.scope = $scope;
        this.showPlaces = false;
        this.pages = []
        this.filtersrv = FilterService;
        this.document = $document;
        

        var original = $location.path;
        $location.path = (path, reload) => {
            if (reload === false) {
                var lastRoute = $route.current;
                var un = $rootScope.$on('$locationChangeSuccess', () => {
                    $route.current = lastRoute;
                    un();
                });
            }
            return original.apply($location, [path]);
        };

        this.location = $location;

        this.gunler = {
            0: "Pazar",
            1: "Pazartesi",
            2: "Salı",
            3: "Çarşamba",
            4: "Perşembe",
            5: "Cuma",
            6: "Cumartesi"
        }

        this.aylar = {
            0: "Ocak",
            1: "Şubat",
            2: "Mart",
            3: "Nisan",
            4: "Mayıs",
            5: "Haziran",
            6: "Temmuz",
            7: "Ağustos",
            8: "Eylül",
            9: "Ekim",
            10: "Kasım",
            11: "Aralık"
        }

        this.$onInit = () => {
            var NONE = "NONE";

            this.isContentLoaded = false;

            this.sync_filters();
            this.selectedPage = parseInt(this.selectedPage);
            if (this.searchText == NONE) {
                if (this.type == "Sinema") {
                    this.etc.get_places(this.type, this.city, this.selectedZincir).then(response => {
                        this.places = response.data;
                        this.showPlaces = true;

                        this.isContentLoaded = true;
                    });
                } else {
                    this.etc.getActivitiesDistinctWithCount(null, null, this.type, this.subtype, this.city, this.selectedPage, this.discount, this.price).then(response => {
                        this.acts = response.data.rows;
                        this.row_num = response.data.count;
                        this.showPlaces = false;

                        this.set_pagenums(this.row_num);
                        this.isContentLoaded = true;
                    });
                }
            } else {
                this.etc.search_name(this.searchText, this.selectedPage, this.city, this.discount, this.price).then(response => {
                    this.acts = response.data.rows;
                    this.row_num = response.data.count;
                    this.showPlaces = false;

                    this.set_pagenums(this.row_num);
                    this.isContentLoaded = true;
                });
            }
        };

    }

    set_pagenums(row_num) {
        for (var i = 1; i < (row_num / 18); i++) {
            this.pages.push(i);
        }

        this.pages.push(i);
    }

    select_page(pg_num) {

        this.isContentLoaded = false;
        if (this.searchText == 'NONE') {
            this.etc.getActivitiesDistinctWithCount(null, null, this.type, this.subtype, this.city, parseInt(pg_num), this.discount, this.price).then(response => {
                this.acts = response.data.rows;
                this.row_num = response.data.count;
                this.showPlaces = false;

                this.isContentLoaded = true;
            });
        } else {
            this.etc.search_name(this.searchText, parseInt(pg_num), this.city, this.discount, this.price).then(response => {
                this.acts = response.data.rows;
                this.row_num = response.data.count;
                this.showPlaces = false;

                this.isContentLoaded = true;
            })
        }



        this.location.path(`/arama/${this.type}/${this.subtype}/${this.searchText}/city/${this.city}/page_num/${this.selectedPage}/${this.discount}/${this.selectedZincir}/${this.price}`, false)
    }

    isLandscape() {
        return this.mdMedia("landscape");
    };

    isSmaller(brkpoint) {
        return this.mdMedia("max-width: " + brkpoint);
    }

    isPhoneLandscape() {

        let probablemaxphonewidth = "750px";

        let land = this.mdMedia("landscape");
        let phone = this.mdMedia("max-width:" + probablemaxphonewidth);

        return land == phone;
    }

    get_searchName(){

        var result = "";

        if(this.type != "NONE"){
            result = `${this.type} `
            if(this.subtype != "NONE"){
                result = result.concat(" - ", this.subtype)
            }
        }else{
            result = `'${this.searchText}'`
        }

        var city = "";

        if(this.city != "NONE"){
            city = this.city;
            result = result.concat(" / ", city);
        }
        result = result.concat(" için sonuçlar");
        return result;
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

    sync_filters(){
        this.filtersrv.filters.type = this.type
        this.filtersrv.filters.subtype = this.subtype
        this.filtersrv.filters.searchText = this.searchText;
        this.filtersrv.filters.city = this.city
        this.filtersrv.filters.discount = this.discount;
        this.filtersrv.filters.price = this.price
    }

    get_gun(datestr) {
        var temp_date = new Date(datestr);

        return this.gunler[temp_date.getDay()];
    }

    toggle_actsOfplace(index, place) {
        if (this.selectedIndex === index)
            this.selectedIndex = -1;
        else {
            this.selectedIndex = index;
            this.get_moviesByplace(place)
        }
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

    get_moviesByplace(place) {
        this.etc.get_moviesByplace(place).then(response => {
            this.acts = response.data;

        });
    }

    bitistir(str) {
        return str.replace(/ /g, "+");
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

MainContentController.$inject = ["$mdMedia", "EtkinlikService", "$scope", "$rootScope", "$location", "$route", "FilterService", "$document"];

export default {
    template: tpl,
    controller: MainContentController,
    bindings: { type: "@", subtype: "@", searchText: "@", selectedPage: "<", city: "@", discount: "@", selectedZincir: "@", price: "@"}
}