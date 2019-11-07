import tpl from "./act-details.template.html"

class ActDetailsController{
    constructor(EtkinlikService){
        this.et = EtkinlikService;
        this.act = {};

        this.$onInit = () => {
            console.log(this);

            this.et.getActivity(this.instanceId).then(response => {
                this.act = response.data;
            });
            this.et.getPricesOfActivity(this.instanceId).then(response => {
                this.act.fiyatlar = response.data;
            });
        }
    }

}

export default {
    template : tpl,
    controller : ActDetailsController,
    bindings : {instanceId : '<'}
}