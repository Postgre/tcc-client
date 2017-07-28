const BaseModel = require('./BaseModel');

module.exports = class Market extends BaseModel {
    constructor(DataService, AuthService, data){
        super(DataService, AuthService, data);

        this.id = null;
        this.published = null;
        this.rate_caroler_base = null;
        this.rate_caroler_discount = null;
        this.rate_travel_distance = null;
        this.rate_travel_duration = null;
        this.name = null;
        this.city = null;
        this.phone = null;
        this.email = null;
        this.image = null;
        this.html = null;
        this.address = null;
        this.state = null;

        this.specialDates =     [];
        this.mediaLinks =       [];
    }
    addSpecialDate(SpecialDate){
        this.specialDates.push(SpecialDate);
    }
    removeSpecialDate(SpeicalDate){
        let ind = this.specialDates.indexOf(SpeicalDate);
        if(ind === -1) return;
        this.specialDates.splice(ind,1);
    }
    addMediaLink(url){
        this.mediaLinks.push(url);
    }
    removeMediaLink(url){
        let ind = this.mediaLinks.indexOf(url);
        if(ind === -1) return;
        this.mediaLinks.splice(ind,1);
    }
};