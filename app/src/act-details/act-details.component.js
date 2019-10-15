import tpl from "./act-details.template.html"
import metallica from "../assets/images/metallica.jpg"

class ActDetailsController{
    constructor(){
        this.act = {
            url: metallica
        }
    }

}


export default {
    template : tpl,
    controller : ActDetailsController
}