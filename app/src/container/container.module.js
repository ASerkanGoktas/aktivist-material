import angular from "angular"
import ngmaterial from "angular-material";
import ContainerComponent from "./contanier.component"

let mod = angular.module("container", [ngmaterial]).component("container", ContainerComponent);

export default mod.name;