import tpl from "./navbar.template.html"

class NavbarController {
    constructor($mdSidenav, $mdMedia, $document, SidenavService, IconService, EtkinlikService, $rootScope) {

        this.rootScope = $rootScope;
        this.doc = $document;
        this.icon = IconService;
        this.media = $mdMedia;
        this.sidenav = SidenavService;
        this.isLarge = false;
        this.resizeicon = IconService.buyult;
        this.etc = EtkinlikService;

        this.types = [
            {
                name: "Müzik",
                icon: IconService.concert,
                subtypes: [{name: "Alternatif"}, {name: "Rock"}, {name: "Pop"}] 
            },
            {
                name: "Tiyatro",
                icon: IconService.theater,
                subtypes: [{name: "Çocuk Tiyatrosu"}]
            },
            {
                name: "Sinema",
                icon: IconService.movie
            },
            {
                name: "Sahne",
                icon: IconService.sahne,
                subtypes: [{name: "Dans"}, {name: "Gösteri"}, {name: "Opera"}, {name: "Bale"}]
            },
            {
                name: "Eğitim",
                icon: IconService.egitim,
                subtypes: [{name: "Konferans/Fuar"}, {name: "Atölye"}]
            },
            {
                name: "Spor",
                icon: IconService.spor,
                subtypes: [{name: "Futbol"}, {name: "Basketbol"}, {name: "Voleybol"}]
            },
            {
                name: "Aile",
                icon: IconService.aile,
                subtypes: [{name: "Gösteri"}, {name: "Sirk"}, {name: "Diğer"}]
            }
            
        ]

        console.log(SidenavService);

        this.buildToggler = componentId => {
            
            return () => {
                $mdSidenav(componentId).toggle();
            }
        };

        this.toggleLeft = this.buildToggler("left");

        this.isSearchOpen = false;
        this.isSideNav = false;

        this.searchResults = [];

    
        
    }

    isSmaller(brkpoint){
        return this.media('max-width: ' + brkpoint);
    }

    toggleSearch(){
        this.isSearchOpen = !this.isSearchOpen;

        return this.isSearchOpen;
    }

    toggleSide(){
        this.sidenav.toggleSidenav();
    }

    change(actName){
        this.etc.liveSearch(actName).then(response => {
            //No error
            this.searchResults = response.data;
        }, response => {
            //No result
            this.searchResults = [];
        });
    }

    search(text){
        this.searchText = text;
        this.etc.search_name(text).then(response => {
            this.rootScope.$broadcast("sendData", response.data);
        });
    }

    filter_types(type, subtype){
        if(type == "Sinema"){
            this.etc.get_places(type).then(response => {
                this.places = response.data;
                this.rootScope.$broadcast("sendPlaces", this.places);
                this.rootScope.$broadcast("catSelected", {"type": type, "sub": subtype});
            });
        }else{
            this.etc.getActivitiesDistinctWithCount(null, null, type, subtype).then(response => {

                this.rootScope.$broadcast("sendData", response.data);
                this.rootScope.$broadcast("catSelected", {"type": type, "sub": subtype});
            });
        }

        
    }


}

NavbarController.$inject = ["$mdSidenav", "$mdMedia", "$document", "SidenavService", "IconService", "EtkinlikService", "$rootScope"];


export default {
    template: tpl,
    controller: NavbarController
}