const BaseModel = require('./BaseModel');

module.exports = class SpDate extends BaseModel {

    constructor(DataService, AuthService, data){
        super(DataService, AuthService, data);
        this.required = [
            "date_from", "date_to", "available", "pricing_scale", "pricing_offset"
        ];
        this.optional = [ "id" ];
        this.defaults = {
            "pricing_scale": 1
        };
        this.bootstrap();
    }

    static availabilityOptions(){
        return [
            {
                val: true,
                label: "Yes"
            },
            {
                val: false,
                label: "No"
            }
        ];
    }
};