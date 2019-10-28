import tpl from "./container.template.html"
import "angular";

class ContainerController {
    constructor(SidenavService, IconService, $mdMedia, $document) {
        this.doc = $document;
        this.position = 0;
        this.icon = IconService;
        this.mdMedia = $mdMedia;
        this.sidenav = SidenavService;
        this.isNav = true;


    }

    isSmaller(brkpoint) {
        return this.mdMedia("max-width: " + brkpoint);
    }

}

ContainerController.$inject = ["SidenavService", "IconService", "$mdMedia", "$document"];
export default {
    template: tpl,
    controller: ContainerController
}