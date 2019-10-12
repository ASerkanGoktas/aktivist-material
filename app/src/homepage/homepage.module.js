import angular from "angular";
import ngmaterial from "angular-material";
import HomepageComponent from "./homepage.component"

let mod = angular.module("homepage", [ngmaterial]).component("homepage", HomepageComponent);

export default mod.name;