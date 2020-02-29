class FilterService {
    constructor() {
        this.filters = {
            type: null,
            subtype: null,
            searchText: null,
            city: "İstanbul"

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
        this.filters.city = null;
    }

    set_city(city){
        this.filters.city = city;
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

        
        var result = `${base}/${type}/${subtype}/${searchText}/city/${city}/page_num/1`

        return result;
    }
}

export default FilterService;