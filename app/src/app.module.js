import "./tailwind.css"
import angular from 'angular'
import angularRoute from "angular-route"
import greetModule from './greet/greet.module';
import navbarModule from "./navbar/navbar.module";
import maincontentmodule from "./main-content/main-content.module";
import detailsmodule from "./act-details/act-details.module";
import filtersegmentmodule from "./filter-segment/filter-segment.module";
import actCardModule from "./act-card/act-card.module";
import homepagemodule from "./homepage/homepage.module";
import SidenavService from "./services/sidenav.service";
import containermodule from "./container/container.module";
import footerModule from "./footer/footer.module";
import ngaria from "angular-aria";
import "../../node_modules/angular-material/angular-material.css"
import IconService from "./services/icon.service";
import EtkinlikService from "./services/etkinlik.service";
import FilterService from "./services/filter.service"
import moment from "moment";



angular.module('aktivist', [greetModule, navbarModule, maincontentmodule, footerModule, detailsmodule, actCardModule, ngaria, filtersegmentmodule, angularRoute,
    homepagemodule, containermodule]).
    config(
        ["$routeProvider", function config($routeProvider) {
            $routeProvider.
                when("/", {
                    template: "<greet></greet><homepage></homepage>"
                }).
                when("/arama/:type/:subtype/:searchText/city/:city/page_num/:page_num/:discount/:selected_zincir/:price", {
                    template: params => {
                        return `<main-content type='${params.type}' subtype = '${params.subtype}' 
                        search-text = '${params.searchText}' selected-page = '${params.page_num}' city = '${params.city}' 
                        discount = '${params.discount}' selected-zincir = '${params.selected_zincir}' price = '${params.price}'></main-content>`
                    }
                }).
                when("/etkinlik/:event_id/:date/:place/:city", {
                    template: params => {
                        return `<act-details event_id='${params.event_id}' date='${params.date}' place = '${params.place}' city = '${params.city}'></act-details>`;
                    }
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
        "EtkinlikService", ["$http", "$rootScope", ($http, $rootScope) => new EtkinlikService($http, $rootScope)]
    ).factory(
        "FilterService", [() => new FilterService()]
    )
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
          .primaryPalette('blue')
          .accentPalette('orange');
          
         
      }).config(function($mdDateLocaleProvider){
        $mdDateLocaleProvider.formatDate = function(date) {
            return date ? moment(date).format('D/M/Y') : '';
          };
      
          /**
           * @param dateString {string} string that can be converted to a Date
           * @returns {Date} JavaScript Date object created from the provided dateString
           */
          $mdDateLocaleProvider.parseDate = function(dateString) {
            var m = moment(dateString, 'D/M/Y', true);
            return m.isValid() ? m.toDate() : new Date(NaN);
          };
      });