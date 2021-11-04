import Vue from "vue";
import moment from "moment";
Vue.prototype.mydateservice={
    getoldyear: function(option){
        return moment("20111031", "YYYYMMDD").fromNow();
    }
}