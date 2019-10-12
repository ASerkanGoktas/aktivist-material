import tpl from "./navbar.template.html"

class NavbarController {
    constructor($mdSidenav, $mdMedia, SidenavService) {
        
        this.media = $mdMedia;
        this.sidenav = SidenavService;

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
}

NavbarController.$inject = ["$mdSidenav", "$mdMedia", "SidenavService"]


export default {
    template: tpl,
    controller: NavbarController
}