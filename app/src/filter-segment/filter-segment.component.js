import tpl from "./filter-segment.template.html"


class FilterSegmentController{
    constructor($mdMedia) {
        this.allContacts = loadAllContacts();
        this.contacts = this.allContacts;       
        this.mdMedia = $mdMedia;
        this.querySearch = querySearch();
        this.acts = []
        for(let i = 0; i<9; i++){
            this.acts.push(i);
        }        
    }


    isLandscape(){
        return this.mdMedia("landscape");
    };

    isSmaller(brkpoint){
        return this.mdMedia("max-width: " + brkpoint);
    }
}

function querySearch (criteria) {
    return criteria ? this.allContacts.filter(createFilterFor(criteria)) : []; // XDDDDDDDDDDDDDDDD SEARCH FUNCTION IN 2K194AD9GFDAGFAK;HJLASGDJ
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



export default {
    template : tpl,
    controller : FilterSegmentController
}