import angular from "angular"
import angularMaterial from "angular-material"
import actCardComponent from "./act-card.component"

let mod = angular.module("actCard", [angularMaterial]).component("actCard", actCardComponent);


export default mod.name;