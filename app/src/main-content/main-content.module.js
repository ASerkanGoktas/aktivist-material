import angular from 'angular';
import MainContentComponent from './main-content.component';
import ngmaterial from "angular-material"

let mod = angular.module('mainContent', [ngmaterial]).component('mainContent', MainContentComponent);
export default mod.name;