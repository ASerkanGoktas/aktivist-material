import tpl from "./container.template.html"


class ContainerController{
    constructor(SidenavService, $mdMedia){
        this.mdMedia = $mdMedia;
        this.sidenav = SidenavService;
    }

    isSmaller(brkpoint){
        return this.mdMedia("max-width: " + brkpoint);
    }
}

ContainerController.$inject = ["SidenavService", "$mdMedia"];
export default {
    template: tpl,
    controller: ContainerController
}