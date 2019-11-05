import "./tailwind.css"
import angular from 'angular'
import angularRoute from "angular-route"
import greetModule from './greet/greet.module';
import navbarModule from "./navbar/navbar.module";
import maincontentmodule from "./main-content/main-content.module";
import detailsmodule from "./act-details/act-details.module";
import filtersegmentmodule from "./filter-segment/filter-segment.module";
import homepagemodule from "./homepage/homepage.module";
import SidenavService from "./services/sidenav.service";
import containermodule from "./container/container.module";
import ngaria from "angular-aria";
import "../../node_modules/angular-material/angular-material.css"
import IconService from "./services/icon.service";
import EtkinlikService from "./services/etkinlik.service";



angular.module('aktivist', [greetModule, navbarModule, maincontentmodule, detailsmodule, ngaria, filtersegmentmodule, angularRoute,
    homepagemodule, containermodule]).
    config(
        ["$routeProvider", function config($routeProvider) {
            $routeProvider.
                when("/", {
                    template: "<greet></greet><homepage></homepage>"
                }).
                when("/arama", {
                    template: "<main-content></main-content>"
                }).
                when("/etkinlik", {
                    template: "<act-details></act-details>"
                }).otherwise({
                    redirectTo: "/"
                })
        }]
    ).factory("SidenavService", [() => {
        let a = new SidenavService;
        console.log(a);

        return a;
    }]).factory("IconService", [() => {
        return new IconService();
    }]).factory(
        "EtkinlikService", ["$http", $http => new EtkinlikService($http)]
    )
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
          .primaryPalette('blue')
          .accentPalette('orange');
          
         
      });