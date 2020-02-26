import tpl from "./container.template.html"
import "angular";

class ContainerController {
    constructor(SidenavService, IconService, $mdMedia, $document, EtkinlikService, $rootScope, FilterService, $location) {
        this.doc = $document;
        this.position = 0;
        this.icon = IconService;
        this.mdMedia = $mdMedia;
        this.sidenav = SidenavService;
        this.isNav = true;
        this.et = EtkinlikService;
        this.rootScope = $rootScope;
        this.filtersrv = FilterService;
        this.location = $location;

        this.cats = [
            {type: "Müzik", icon: this.icon.concert},
            {type: "Tiyatro", icon: this.icon.theater},
            {type: "Sinema", icon: this.icon.movie},
            {type: "Sahne", icon: this.icon.sahne},
            {type: "Aile", icon: this.icon.aile},
            {type: "Eğitim", icon: this.icon.egitim},
            {type: "Müze", icon: this.icon.museum},
            {type: "Spor", icon: this.icon.spor}
        ]
    }

    isSmaller(brkpoint) {
        return this.mdMedia("max-width: " + brkpoint);
    }

    filter_types(type){
        this.filtersrv.set_typensubtype(type, null);
        var url = this.filtersrv.buildpath(true, false, false, true);

        this.location.path(url);

    }

    

}

ContainerController.$inject = ["SidenavService", "IconService", "$mdMedia", "$document", "EtkinlikService", "$rootScope", "FilterService", "$location"];
export default {
    template: tpl,
    controller: ContainerController
}