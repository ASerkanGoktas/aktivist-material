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

        this.body = this.doc.find("body")[0];
        this.body.click(e => {
            console.log("Target:");
            console.log(e);
        });
    
        
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
    }


}

NavbarController.$inject = ["$mdSidenav", "$mdMedia", "$document", "SidenavService", "IconService", "EtkinlikService", "$rootScope"];


export default {
    template: tpl,
    controller: NavbarController
}