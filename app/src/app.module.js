import "../../node_modules/tailwindcss/dist/tailwind.min.css"
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


angular.module('aktivist', [greetModule, navbarModule, maincontentmodule, detailsmodule, ngaria, filtersegmentmodule, angularRoute,
    homepagemodule, containermodule]).
    config(
        ["$routeProvider", function config($routeProvider) {
            $routeProvider.
                when("/", {
                    template: "<greet></greet><homepage></homepage>"
                }).
                when("/etkinlikler", {
                    template: "<act-details></act-details>"
                }).otherwise({
                    redirectTo: "/"
                })
        }]
    ).factory("SidenavService", [() => {
        let a = new SidenavService;
        console.log(a);
    
        return a;
    }]);