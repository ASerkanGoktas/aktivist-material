import tpl from "./act-details.template.html"

class ActDetailsController{
    constructor(EtkinlikService, IconService, $scope){
        this.et = EtkinlikService;
        this.act = {};
        this.fiyatlar = [];
        this.icon = IconService;
        this.option;
        this.selectedInstance = {time: null, date: null, place: null};
        this.propertiesOfplace = null;
        this.hidePlaces = false;
        this.hideAllSelections = false;
        this.isAciklamaOpen = false;

        this.event = {};
        this.instances = [];
        this.dayFiltered = [];
        this.timeFiltetered = [];

        this.$onInit = () => {


            if(this.date == "NONE"){
                this.et.get_instances(this.eventId, this.place).then(response => {
                    this.place = this.place.replace(/[+]/g, " ");
                    this.instances = response.data;
                    if(this.instances.length == 1){
                        this.preset = true;
                        this.hideAllSelections = true;
                    }
                });
            }else{
                this.et.get_instances_date(this.eventId, this.date, this.city).then(response => {
                    this.place = this.place.replace(/[+]/g, " ");
                    this.instances = response.data;
                    if(this.place != "NONE"){
                        this.instances = this.instances.filter(instance => instance.place == this.place);
                        this.selectedPlace = this.place;
                    }
                    if(this.instances.length == 1){
                        this.preset = true;
                        this.hideAllSelections = true;
                    }
                });
            }
            

            this.et.getEvent(this.eventId).then(response => {
                this.event = response.data;
                this.event.name = this.event.name.replace(/[~]/g, "'");
            });
        }

        this.get_pricestr = fiyat => {
            if(!fiyat){
                return ""
            }
            var tutar = fiyat.price + "";
            var uzunluk = tutar.length;
            var lira = tutar.slice(0, uzunluk-2)
            var kurus = tutar.slice(uzunluk-2, uzunluk)
            var kur = fiyat.currency
            return `${lira}.${kurus} ${kur}`
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
            if(this.fiyatlar[i].price_discount != "Yok")
            return 0;
        }
        return 1;
    }

    date_aygun(date){
        if(!date)
            return null
        var date = new Date(date);

        var datestr = `${date.getDate()} ${this.aylar[date.getMonth()]}`;

        return datestr
    }


    
    filter_dates(){
        this.selectedTime = null;
        this.selectedPlace = null;
        this.dayFiltered = this.instances.filter(instance => instance.date == this.selectedDate)
    }

    filter_place(){
        this.selectedTime = null
        this.placeFiltered = this.dayFiltered.filter(instance => instance.place == this.selectedPlace.id)

        this.et.get_propertiesOfplace(this.selectedPlace.id).then(response => {
            this.propertiesOfplace = response.data;
        });
    }

    filter_times(){
        this.selectedInstance = this.placeFiltered.filter(instance => instance.time == this.selectedTime)[0]
        this.et.getPricesOfActivity(this.selectedInstance.instance_id).then(response => {
            this.fiyatlar = response.data;
        })
    }

    time_saat(time){
        if(!time)
            return null
        var a = time;
        var hour = a.slice(0, 2)
        var minute = a.slice(3, 5)
        var timestr = `${hour}:${minute}`;
        return timestr;


    }

    checkdate(insdate){
        if(!insdate)
            return false
        
        var a = insdate;
        var b = this.selectedDate;
        var c = a == b;
    
        console.log("selected date: " + this.selectedDate + " a: " + insdate + " c : " + c);
        return c
    }

    filter_cat(){
        this.price_disc = null;
        this.price_subcat = null;
        this.cat_filtered = this.fiyatlar.filter(fiyat => fiyat.category == this.price_cat);
    }

    filter_dis(){
        this.price_subcat = null;
        this.cat_filtered = this.cat_filtered.filter(fiyat => fiyat.price_discount == this.price_disc)
    }

    filter_subcat(){
        this.selectedPrice = this.cat_filtered.filter(fiyat => fiyat.subcategory == this.price_subcat)[0];


    }

    checkTime(time){
        if(!time)
            return false
        var a = time;
        var b = this.selectedTime;
        var c = a == b;
    
        console.log("selected time: " + this.selectedTime + " a: " + time + " c : " + c);
        return c
    }

    toggle_aciklama(){
        this.isAciklamaOpen = !this.isAciklamaOpen;
    }
}



export default {
    template : tpl,
    controller : ActDetailsController,
    bindings : {eventId : '<', date : '@', place: "@", city: "@"}
}