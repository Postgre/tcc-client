const BaseModel = require('./core/BaseModel');

module.exports = class PromoCode extends BaseModel {
    static get endpoint(){
        return "promotions";
    }
    static get required(){
        return [
            'name',
            'description',
            'pricing_scale',
            'pricing_offset',
            'start_time',
            'end_time'
        ];
    }
    static get optional(){
        return [
            'code',
            'active'
        ]
    }
    static get defaults(){
        return {
            'pricing_scale': 1,
            'pricing_offset': 0
        };
    }
};