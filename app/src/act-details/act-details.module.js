import angular from "angular";
import detailscomponent from "./act-details.component";
import ngmaterial from "angular-material";

var mod = angular.module('actDetails', [ngmaterial]).component('actDetails', detailscomponent );

export default mod.name;