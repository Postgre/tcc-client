const BaseModel = require('./core/BaseModel');
const PromoCode = require('./PromoCode');

module.exports = class Booking extends BaseModel {

    constructor(){
        super();
        this.promo_codes = [];
    }

    submit(){
        return this.dataService.postBooking(this.getData(), this.caroler_config, this.getPromoData());
    }

    getFormattedAddress(){
        if(!this.validateAddress()) return null;
        return this.city+", "+this.state+", "+this.address;
    }
    getPromoData(){
        if(!this.promo_codes) return [];
        let _promos = [];
        this.promo_codes.forEach((code)=>{
            _promos.push(code.code);
        });
        return _promos;
    }

    getPrettyDates(moment){
        return {
            date: moment(this.start_time).format("MM-DD-YYYY"),
            start: moment(this.start_time).format("HH:MM"),
            end: moment(this.end_time).format("HH:MM")
        };
    }

    /* Previews */
    getTravelPreview(){
        return this.dataService.previewTravel(this.market_id, this.address, this.city, this.state);
    }
    getInvoicePreview(){
        let postData = this.getData();
        postData.address = this.getFormattedAddress();
        console.log(postData);
        return this.dataService.postQuotePreview(postData, this.caroler_config, this.getPromoData());
    }
    // end

    /* Promo Codes */
    applyPromoCode(code){
        return new Promise((resolve, reject)=>{
            this.dataService.validatePromo(code, this.start_time, this.end_time)
                .then((_promo)=>{
                    let promo = this.factory.create("PromoCode", _promo);
                    this.promo_codes.push(promo);
                    resolve(promo);
                }).catch((err)=>{
                    reject(err);
                })
        });
    }
    removePromoCode(promoCode){
        let ind = this.promo_codes.indexOf(promoCode);
        if(ind >= 0) this.promo_codes.splice(ind, 1);
    }
    // end

    /* Validators */
    validateDetails(){
        let configs = ['trio_stb', 'trio_sab', 'quartet', 'sixtet', 'octet'];
        if(!this.start_time) return "start time";
        if(!this.end_time) return "end_time";
        if(!configs.includes(this.caroler_config)) return "caroler config";
        console.log("valid details!", this.getData());
        return "all good!";
    }
    validateAddress(){
        return (
            this.state
            && this.city
            && this.address
        )
    }
    // end
};