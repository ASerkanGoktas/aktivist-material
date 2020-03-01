import tpl from "./navbar.template.html"

class NavbarController {
    constructor($mdSidenav, $mdMedia, $document, SidenavService, IconService, EtkinlikService, $rootScope, FilterService, $location, $scope) {

        this.rootScope = $rootScope;
        this.doc = $document;
        this.icon = IconService;
        this.media = $mdMedia;
        this.sidenav = SidenavService;
        this.isLarge = false;
        this.resizeicon = IconService.buyult;
        this.etc = EtkinlikService;
        this.filterserv = FilterService;
        this.location = $location;

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

        $scope.$on("clearSearch", (evt, data) => {
            this.searchText = "";
        });

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
////
    search(text){
        this.filterserv.set_searchText(text);
        var url = this.filterserv.buildpath(false, false, true, false);

        this.location.path(url);
    }

    filter_types(type, subtype){
        this.filterserv.set_typensubtype(type, subtype);
        var url = this.filterserv.buildpath(true, subtype != null, false, true);
        
        this.rootScope.$broadcast("clearSearch", null);
        this.location.path(url);
    }


}

NavbarController.$inject = ["$mdSidenav", "$mdMedia", "$document", "SidenavService", 
"IconService", "EtkinlikService", "$rootScope", "FilterService", "$location", "$scope"];


export default {
    template: tpl,
    controller: NavbarController
}