import "../../node_modules/tailwindcss/dist/tailwind.min.css"
import angular from 'angular'
import greetModule from './greet/greet.module';
import navbarModule from "./navbar/navbar.module";
import maincontentmodule from "./main-content/main-content.module";
import detailsmodule from "./act-details/act-details.module";
import ngaria from "angular-aria";
import "../../node_modules/angular-material/angular-material.css"


angular.module('aktivist', [greetModule, navbarModule, maincontentmodule, detailsmodule, ngaria])