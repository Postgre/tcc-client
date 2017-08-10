const BaseModel = require('./core/BaseModel');

module.exports = class Reseller extends BaseModel {
    static get endpoint(){
        return "resellers";
    }
    static get required(){
        return [
            'name',
            'address'
        ];
    }
    static get optional(){
        return [
            'promotion_id'
        ]
    }

    constructor(dataService){
        super(dataService);
        this.promo = {};
    }

    loadPromo(){
        if(!this.promotion_id){
            alert("ERROR: tried to load promo, but no promotion_id was set");
            return;
        }
        return new Promise((resolve, reject)=>{
            // TODO: refactor
            this.promo = new PromoCode(this.dataService).find(this.promotion_id, resolve);
        });
    }
};