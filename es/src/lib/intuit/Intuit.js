module.exports = class Intuit {

    constructor(config){
        console.log(config);
        this.client_id = config['intuit_client_id'];
    }

    startCharge(amount, card){
        let payload = {
            "amount": amount,
            "card": card,
            "currency": "USD"
        };
    }

    getClientId(){
        return this.client_id;
    }
};