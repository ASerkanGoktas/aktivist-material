import tpl from "./act-card.template.html"

class actCardController{
    constructor(){
        this.$onInit = () => {
            console.log(this)
            var a = 3;
            var b = 1;
        }
    }

    
}

export default{
    template: tpl,
    controller: actCardController,
    bindings: {title: "@", subtitle: "@", dayOfMonth: "@", month: "@",
     eventId: "@", imageUrl: "@", place: "@", showTopLeft : "<"}
}