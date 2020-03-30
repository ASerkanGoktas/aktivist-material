class FilterService {
    constructor() {
        this.filters = {
            type: "NONE",
            subtype: "NONE",
            searchText: "NONE",
            city: "İstanbul",
            discount: "NONE",
            selectedZincir: "NONE",
            price: "NONE"
        };

        

    }

    set_typensubtype(type, subtype) {
        this.filters.type = type;
        this.filters.subtype = subtype ? subtype : "NONE";
        this.filters.searchText = "NONE";
    }

    set_searchText(text){
        this.filters.searchText = text;
        this.filters.type = "NONE";
        this.filters.subtype = "NONE";
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

    buildpath(){
        let base = "/arama"
        
        let result = `${base}/${this.filters.type}/${this.filters.subtype}/${this.filters.searchText}/city/${this.filters.city}/page_num/1/${this.filters.discount ? this.filters.discount : "NONE"}/${this.filters.selectedZincir ? this.filters.selectedZincir : "NONE"}/${this.filters.price}`

        return result;
    }
}

export default FilterService;