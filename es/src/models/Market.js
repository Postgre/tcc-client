const BaseModel = require('./BaseModel');

module.exports = class Market extends BaseModel {
    constructor(DataService, AuthService, data){
        super(DataService, AuthService, data);

        this.fillable = [
            'id',
            'published',
            'rate_caroler_base',
            'rate_caroler_discount',
            'rate_travel_distance',
            'rate_travel_duration',
            'name',
            'city',
            'phone',
            'email',
            'image',
            'html',
            'address',
            'state'
        ];
        this.bootstrap();

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

    save(){
        console.info("saving", this, this.getFillables());
        return this.dataService.putMarket(this.id, this.getFillables());
    }
};