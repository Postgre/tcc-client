const BaseModel = require('./core/BaseModel');
const SpDate = require('./SpDate');

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
        this.carolerConfigs =   {};
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

    static get loaders(){
        return [
            (instance, dataService)=>{
                let p = dataService.getSpecialDates(instance.id);
                p.then((res)=>{
                    let _dates = res.data;
                    _dates.forEach((_date)=>{
                        instance.addSpecialDate(new SpDate(_date));
                    });
                });
                return p;
            },
            (instance, dataService)=>{
                let p = dataService.getMedia(instance.id);
                p.then((res)=>{
                    let _links = res.data;
                    _links.forEach((_link)=>{
                        instance.addMediaLink({
                            id: _link.id,
                            url: _link.url
                        });
                    })
                });
                return p;
            },
            (instance, dataService)=>{
                return new Promise((res)=>{
                    instance.carolerConfigs.trio_sab = true;
                    instance.carolerConfigs.trio_stb = true;
                    instance.carolerConfigs.quartets = true;
                    instance.carolerConfigs.sixtets = true;
                    instance.carolerConfigs.octets = true;
                    res();
                });
            }
        ];
    }
    static get savers(){
        return [
            (self, ds)=>{
                if(self.specialDates.length === 0) return;
                let _dates = [];
                self.specialDates.forEach((date)=>{
                    _dates.push(date.getData());
                });
                ds.putSpecialDates(self.id, _dates);
            },
            (self, ds)=>{
                if(self.mediaLinks.length === 0) return;
                ds.putMedia(self.id, self.mediaLinks)
            }
        ]
    }
};