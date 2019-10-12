import tpl from "./container.template.html"


class ContainerController{
    constructor(SidenavService){
        this.sidenav = SidenavService;
    }
}

ContainerController.$inject = ["SidenavService"];
export default {
    template: tpl,
    controller: ContainerController
}