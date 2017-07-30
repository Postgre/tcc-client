const BaseModel = require('./BaseModel');
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

        // this.registerLoader((instance, dataService)=>{
        //     let p = dataService.getSpecialDates(instance.id);
        //     p.then((res)=>{
        //         let _dates = res.data;
        //         _dates.forEach((_date)=>{
        //             instance.addSpecialDate(new SpDate(dataService, AuthService, _date));
        //         });
        //     });
        //     return p;
        // }); // special dates
        // this.registerLoader((instance, dataService)=>{
        //     let p = dataService.getMedia(instance.id);
        //     p.then((res)=>{
        //         let _links = res.data;
        //         _links.forEach((_link)=>{
        //             instance.addMediaLink({
        //                 id: _link.id,
        //                 url: _link.url
        //             });
        //             console.log("link", _link);
        //         })
        //     });
        //     return p;
        // }); // media links
        // this.registerLoader((instance, dataService)=>{
        //     return new Promise((res, rej)=>{
        //         instance.carolerConfigs.trio_sab = true;
        //         instance.carolerConfigs.trio_stb = true;
        //         instance.carolerConfigs.quartets = true;
        //         instance.carolerConfigs.sixtets = true;
        //         instance.carolerConfigs.octets = true;
        //         res();
        //     });
        // }); // caroler configs
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

    // save() {
    //     let dates = [];
    //     this.specialDates.forEach((date)=>{
    //         dates.push(date.getData());
    //     });
    //     console.info("saving", this.getData(), dates);
    //     return [
    //         this.dataService.putMarket(this.id, this.getData()),
    //         this.dataService.putSpecialDates(this.id, dates),
    //         this.dataService.putMedia(this.id, this.mediaLinks)
    //     ];
    // }
    // static load(id){
    //     // I. Just. Hope. that we catch all exceptions
    //     // Oh nah nah, just be careful
    //     // Oh nah nah, ORMs aint simple
    //     // La la, Promise me no promises
    //     let promise_market = window.dataService.getMarket(nav_params.market_id);
    //     let market = new Market(window.dataService, window.authService);
    //     promise_market.then((res)=>{
    //         let _market = res.data.market;
    //         let market =
    //         window.modelFactory.load("Market", _market).then((model)=>{
    //             $scope.$apply(function () {
    //                 $scope.market = model;
    //                 window.market = $scope.market;
    //             });
    //         });
    //     });
    // }
};