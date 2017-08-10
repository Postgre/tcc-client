const BaseModel = require('./core/BaseModel');

module.exports = class Reseller extends BaseModel {
    constructor(){
        super();
        this.promotion = {};
    }

    load(promises, dataPromise){
        let p = new Promise((resolve, reject)=>{
            dataPromise.then((instance)=>{
                this.factory.find("PromoCode", instance.promotion_id).then((promo_code)=>{
                    instance.promotion = promo_code;
                    resolve(instance);
                })
            });
        });
        promises.push(p);
    }
};