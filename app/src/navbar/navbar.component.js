import tpl from "./navbar.template.html"

class NavbarController {
    constructor($mdSidenav) {
      
        this.buildToggler = componentId => {
            return () => {
                $mdSidenav(componentId).toggle();
            }
        };

        this.toggleLeft = this.buildToggler("left");

        

        
    }
}

NavbarController.$inject = ["$mdSidenav"]


export default {
    template: tpl,
    controller: NavbarController
}