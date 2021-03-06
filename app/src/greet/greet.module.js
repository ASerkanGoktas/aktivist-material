import angular from 'angular';
import GreetComponent from './greet.component';
import ngmaterial from "angular-material";
import ngmessages from "angular-messages";

let mod = angular.module('greet', [ngmaterial, ngmessages]).component('greet', GreetComponent);

export default mod.name;