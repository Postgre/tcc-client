const BaseModel = require('./BaseModel');
const SpDate = require('./SpDate');

module.exports = class Market extends BaseModel {
    constructor(DataService, AuthService, data){
        super(DataService, AuthService, data);

        this.required = [
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

        this.specialDates   =   [];
        this.mediaLinks     =   [];
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
    loadSpecialDates(){
        let p = this.dataService.getSpecialDates(this.id);
        p.then((res)=>{
            let _dates = res.data;
            _dates.forEach((_date)=>{
                this.addSpecialDate(new SpDate(this.dataService, this.authService, _date));
                console.log(this.specialDates);
            });
        });
        return p;
    }
    save() {
        let dates = [];
        this.specialDates.forEach((date)=>{
            dates.push(date.getData());
        });
        console.info("saving", this.getData(), dates);
        return [
            this.dataService.putMarket(this.id, this.getData()),
            this.dataService.putSpecialDates(this.id, dates)
        ];
    }

};