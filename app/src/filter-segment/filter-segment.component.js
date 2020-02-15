import tpl from "./filter-segment.template.html" 

class FilterSegmentController{
    constructor($mdMedia, EtkinlikService, $scope, $rootScope) {
        
        this.scope = $scope;
        this.searchMessage = "Genelde ara...";
        this.myDateStart = new Date();
        this.myDateEnd = new Date();
        this.startContacts = [];
        this.contacts = this.allContacts;       
        this.mdMedia = $mdMedia;
        this.cities = iller;
        this.cityInput = "";
        this.cityState = "Tüm Şehirler";

        this.etc = EtkinlikService;
        this.rootScope = $rootScope;
        this.isBitis = false
        this.isBasla = false
        

        this.scope.$on("catSelected", (evt, data) => {
          this.currentType = data.type;
          this.currentSub = data.subtype;

          this.etc.get_places(this.currentType).then(response => {
            this.places = response.data;
          });
          var str = this.currentType;
          if(this.currentSub != null){
            str = str + " - " + this.currentSub;
          }

          str = str + " içinde ara: ";

          this.searchMessage = str;
        });

        
    }
    clearSearchTerm(){
      this.cityInput = "";
    }

    querySearch (criteria) {
        return criteria ? this.allContacts.filter(createFilterFor(criteria)) : [];
      }

    isLandscape(){
        return this.mdMedia("landscape");
    };

    isSmaller(brkpoint){
        return this.mdMedia("max-width: " + brkpoint);
    }

    createFilterFor(query) {
        var lowercaseQuery = query.toLowerCase();
  
        return function filterFn(contact) {
          return (contact._lowername.indexOf(lowercaseQuery) !== -1);
        };
  
      }

    filter(){
      var city = this.cityState;
      if(this.cityState == "Tüm Şehirler"){
        city = null;
      }
      var endDate = this.myDateEnd;
      var startDate =this.myDateStart;
      if(!this.isBitis){
        endDate = null;
      }
      if(!this.isBasla){
        startDate = null;
      }
      
  
      this.rootScope.$broadcast("filterSet", {"city": city, "endDate": endDate, "startDate":startDate, "type": this.currentType, "subtype": this.currentSub})

    }
}

    var iller = ['Tüm Şehirler','Adana', 'Adıyaman', 'Afyon', 'Ağrı', 'Aksaray', 'Amasya', 'Ankara', 'Antalya', 'Ardahan', 'Artvin',
    'Aydın', 'Balıkesir', 'Bartın', 'Batman', 'Bayburt', 'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa', 'Çanakkale',
    'Çankırı', 'Çorum', 'Denizli', 'Diyarbakır', 'Düzce',  'Edirne', 'Elazığ', 'Erzincan', 'Erzurum', 'Eskişehir',
    'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari', 'Hatay', 'Iğdır', 'Isparta', 'Mersin', 'İstanbul', 'İzmir', 'Karabük', 'Karaman', 
    'Kars', 'Kastamonu', 'Kayseri', 'Kırıkkale', 'Kırklareli', 'Kırşehir', 'Kilis', 'Kocaeli', 'Konya', 'Kütahya', 'Malatya', 
    'Manisa', 'Kahramanmaraş', 'Mardin', 'Muğla', 'Muş', 'Nevşehir', 'Niğde', 'Ordu', 'Osmaniye',  'Rize', 'Sakarya',
    'Samsun', 'Siirt', 'Sinop', 'Sivas', 'Şırnak', 'Tekirdağ', 'Tokat', 'Trabzon', 'Tunceli', 'Şanlıurfa', 'Uşak',
    'Van', 'Yalova', 'Yozgat', 'Zonguldak'];
    
export default {
    template : tpl,
    controller : FilterSegmentController
}


FilterSegmentController.$inject = ["$mdMedia", "EtkinlikService", "$scope", "$rootScope"];