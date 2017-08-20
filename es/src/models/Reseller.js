const BaseModel = require('./core/BaseModel');

module.exports = class Reseller extends BaseModel {
    constructor(){
        super();
        this.promotion = {};
    }

    loadPromo(){
        this.factory.find("PromoCode", this.promotion_id).then((promo_code)=>{
            this.promotion = promo_code;
            this.notify("async");
        })
    }
};