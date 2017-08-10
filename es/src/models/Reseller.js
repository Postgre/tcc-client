const BaseModel = require('./core/BaseModel');

module.exports = class PromoCode extends BaseModel {
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
    find(id, onload){
        super.find(id, ()=>{
            this.loadPromo().then(onload);
        });
    }
    save(){
        super.save().then(()=>{
            return this.loadPromo();
        });
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