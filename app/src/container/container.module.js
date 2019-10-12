import angular from "angular"
import ngmaterial from "angular-material";
import ContainerComponent from "./contanier.component"

let module = angular.module("container", [ngmaterial]).component("container", ContainerComponent);

export default module.name;