module.exports = class Intuit {

    constructor(config){
        this.client_id = config['intuit_client_id'];
    }

    getClientId(){
        return this.client_id;
    }
};