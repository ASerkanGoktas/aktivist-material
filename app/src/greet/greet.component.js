import tpl from './greet.template.html'
import bg from "../assets/images/konser1920.jpg";

class GreetController {


    constructor() {
      
        

        this.bgimage = bg;
        this.bgstyle = `height: 50%; min-height: 500px; z-index: 10; background-image : url('` +
        this.bgimage +
        `'); background-repeat: no-repeat; background-position: center center; background-size : cover;`;

        
    }

}

export default {
    template: tpl,
    controller: GreetController
}