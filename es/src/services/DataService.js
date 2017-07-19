const axios = require('axios');
const qs = require('qs');

/* Data Service */
module.exports = class DataService {

    constructor(config, authService) {
        console.info('DataService Loading...');

        this.callback_save_quote = config.callback_save_quote;
        this.authService = authService;

        /* Connection to server */
        this.connection = axios.create({
            baseURL: config.serverURL,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + authService.jwt
            }
        })
    }

    /**
     * QUOTES
     * =============================
     */
    postQuote( address, start_time, end_time, caroler_count ){
        return this.connection({
            url: "quotes",
            method: "POST",
            data: qs.stringify({
                address: address,
                start_time: start_time,
                end_time: end_time,
                caroler_count: caroler_count
            })
        });
    }
    postSaveQuote( quote_id, email ){
        return this.connection({
            url: "quotes/"+quote_id+"/save",
            method: "POST",
            data: qs.stringify({
                email: email,
                callback: this.callback_save_quote
            })
        })
    }

    /**
     * MARKETS
     * =============================
     */
    postMarket( name, bio, location ){
        return this.connection({
            url: "markets",
            method: "POST",
            data: qs.stringify({
                name: name,
                bio: bio,
                address: location
            })
        })
    }
    putMarket( id, params ){
        return this.connection({
            url: "markets/"+id,
            method: "PUT",
            data: qs.stringify(params)
        });
    }
    deleteMarket( id ){
        return this.connection({
            url: "markets/"+id,
            method: "delete"
        })
    }
    searchMarkets( search, limit, offset ){
        var params = {};
        if( search ) params.search = search;
        if( limit ) params.limit = limit;
        if( offset ) params.offset = offset;
        return this.connection({
            url: "markets",
            method: "GET",
            params: params
        })
    }
    searchMarketsGeo( address, radius, limit, offset ){
        return this.connection({
            url: "markets/geo",
            method: "GET",
            params: {
                address: address,
                radius: radius,
                limit: limit,
                offset: offset
            }
        })
    }
    getMarket( id ){
        return this.connection({
            url: "markets/"+id
        })
    }

    /**
     * BOOKING
     * ==============================
     */
    previewTravel( market_id, address, city, state ){
        return this.connection({
            url: "quotes/preview/travel",
            method: "POST",
            params: {
                market_id: market_id,
                address: address,
                city: city,
                state: state
            }
        })
    }

    /**
     * PROFILE
     * ========================
     */
    getProfiles(){
        return this.connection({
            url: "users/profile",
            method: "GET"
        })
    }
    putProfile( params ){
        return this.connection({
            url: "users/profile",
            method: "PUT",
            params: params
        })
    }

    /**
     * DELEGATIONS
     * ====================
     */
    postDelegationsCaroler(market_id, caroler_email){
        return this.connection({
            url: "delegations/caroler",
            method: "POST",
            data: qs.stringify({
                marketID: market_id,
                email: caroler_email
            })
        })
    }
    postDelegationsDirector(market_id, director_email){
        return this.connection({
            url: "delegations/director",
            method: "POST",
            data: qs.stringify({
                marketID: market_id,
                email: director_email
            })
        })
    }
};