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

        this.doc.find("md-content")[1].onscroll = e => {
            let currentPos = e.target.scrollTop;
            console.log(this.isNav);

            if (currentPos > this.position) {
                //scrolling down

                this.isNav = true;
                let a = angular.element(this.doc.find('navbar')[0]);
                console.log(a);
                a.removeClass("hidden");
                this.position = currentPos;
            }else {
                this.isNav = false;
                let a = angular.element(this.doc.find('navbar')[0]);
                console.log(a);
                a.addClass("hidden");
                this.position = currentPos;
            }   

            


        }
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