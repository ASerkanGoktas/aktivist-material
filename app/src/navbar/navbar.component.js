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
                name: "Konser",
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
                icon: null,
                subtypes: [{name: "Dans"}, {name: "Gösteri"}, {name: "Opera"}, {name: "Bale"}]
            },
            {
                name: "Eğitim",
                icon: null
            },
            {
                name: "Konferans",
                icon: null
            },
            {
                name: "Workshop",
                icon: null
            },
            {
                name: "Spor",
                icon: null,
                subtypes: [{name: "Futbol"}, {name: "Basketbol"}, {name: "Voleybol"}]
            },
            {
                name: "Aile",
                icon: null,
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

    search(){
        this.etc.loadedActs = this.searchResults;
        this.rootScope.$broadcast("sendData", "hi");
        
    }


}

NavbarController.$inject = ["$mdSidenav", "$mdMedia", "$document", "SidenavService", "IconService", "EtkinlikService", "$rootScope"];


export default {
    template: tpl,
    controller: NavbarController
}