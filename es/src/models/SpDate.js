const BaseModel = require('./core/BaseModel');

module.exports = class SpDate extends BaseModel {
    static get required() {
        return ["date_from", "date_to", "available", "pricing_scale", "pricing_offset"];
    }
    static get defaults(){
        return {
            "pricing_scale": 1
        };
    }

};