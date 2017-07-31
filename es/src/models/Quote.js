const BaseModel = require('./core/BaseModel');

module.exports = class Quote extends BaseModel {
    static get required(){
        return [
            "caroler_config",
            "address",
            "start_time",
            "end_time"
        ]
    }

    submit(){
        return window.dataService.postQuote(this.address, this.start_time, this.end_time, this.caroler_config);
    }
};