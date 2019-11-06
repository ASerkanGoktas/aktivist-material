import tpl from "./act-details.template.html"

class ActDetailsController{
    constructor(EtkinlikService){
        this.et = EtkinlikService;
        this.act = {};

        this.$onInit = () => {
            console.log(this);
            if(this.instanceId === this.et.selected.instance_id){
                this.act = this.et.selected;
            }
            else{
                this.et.getActivity(this.instanceId).then(response => {
                    this.act = response.data;
                });
            }
        }
    }

}


export default {
    template : tpl,
    controller : ActDetailsController,
    bindings : {instanceId : '<'}
}