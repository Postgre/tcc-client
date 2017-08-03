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

    postResource( resourceName, body ){
        return new Promise((resolve, reject)=>{
            this.connection({
                url: resourceName,
                method: "POST",
                data: qs.stringify(body)
            }).then((res)=>{
                resolve(res.data.id);
            }).catch((err)=>{
                reject(err);
            })
        })
    }
    deleteResource( resourceName, id ){
        return new Promise((resolve, reject)=>{
            this.connection({
                url: resourceName+"/"+id,
                method: "DELETE",
                data: qs.stringify(body)
            }).then((res)=>{
                resolve(res);
            }).catch((err)=>{
                reject(err);
            })
        })
    }
    putResource( resourceName, body, id ){
        return new Promise((resolve, reject)=>{
            this.connection({
                url: resourceName+"/"+id,
                method: "PUT",
                data: qs.stringify(body)
            }).then((res)=>{
                resolve(res.data.id);
            }).catch((err)=>{
                reject(err);
            })
        })
    }
    getResource( resourceName, id ){
        return new Promise((resolve, reject)=>{
            this.connection({
                url: resourceName+"/"+id,
                method: "GET"
            }).then((res)=>{
                resolve(res.data);
            }).catch((err)=>{
                reject(err);
            })
        })
    }
    getResourceAll( resourceName, filters ){
        return new Promise((resolve, reject)=>{
            this.connection({
                url: resourceName,
                method: "GET",
                params: filters
            }).then((res)=>{
                resolve(res.data);
            }).catch((err)=>{
                reject(err);
            })
        })
    }

    /**
     * QUOTES
     * =============================
     */
    postQuote( address, start_time, end_time, caroler_config ){
        return new Promise((resolve, reject)=>{
            this.connection({
                url: "quotes",
                method: "POST",
                data: qs.stringify({
                    address: address,
                    start_time: start_time,
                    end_time: end_time,
                    caroler_config: caroler_config
                })
            }).then((res)=>{
                resolve(res.data.quote, res.data.market);
            }).catch((err)=>{
                if(err.response.data.status === "BAD_ADDRESS"){
                    reject("BAD_ADDRESS");
                }
                reject(err);
            })
        });
    }
    postQuotePreview( address, start_time, end_time, caroler_config, market_id ){
        return this.connection({
            url: "quotes/preview",
            method: "POST",
            data: qs.stringify({
                address: address,
                start_time: start_time,
                end_time: end_time,
                caroler_config: caroler_config,
                market_id: market_id
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
    getQuote( id ){
        return this.connection({
            url: "quotes/"+id,
            method: "GET"
        })
    }

    /**
     * MARKETS
     * =============================
     */
    putMarket( id, params ){
        return this.connection({
            url: "markets/"+id,
            method: "PUT",
            data: qs.stringify(params)
        });
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
    getMarketsManaged(){
        return new Promise((resolve, reject)=>{
            this.connection({
                url: "markets/managed",
                method: "GET"
            }).then((res)=>{
                resolve(res.data.markets);
            }).catch((err)=>{
                reject(err);
            })
        });
    }
    getMarketCarolers(id){
        return this.connection({
            url: "markets/"+id+"/carolers",
            method: "GET"
        })
    }
    putSpecialDates( market_id, specialDates ){
        return this.connection({
            url: "markets/"+market_id+"/special-dates",
            method: "PUT",
            data: qs.stringify({
                special_dates: specialDates
            })
        })
    }
    getSpecialDates(market_id){
        return this.connection({
            url: "markets/"+market_id+"/special-dates",
            method: "GET"
        })
    }
    putMedia(market_id, links){
        return this.connection({
            url: "markets/"+market_id+"/gallery",
            method: "PUT",
            data: qs.stringify({
                gallery: links
            })
        })
    }
    getMedia(market_id){
        return this.connection({
            url: "markets/"+market_id+"/gallery",
            method: "GET"
        })
    }
    putCarolerConfigs(market_id, carolerConfigs){
        return this.connection({
            url: "markets/"+market_id+"/caroler-configs",
            method: "PUT",
            data: qs.stringify(carolerConfigs)
        })
    }
    getCarolerConfigs(market_id){
        return new Promise((resolve, reject)=>{
            this.connection({
                url: "markets/"+market_id+"/caroler-configs",
                method: "GET"
            }).then((res)=>{
                if(res.data) resolve(res.data);
                reject();
            })
        })
    }
    
    /**
     * EVENTS
     * ==================
     */
    getMarketEvents( market_id ){
        return this.connection({
            url: "markets/"+market_id+"/events",
            method: "GET"
        })
    }
    getMyEvents(){
        return this.connection({
            url: "users/events/booked",
            method: "GET"
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
    postBooking( market_id, event_data ){
        event_data.market_id = market_id;
        return this.connection({
            url: "events",
            method: "POST",
            data: qs.stringify(event_data)
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
        return new Promise((resolve, reject)=>{
            this.connection({
                url: "delegations/caroler",
                method: "POST",
                data: qs.stringify({
                    marketID: market_id,
                    email: caroler_email
                })
            }).then(()=>{
                resolve();
            }).catch((err)=>{
                switch(err.response.status){
                    case 422:
                        reject("DUPLICATE")
                }
                reject();
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

    /**
     * CONTACT
     * =========================
     * */
    postContact(name, email, phone, subject, message){
        return this.connection({
            url: "contact",
            method: "POST",
            data: qs.stringify({
                name: name,
                email: email,
                phone: phone,
                subject: subject,
                message: message
            })
        })
    }

    /**
     * ADMINS
     * =========================
     */
    searchUsers(query){
        return new Promise((resolve, reject)=>{
            this.connection({
                url: "users",
                method: "GET",
                params: {
                    search: query
                }
           }).then((res)=>{
                resolve(res.data);
            }).catch(()=>{
                reject();
            })
        });
    }
};