const BaseModel = require('./BaseModel');

module.exports = class SpDate extends BaseModel {

    constructor(DataService, AuthService, data){
        super(DataService, AuthService, data);
        this.required = [
            "caroler_config",
            "address",
            "start_time",
            "end_time"
        ];
        this.bootstrap();
    }

    submit(){
        return this.dataService.postQuote(this.address, this.start_time, this.end_time, this.caroler_config);
    }
};