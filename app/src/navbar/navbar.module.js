import angular from 'angular';
import NavbarComponent from './navbar.component';
import ngmaterial from "angular-material"

let module = angular.module('navbar', [ngmaterial]).component('navbar', NavbarComponent);

export default module.name;