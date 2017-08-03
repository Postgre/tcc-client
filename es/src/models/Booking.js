const BaseModel = require('./core/BaseModel');

module.exports = class Booking extends BaseModel {
    static get endpoint(){
        return "events";
    }
    static get required(){
        return [
            'name',
            'market_id',
            'start_time',
            'end_time',
            'state',
            'city',
            'address',
            'caroler_config',
            'type',
            'requests'
        ];
    }
    static get defaults(){
        return {
            'type': 'personal',
            'caroler_config': 'quartet'
        };
    }

    constructor(data){
        super(data);
        this.promo_codes = [];
    }

    getFormattedAddress(){
        if(!this.validateAddress()) return null;
        return this.city+", "+this.state+", "+this.address;
    }

    /**
     * Previews
     * ==================
     */
    getTravelPreview(){
        return this.dataService.previewTravel(this.market_id, this.address, this.city, this.state);
    }
    getInvoicePreview(){
        return this.dataService.postQuotePreview(
            this.getFormattedAddress(),
            this.start_time,
            this.end_time,
            this.caroler_config,
            this.market_id
        )
    }
    applyPromoCode(code){
        // TODO: implement promotions
    }

    /**
     * Validators
     * ==================
     */
    validateDetails(){
        return (
            this.name
            && this.start_time
            && this.end_time
            && this.type
            && this.caroler_config
        )
    }
    validateAddress(){
        return (
            this.state
            && this.city
            && this.address
        )
    }
};