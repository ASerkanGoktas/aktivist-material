import tpl from "./navbar.template.html"

class NavbarController {
    constructor($mdSidenav, $mdMedia) {
        
        this.media = $mdMedia;

        this.buildToggler = componentId => {
            
            return () => {
                $mdSidenav(componentId).toggle();
            }
        };

        this.toggleLeft = this.buildToggler("left");

        this.isSearchOpen = false;

        
    }

    isSmaller(brkpoint){
        return this.media('max-width: ' + brkpoint);
    }

    toggleSearch(){
        this.isSearchOpen = !this.isSearchOpen;

        return this.isSearchOpen;
    }
}

NavbarController.$inject = ["$mdSidenav", "$mdMedia"]


export default {
    template: tpl,
    controller: NavbarController
}