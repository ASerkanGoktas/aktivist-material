import tpl from "./container.template.html"
import "angular";

class ContainerController {
    constructor(SidenavService, IconService, $mdMedia, $document, $http) {
        this.doc = $document;
        this.position = 0;
        this.icon = IconService;
        this.mdMedia = $mdMedia;
        this.sidenav = SidenavService;
        this.isNav = true;

        $http.get('/deneme').then(response => {
            console.log(response);
        });
    }

    isSmaller(brkpoint) {
        return this.mdMedia("max-width: " + brkpoint);
    }

}

ContainerController.$inject = ["SidenavService", "IconService", "$mdMedia", "$document", "$http"];
export default {
    template: tpl,
    controller: ContainerController
}