class FilterService {
    constructor() {
        this.filters = {
            type: null,
            subtype: null,
            searchText: null,
            city: "İstanbul",
            discount: "NONE",
            selectedZincir: "NONE",
            price: "NONE"
        };

        

    }

    set_typensubtype(type, subtype) {
        this.filters.type = type;
        this.filters.subtype = subtype;
        this.filters.searchText = null;
    }

    set_searchText(text){
        this.filters.searchText = text;
        this.filters.type = null;
        this.filters.subtype = null;
    }

    set_city(city){
        this.filters.city = city;
    }

    set_discount(discount){
        this.filters.discount = discount;
    }

    set_zincir(zincir){
        this.filters.selectedZincir = zincir;
    }

    set_price(price){
        this.filters.price = price;
    }

    get_filters(){
        return this.filters;
    }

    buildpath(isType, isSubtype, isSearchText, isCity){

        var type = "NONE";
        var subtype = "NONE";
        var searchText = "NONE";
        var city = "NONE";

        var base = "/arama";


        if(isType && this.filters.type != null){
            type = this.filters.type;
        }

        if(isSubtype && this.filters.subtype != null){
            subtype = this.filters.subtype;
        }

        if(isSearchText && this.filters.searchText != null){
            searchText = this.filters.searchText;
        }

        if(isCity && this.filters.city != null){
            city = this.filters.city;
        }

        
        var result = `${base}/${type}/${subtype}/${searchText}/city/${city}/page_num/1/${this.filters.discount ? this.filters.discount : "NONE"}/${this.filters.selectedZincir ? this.filters.selectedZincir : "NONE"}/${this.filters.price}`

        return result;
    }
}

export default FilterService;