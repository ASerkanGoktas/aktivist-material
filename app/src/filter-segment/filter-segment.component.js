import tpl from "./filter-segment.template.html"


class FilterSegmentController{
    constructor($mdMedia,$q) {
        this.myDate = new Date();
        this.startContacts = [];
        this.allContacts = loadAllContacts();
        this.contacts = this.allContacts;       
        this.mdMedia = $mdMedia;
        this.acts = []
        for(let i = 0; i<9; i++){
            this.acts.push(i);
        }        
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