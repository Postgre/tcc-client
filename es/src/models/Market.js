const BaseModel = require('./core/BaseModel');
const CarolerConfigs = require('./../lib/caroler_configs/CarolerConfigs');
const SpecialDate = require('./../lib/special_date/SpecialDate');

module.exports = class Market extends BaseModel {

    constructor(){
        super();
        this.specialDates   =   [];
        this.mediaLinks     =   [];
        this.carolerConfigs =   new CarolerConfigs();
        /* relations */
        this.upcomingEvents =   null;
        this.activeCarolers =   null;
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

    loadGallery(){
        this.dataService.getMedia(this.id)
            .then((res)=>{
                let _links = res.data;
                _links.forEach((_link)=>{
                    this.addMediaLink({
                        id: _link.id,
                        url: _link.url
                    });
                });
                this.notify("async");
            });
    }
    loadSpecialDates(){
        this.dataService.getSpecialDates(this.id)
            .then((res)=>{
                let _dates = res.data;
                _dates.forEach((_date)=>{
                    this.specialDates.push(_date);
                });
                this.notify("async");
            });
    }
    loadCarolerConfigs(){
        this.dataService.getCarolerConfigs(this.id)
            .then((_configs)=>{
                this.carolerConfigs = new CarolerConfigs(_configs);
                this.notify("async");
            });
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

    // TODO: rename get => load
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
    loadCarolers(){
        return new Promise((resolve, reject)=>{
            if(this.activeCarolers) resolve(this.activeCarolers);
            this.dataService.connection({
                url: `markets/${this.id}/carolers`,
                method: "GET",
                params: {
                    "with": "caroler_types"
                }
            }).then((res)=>{
                resolve(res.data);
            }, reject)
        });
    }

    inviteCaroler(email){
        return dataService.postDelegationsCaroler(this.id, email);
    }
    inviteDirector(email){
        return dataService.postDelegationsDirector(this.id, email);
    }

    callAsync(){
        setTimeout(()=>{
            this.notify("async", "fooe");
        }, 3000);
    }
};