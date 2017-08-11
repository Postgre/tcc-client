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
        let _promos = [];
        this.promo_codes.forEach((code)=>{
            _promos.push(code.code);
        });
        return _promos;
    }

    /**
     * Previews
     * ==================
     */
    getTravelPreview(){
        return this.dataService.previewTravel(this.market_id, this.address, this.city, this.state);
    }
    getInvoicePreview(){
        let postData = this.getData();
        postData.address = this.getFormattedAddress();
        console.log(postData);
        return this.dataService.postQuotePreview(postData, this.caroler_config, this.getPromoData());
    }

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

    /**
     * Validators
     * ==================
     */
    validateDetails(){
        return (
            this.name
            && this.start_time
            && this.end_time
            && this.type
            && this.caroler_config
        )
    }
    validateAddress(){
        return (
            this.state
            && this.city
            && this.address
        )
    }
};