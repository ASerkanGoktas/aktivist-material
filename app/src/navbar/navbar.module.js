import angular from 'angular';
import NavbarComponent from './navbar.component';
import ngmaterial from "angular-material"

let mod = angular.module('navbar', [ngmaterial]).component('navbar', NavbarComponent);

export default mod.name;