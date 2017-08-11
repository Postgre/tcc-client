const BaseModel = require('./core/BaseModel');
const CarolerConfigs = require('./../lib/caroler_configs/CarolerConfigs');
const SpecialDate = require('./../lib/special_date/SpecialDate');

module.exports = class Market extends BaseModel {

    constructor(){
        super();
        this.specialDates   =   [];
        this.mediaLinks     =   [];
        this.carolerConfigs =   new CarolerConfigs();
        this.upcomingEvents =   null;
        this.activeCarolers =   null;
    }

    load(promises){
        // load special dates
        let specialDatesPromise = this.dataService.getSpecialDates(this.id)
            .then((res)=>{
                let _dates = res.data;
                _dates.forEach((_date)=>{
                    this.specialDates.push(_date);
                });
            });
        // load media links
        let mediaLinksPromise = this.dataService.getMedia(this.id)
            .then((res)=>{
                let _links = res.data;
                _links.forEach((_link)=>{
                    this.addMediaLink({
                        id: _link.id,
                        url: _link.url
                    });
                });
            });
        // load caroler configs
        let carolerConfigsPromise = this.dataService.getCarolerConfigs(this.id)
            .then((_configs)=>{
                this.carolerConfigs = new CarolerConfigs(_configs);
            });
        promises.push(specialDatesPromise);
        promises.push(mediaLinksPromise);
        promises.push(carolerConfigsPromise);
    }
    update(){
        let p = super.update();
        // update special dates
        if(this.specialDates.length > 0){
            this.dataService.putSpecialDates(this.id, this.specialDates);
        }
        // update media links
        if(this.mediaLinks.length > 0){
            this.dataService.putMedia(this.id, this.mediaLinks);
        }
        // update caroler configs
        this.dataService.putCarolerConfigs(this.id, this.carolerConfigs);

        return p;
    }

    getFormattedAddress(){
        return this.city+", "+this.state+", "+this.address;
    }

    addSpecialDate(){
        this.specialDates.push(new SpecialDate());
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
    
    getUpcomingEvents(){
        return new Promise((resolve, reject)=>{
            if(this.upcomingEvents) resolve(this.upcomingEvents);
            this.dataService.marketUpcomingEvents(this.id)
                .then(
                    (events)=>{
                        this.upcomingEvents = events;
                        resolve(this.upcomingEvents);
                    }
                ).catch(reject);
        });
    }
    getCarolers(){
        return new Promise((resolve, reject)=>{
            if(this.activeCarolers) resolve(this.activeCarolers);
            this.dataService.getMarketCarolers(this.id).then(
                (carolers)=>{
                    this.activeCarolers = carolers;
                }, reject
            )
        });
    }
};