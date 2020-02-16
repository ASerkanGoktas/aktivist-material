import tpl from "./act-card.template.html"

class actCardController{
    constructor(){}

    
}

export default{
    template: tpl,
    controller: actCardController,
    bindings: {title: "@", subtitle: "@", dayOfMonth: "@", month: "@", eventId: "@", imageUrl: "@", place: "@"}
}