const BaseModel = require('./core/BaseModel');
const CarolerConfigs = require('./../lib/caroler_configs/CarolerConfigs');

module.exports = class Market extends BaseModel {
    static get endpoint(){
        return "markets";
    }
    static get required(){
        return [
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
            'state',
            'hour1',
            'hour2',
            'hour3',
            'hour4',
            'hour5',
        ];
    }
    static get defaults(){
        return {
            "hour1": 100,
            "hour2": 100,
            "hour3": 100,
            "hour4": 100,
            "hour5": 100,
        };
    }

    static get carolerConfigOptions(){
        return [
            {
                name: "Trio (S,T,B)",
                val: "trio_stb"
            },
            {
                name: "Trio (S,A,B)",
                val: "trio_sab"
            },
            {
                name: "Quartet",
                val: "quaretet"
            },
            {
                name: "Sixtet",
                val: "sixtet"
            },
            {
                name: "Octet",
                val: "octet"
            }
        ]
    }

    constructor(data){
        super(data);
        this.specialDates   =   [];
        this.mediaLinks     =   [];
        this.carolerConfigs =   new CarolerConfigs();
    }

    find(id, onload){
        super.find(id, onload);
        // load special dates
        dataService.getSpecialDates(this.id)
            .then((res)=>{
                let _dates = res.data;
                _dates.forEach((_date)=>{
                    this.addSpecialDate(_date);
                });
                onload();
            });
        // load media links
        dataService.getMedia(this.id)
            .then((res)=>{
                let _links = res.data;
                _links.forEach((_link)=>{
                    this.addMediaLink({
                        id: _link.id,
                        url: _link.url
                    });
                });
                onload();
            });
        // load caroler configs
        dataService.getCarolerConfigs(this.id)
            .then((_configs)=>{
                this.carolerConfigs = new CarolerConfigs(_configs);
                onload();
            })
    }
    update(){
        let p = super.update();
        // update special dates
        if(this.specialDates.length > 0){
            this.dataService.putSpecialDates(this.id, this.specialDates);
        }
        // update media links
        if(this.mediaLinks.length > 0){
            this.dataService.putMedia(this.id, this.mediaLinks)
        }
        // update caroler configs
        this.dataService.putCarolerConfigs(this.id, this.carolerConfigs);

        return p;
    }

    addSpecialDate(SpecialDate){
        this.specialDates.push(SpecialDate);
    }
    deleteSpecialDate(SpecialDate){
        let ind = this.specialDates.indexOf(SpecialDate);
        if(ind === -1) return;
        this.specialDates.splice(ind,1);
    }
    addMediaLink(media){
        this.mediaLinks.push(media);
    }
    removeMediaLink(url){
        let ind = this.mediaLinks.indexOf(url);
        if(ind === -1) return;
        this.mediaLinks.splice(ind,1);
    }

    static get savers(){
        return [
            (self, ds)=>{

            },
            (self, ds)=>{
                if(self.mediaLinks.length === 0) return;
                ds.putMedia(self.id, self.mediaLinks)
            }
        ]
    }
};