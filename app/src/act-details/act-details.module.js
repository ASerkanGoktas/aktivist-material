import angular from "angular";
import detailscomponent from "./act-details.component";
import ngmaterial from "angular-material";
import filter from "angular-filter"
var mod = angular.module('actDetails',[filter,ngmaterial]).component('actDetails', detailscomponent);

export default mod.name;