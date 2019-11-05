import tpl from "./act-details.template.html"

class ActDetailsController{
    constructor(EtkinlikService){
        this.et = EtkinlikService;
        this.act = {};

        this.$onInit = () => {
            if(this.instance_id === this.et.selected.instance_id){
                this.act = this.et.selected;
            }
            else{
                this.et.getActivity(this.instance_id).then(response => {
                    this.act = response.data;
                });
            }
        }
    }

    

}


export default {
    template : tpl,
    controller : ActDetailsController,
    bindings : {instance_id : '<'}
}