import tpl from "./navbar.template.html"

class NavbarController {
    constructor($mdSidenav, $mdMedia, $document, SidenavService, IconService) {

        this.doc = $document;
        this.icon = IconService;
        this.media = $mdMedia;
        this.sidenav = SidenavService;
        this.isLarge = false;
        this.resizeicon = IconService.buyult;

        console.log(SidenavService);

        this.buildToggler = componentId => {
            
            return () => {
                $mdSidenav(componentId).toggle();
            }
        };

        this.toggleLeft = this.buildToggler("left");

        this.isSearchOpen = false;
        this.isSideNav = false;

        
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

    resize(){
        
        if(this.isLarge){
            this.resizeicon = this.icon.buyult;
        }else{
            this.resizeicon = this.icon.kucult;
        }

        this.isLarge = !this.isLarge;
    }


}

NavbarController.$inject = ["$mdSidenav", "$mdMedia", "$document", "SidenavService", "IconService"];


export default {
    template: tpl,
    controller: NavbarController
}