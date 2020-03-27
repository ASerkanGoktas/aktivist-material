import tpl from "./filter-segment.template.html"

class FilterSegmentController {
  constructor($mdMedia, EtkinlikService, $scope, $rootScope, $location, FilterService) {

    this.scope = $scope;
    this.searchMessage = "Genelde ara...";
    this.myDateStart = new Date();
    this.myDateEnd = new Date();
    this.startContacts = [];
    this.contacts = this.allContacts;
    this.mdMedia = $mdMedia;
    this.cities = iller;
    this.cityInput = "";
    this.cityState = FilterService.filters.city;
    this.selectedDiscount = FilterService.filters.discount;
    this.selectedZincir= FilterService.filters.selectedZincir;
    this.filtersrv = FilterService;
    this.location = $location;

    this.etc = EtkinlikService;
    this.rootScope = $rootScope;
    this.isBitis = false
    this.isBasla = false

    this.selectedPrice = FilterService.filters.price;
    this.isSinema = FilterService.filters.type == "Sinema"

  }
  clearSearchTerm() {
    this.cityInput = "";
  }

  querySearch(criteria) {
    return criteria ? this.allContacts.filter(createFilterFor(criteria)) : [];
  }

  isLandscape() {
    return this.mdMedia("landscape");
  };

  isSmaller(brkpoint) {
    return this.mdMedia("max-width: " + brkpoint);
  }

  createFilterFor(query) {
    var lowercaseQuery = query.toLowerCase();

    return function filterFn(contact) {
      return (contact._lowername.indexOf(lowercaseQuery) !== -1);
    };

  }

  filter() {
    console.log(`filter segment: type = ${this.filtersrv.filters.type}`)
    this.filtersrv.set_city(this.cityState);
    this.filtersrv.set_discount(this.selectedDiscount);
    this.filtersrv.set_zincir(this.selectedZincir);
    this.filtersrv.set_price(this.isFiyat ? this.selectedPrice : "NONE");
    var url = this.filtersrv.buildpath(true, true, true, true);

    this.location.path(url);
  }
}

var iller = ['Adana', 'Adıyaman', 'Afyon', 'Ağrı', 'Aksaray', 'Amasya', 'Ankara', 'Antalya', 'Ardahan', 'Artvin',
  'Aydın', 'Balıkesir', 'Bartın', 'Batman', 'Bayburt', 'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa', 'Çanakkale',
  'Çankırı', 'Çorum', 'Denizli', 'Diyarbakır', 'Düzce', 'Edirne', 'Elazığ', 'Erzincan', 'Erzurum', 'Eskişehir',
  'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari', 'Hatay', 'Iğdır', 'Isparta', 'Mersin', 'İstanbul', 'İzmir', 'Karabük', 'Karaman',
  'Kars', 'Kastamonu', 'Kayseri', 'Kırıkkale', 'Kırklareli', 'Kırşehir', 'Kilis', 'Kocaeli', 'Konya', 'Kütahya', 'Malatya',
  'Manisa', 'Kahramanmaraş', 'Mardin', 'Muğla', 'Muş', 'Nevşehir', 'Niğde', 'Ordu', 'Osmaniye', 'Rize', 'Sakarya',
  'Samsun', 'Siirt', 'Sinop', 'Sivas', 'Şırnak', 'Tekirdağ', 'Tokat', 'Trabzon', 'Tunceli', 'Şanlıurfa', 'Uşak',
  'Van', 'Yalova', 'Yozgat', 'Zonguldak'];

export default {
  template: tpl,
  controller: FilterSegmentController
}


FilterSegmentController.$inject = ["$mdMedia", "EtkinlikService", "$scope", "$rootScope", "$location", "FilterService"];