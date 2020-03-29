import tpl from "./act-card.template.html"

class ActCardController{
    constructor($document, $mdToast){
        this.mdToast = $mdToast;
        this.document = $document[0];
        this.$onInit = () => {
            
            this.title = this.title.replace(/[~]/g, "'");
            this.subtitle = "hi"
            this.linkToDetails = `#!/etkinlik/${this.eventId}/${this.date}/${this.place}/${this.city}`
        }
    }

    copyToClipboard(link){
        const el = this.document.createElement('textarea');
        el.value = link;
        this.document.body.appendChild(el);
        el.select();
        this.document.execCommand('copy');
        this.document.body.removeChild(el);
    }

    showToast(){
        this.mdToast.show(
            this.mdToast.simple().
            textContent("Link Kopyalandı!").
            position("bottom left")).
            hideDelay(2).then(() => {}, () => {});
        
    }
}

ActCardController.$inject = ["$document", "$mdToast"];

export default{
    template: tpl,
    controller: ActCardController,
    bindings: {title: "<", subtitle: "@", dayOfMonth: "@", month: "@",
     eventId: "@", imageUrl: "@", date: "@", showTopLeft : "<", place: "@", city: "@"}
}

