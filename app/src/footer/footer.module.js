import angular from "angular"
import ngmaterial from "angular-material";
import FooterComponent from "./footer.component"

let mod = angular.module("footer", [ngmaterial]).component("footer", FooterComponent);

export default mod.name;