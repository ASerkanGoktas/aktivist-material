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

    filter_types(type, subtype){
        if(type == "Sinema"){
            this.et.get_places(type).then(response => {
                this.places = response.data;
                this.rootScope.$broadcast("sendPlaces", this.places);
                this.rootScope.$broadcast("catSelected", {"type": type, "sub": subtype});
            });
        }else{
            this.et.getActivitiesDistinctWithCount(null, null, type, subtype).then(response => {

                this.rootScope.$broadcast("sendData", response.data);
                this.rootScope.$broadcast("catSelected", {"type": type, "sub": subtype});
            });
        }

        
    }

    

}

ContainerController.$inject = ["SidenavService", "IconService", "$mdMedia", "$document", "EtkinlikService", "$rootScope"];
export default {
    template: tpl,
    controller: ContainerController
}