import tpl from "./act-details.template.html"

class ActDetailsController{
    constructor(EtkinlikService, IconService, $scope){
        this.et = EtkinlikService;
        this.act = {};
        this.fiyatlar = [];
        this.icon = IconService;
        this.option;
        this.selectedInstance = {};
    

        this.event = {};
        this.instances = [];
        this.dayFiltered = [];
        this.timeFiltetered = [];
        $scope.$on("sendInstances", (evt, data) => {
            this.instances = data;
            this.selectedInstance = this.instances[0];
        });

        this.$onInit = () => {
        
            this.et.getEvent(this.eventId).then(response => {
                this.event = response.data;
            });
        }

        this.check = (ilk, iki) => {
            console.log(ilk == iki)
            return ilk == iki;
        }

        this.gunler = {
            0 : "Pazar",
            1 : "Pazartesi",
            2 : "Salı",
            3 : "Çarşamba",
            4 : "Perşembe",
            5 : "Cuma",
            6 : "Cumartesi"
        }

        this.aylar = {
            0 : "Ocak",
            1 : "Şubat",
            2 : "Mart",
            3 : "Nisan",
            4 : "Mayıs",
            5 : "Haziran",
            6 : "Temmuz",
            7 : "Ağustos",
            8 : "Eylül",
            9 : "Ekim",
            10: "Kasım",
            11: "Aralık"
        }
        
    }
    checkNull(){
        for(var i = 0; i < this.fiyatlar.length; i++) {
            if(this.fiyatlar[i].campaign != null)
            return 0;
        }
        return 1;
    }

    date_aygun(date){
        var date = new Date(date);

        var datestr = `${date.getDate()} ${this.aylar[date.getMonth()]}`;

        return datestr
    }

    filter_dates(){
        this.selectedTime = null;
        this.selectedPlace = null;
        this.dayFiltered = this.instances.filter(instance => instance.date == this.selectedDate)
    }

    filter_times(){
        this.selectedPlace = null;
        this.timeFiltered = this.dayFiltered.filter(instance => instance.time == this.selectedTime)
    }

    filter_place(){
        this.selectedInstance = this.dayFiltered.filter(instance => instance.place == this.selectedPlace)[0]
        this.et.getPricesOfActivity(this.selectedInstance.instance_id).then(response => {
            this.fiyatlar = response.data;
        })
    }

    time_saat(time){
        var a = time;
        var hour = a.slice(0, 2)
        var minute = a.slice(3, 5)
        var timestr = `${hour}:${minute}`;
        return timestr;


    }

    checkdate(insdate){

        
        var a = insdate;
        var b = this.selectedDate;
        var c = a == b;
    
        console.log("selected date: " + this.selectedDate + " a: " + insdate + " c : " + c);
        return c
    }

    checkTime(time){
        var a = time;
        var b = this.selectedTime;
        var c = a == b;
    
        console.log("selected time: " + this.selectedTime + " a: " + time + " c : " + c);
        return c
    }
}



export default {
    template : tpl,
    controller : ActDetailsController,
    bindings : {eventId : '<'}
}