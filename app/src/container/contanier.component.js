import tpl from "./container.template.html"
import "angular";

class ContainerController {
    constructor(SidenavService, IconService, $mdMedia, $document, EtkinlikService, $rootScope) {
        this.doc = $document;
        this.position = 0;
        this.icon = IconService;
        this.mdMedia = $mdMedia;
        this.sidenav = SidenavService;
        this.isNav = true;
        this.et = EtkinlikService;
        this.rootScope = $rootScope;

    }

    isSmaller(brkpoint) {
        return this.mdMedia("max-width: " + brkpoint);
    }

    filter_types(type, subtype){
        this.et.filter_types(type, subtype).then(response => {
            this.et.loadedActs = response.data;
            console.log("hector salamanca")
            this.rootScope.$broadcast("sendData", "hello there");
        });
    }

}

ContainerController.$inject = ["SidenavService", "IconService", "$mdMedia", "$document", "EtkinlikService", "$rootScope"];
export default {
    template: tpl,
    controller: ContainerController
}