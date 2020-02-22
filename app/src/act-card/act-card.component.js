import tpl from "./act-card.template.html"

class actCardController{
    constructor(){
        this.$onInit = () => {
            
            this.title = this.title.replace(/[~]/g, "'");
            this.subtitle = "hi"
        }
    }

    
}

export default{
    template: tpl,
    controller: actCardController,
    bindings: {title: "<", subtitle: "@", dayOfMonth: "@", month: "@",
     eventId: "@", imageUrl: "@", date: "@", showTopLeft : "<", place: "@"}
}