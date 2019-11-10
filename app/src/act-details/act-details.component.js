import tpl from "./act-details.template.html"

class ActDetailsController{
    constructor(EtkinlikService,IconService){
        this.et = EtkinlikService;
        this.act = {};
        this.fiyatlar = [];
        this.icon = IconService;
        this.option;
        

        this.$onInit = () => {
            console.log(this);

            this.et.getActivity(this.instanceId).then(response => {
                this.act = response.data;
            });
            this.et.getPricesOfActivity(this.instanceId).then(response => {
                this.fiyatlar = response.data;
            });
        }
        
    }
    checkNull(){
        for(var i = 0; i < this.fiyatlar.length; i++) {
            if(this.fiyatlar[i].campaign != null)
            return 0;
        }
        return 1;
    }
}



export default {
    template : tpl,
    controller : ActDetailsController,
    bindings : {instanceId : '<'}
}