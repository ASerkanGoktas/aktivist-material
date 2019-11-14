import tpl from "./filter-segment.template.html" 

class FilterSegmentController{
    constructor($mdMedia, EtkinlikService, $rootScope) {
        this.myDate = new Date();
        this.myDate2 = new Date();
        this.startContacts = [];
        this.allContacts = loadAllContacts();
        this.contacts = this.allContacts;       
        this.mdMedia = $mdMedia;
        this.cities = iller;
        this.cityInput = "";
        this.cityState = "Tüm Şehirler";

        this.etc = EtkinlikService;
        this.rootScope = $rootScope;

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
      this.etc.filter_date(this.myDate).then(response => {
        this.etc.loadedActs = response.data;

        this.rootScope.$broadcast("sendData", "hi");
      });
    }
}


function loadAllContacts(){    
    var contacts = [
        'Marina Augustine',
        'Oddr Sarno',
        'Nick Giannopoulos',
        'Narayana Garner',
      ];

      return contacts.map(function (c, index) {
        var contact = {
          name: c,
          image: '//www.gravatar.com/avatar/'
        };
        contact._lowername = contact.name.toLowerCase();
        return contact;
      });
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


FilterSegmentController.$inject = ["$mdMedia", "EtkinlikService", "$rootScope"];