import angular from "angular";
import filtersegment from "./filter-segment.component";
import ngmaterial from "angular-material";

let mod = angular.module('filterSegment', [ngmaterial]).component('filterSegment', filtersegment );

export default mod.name;