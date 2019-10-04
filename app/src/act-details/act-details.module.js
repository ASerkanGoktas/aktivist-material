import angular from "angular";
import detailscomponent from "./act-details.component";
import ngmaterial from "angular-material";

let module = angular.module('actDetails', [ngmaterial]).component('actDetails', detailscomponent );

export default module.name;