module.exports = class QuoteRequest {
    constructor(data, dataService){
        this.dataService = dataService;
        this.caroler_config = data.caroler_config;
        this.address = data.address;
        this.start_time = data.start_time;
        this.end_time = data.end_time;
    }

    submit(){
        return this.dataService.postQuote(this.address, this.start_time, this.end_time, this.caroler_config);
    }
};