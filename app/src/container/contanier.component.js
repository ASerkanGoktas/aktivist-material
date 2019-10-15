import tpl from "./container.template.html"


class ContainerController{
    constructor(SidenavService, IconService, $mdMedia){
        this.icon = IconService;
        this.mdMedia = $mdMedia;
        this.sidenav = SidenavService;
    }

    isSmaller(brkpoint){
        return this.mdMedia("max-width: " + brkpoint);
    }
}

ContainerController.$inject = ["SidenavService", "IconService","$mdMedia"];
export default {
    template: tpl,
    controller: ContainerController
}