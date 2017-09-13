const axios = require('axios');
const qs = require('qs');

/* Data Service */
module.exports = class DataService {

    constructor(connection, config) {
        this.config = config;
        this.connection = connection
    }

    verifyEmail(code){
        return this.connection({
            url: "auth/verify/"+code,
            method: "GET"
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
                method: "DELETE"
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
    getResourceAll( resourceName, params ){
        return new Promise((resolve, reject)=>{
            this.connection({
                url: resourceName,
                method: "GET",
                params: params
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
                let market  = res.data.market;
                let q = res.data.quote;
                let quote   = {
                    id: q.id,
                    carolers: q.cost_carolers,
                    travel: q.cost_travel,
                    dates: q.cost_date,
                    discounts: q.cost_discounts,
                    total: q.cost_total
                };
                resolve({
                    market: market,
                    quote: quote
                });
            }).catch((err)=>{
                console.log(err);
                if(err.response.data.status){
                    reject(err.response.data.status);
                }
                reject(err);
            })
        });
    }
    postQuotePreview( event, caroler_config, promo_codes ){
        event['caroler_config'] = caroler_config;
        event['promo_codes'] = promo_codes;
        return new Promise((resolve, reject)=>{
            this.connection({
                url: "quotes/preview",
                method: "POST",
                data: qs.stringify(event)
            }).then((res)=>{
                let myFormat = {
                    carolers:   res.data.cost_carolers,
                    date:       res.data.cost_date,
                    discounts:  res.data.cost_discounts,
                    travel:     res.data.cost_travel_distance + res.data.cost_travel_duration,
                    total:      res.data.cost_total
                };
                resolve(myFormat);
            }).catch((err)=>{
                reject(err);
            })
        })
    }
    postSaveQuote( quote_id, email ){
        return this.connection({
            url: "quotes/"+quote_id+"/save",
            method: "POST",
            data: qs.stringify({
                email: email,
                callback: this.callback("save_quote")
            })
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
        let params = {};
        if( search ) params.search = search;
        if( limit ) params.limit = limit;
        if( offset ) params.offset = offset;
        return this.connection({
            url: "markets",
            method: "GET",
            params: params
        })
    }                   // TODO: resolve
    searchMarketsGeo( params ){
        return new Promise((resolve, reject)=>{
            this.connection({
                url: "markets/geo",
                method: "GET",
                params: params
            }).then((res) => resolve(res.data), reject);
        });
    }       // TODO: resolve
    getMarketsManaged(){
        return new Promise((resolve, reject)=>{
            this.connection({
                url: "markets/managed",
                method: "GET"
            }).then((res)=>{
                resolve(res.data);
            }).catch((err)=>{
                reject(err);
            })
        });
    }
    getMarketCarolers(id){
        return new Promise((resolve, reject)=>{
            this.connection({
                url: "markets/"+id+"/carolers",
                method: "GET"
            }).then((res)=>resolve(res.data), reject);
        });
    }
    getMarketDirectors(id){
        return new Promise((resolve, reject)=>{
            this.connection({
                url: "markets/"+id+"/directors",
                method: "GET"
            }).then((res)=>resolve(res.data), reject);
        });
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
    }                               // TODO: resolve
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
    }                                       // TODO: resolve
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
    marketUpcomingEvents(market_id){
        return new Promise((resolve, reject)=>{
            this.connection({
                method: "GET",
                url: `markets/${market_id}/events/upcoming`
            }).then((res)=>{
                resolve(res.data);
            }, reject);
        });
    }
    
    /**
     * EVENTS
     * ==================
     */
    getMyEvents(){
        return new Promise((resolve, reject)=>{
            this.connection({
                url: "users/events/booked",
                method: "GET"
            }).then(res=>resolve(res.data), reject);
        });
    }

    /**
     * BOOKING
     * ==============================
     */
    previewTravel( market_id, address, city, state ){
        return new Promise((resolve, reject)=>{
            this.connection({
                url: "quotes/preview/travel",
                method: "POST",
                params: {
                    market_id: market_id,
                    address: address,
                    city: city,
                    state: state
                }
            }).then((res)=>{
                let myFormat = {
                    costs: {
                        distance: res.data.cost_travel_distance,
                        duration: res.data.cost_travel_duration
                    },
                    metrics: {
                        distance: res.data.travel_distance,
                        duration: Math.round( res.data.travel_duration * 60 )// hours => minutes
                    }
                };
                resolve(myFormat);
            }).catch((err)=>{
                reject(err);
            })
        });
    }
    postBooking(event, caroler_config, promo_codes){
        event['promo_codes'] = promo_codes;
        event['caroler_config'] = caroler_config;
        return new Promise((resolve, reject)=>{
            this.connection({
                url: "events/book",
                method: "POST",
                data: qs.stringify(event)
            }).then((res)=>{
                resolve(res.data)
            }).catch((err)=>{
                reject(err);
            })
        })
    }
    validatePromo( code, start, end ){
        return new Promise((resolve, reject)=>{
            this.connection({
                url: "promotions/validate/" + code,
                method: "GET",
                params: {
                    start_time: start,
                    end_time: end
                }
            }).then((res)=>{
                resolve(res.data);
            }).catch((err)=>{
                reject(err.response.data.status);
            })
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
    } // TODO: resolve
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
    getCarolerInvites(market_id){
        return new Promise((resolve, reject)=>{
            this.connection({
                url: "invites/caroler",
                method: "GET",
                params: {
                    market_id: market_id,
                    redeemed: false,
                    expired: false,
                    status: "pending"
                }
            }).then(
                res => resolve(res.data),
                reject
            )
        });
    }
    getCarolerRequests(market_id){
        console.log();
        return new Promise((resolve, reject)=>{
            this.connection({
                url: "requests/caroler",
                method: "GET",
                params: {
                    to: market_id,
                    with: 'user',
                    status: "pending"
                }
            }).then(
                (res) => resolve(res.data),
                reject
            )
        });
    }
    approveCarolerRequest(request_id){
        return new Promise((resolve, reject)=>{
            this.connection({
                url: `requests/caroler/${request_id}/approve`,
                method: "GET",
                params: {
                    callback: this.callback("caroler_approved")
                }
            }).then(resolve, reject);
        });
    }
    rejectCarolerRequest(request_id){
        return new Promise((resolve, reject)=>{
            this.connection({
                url: `requests/caroler/${request_id}/reject`,
                method: "GET"
            }).then(resolve, reject);
        });
    }
    sendCarolerInvite(market_id, caroler_email){
        return new Promise((resolve, reject)=>{
            this.connection({
                url: `markets/${market_id}/invite-caroler`,
                method: "GET",
                params: {
                    to: caroler_email,
                    callback: this.callback("caroler_invite")
                }
            }).then(
                (res) => resolve(res),
                (err) => reject(err)
            );
        });
    }
    cancelCarolerInvite(invite_id){
        return this.connection({
            url: "invites/caroler/"+invite_id,
            method: "DELETE"
        })
    }
    sendCarolerRequest(market_id, email){
        return new Promise((resolve, reject)=>{
            this.connection({
                url: `markets/${market_id}/request-caroler`,
                method: "GET",
                params: {
                    email: email,
                    callback: this.callback("caroler_request", "market="+market_id)
                }
            }).then(resolve, reject);
        });
    }
    requestInvite(market_id, your_email){
        return this.connection({
            url: `markets/${market_id}/request-caroler-invite`,
            method: "POST",
            data: qs.stringify({
                email: your_email
            }),
            params: {
                callback: this.callback("invite_request", "email="+your_email)
            }
        })
    }
    getDirectorInvites(market_id){
        return new Promise((resolve, reject)=>{
            this.connection({
                url: "invites/director",
                method: "GET",
                params: {
                    market_id: market_id,
                    redeemed: false,
                    expired: false,
                    status: "pending"
                }
            }).then(
                res => resolve(res.data),
                reject
            )
        });
    }
    sendDirectorInvite(market_id, director_email){
        return new Promise((resolve, reject)=>{
            this.connection({
                url: `markets/${market_id}/invite-director`,
                method: "GET",
                params: {
                    to: director_email,
                    callback: this.callback("director_invite", ["market="+market_id, "action=redeem"])
                }
            }).then(
                (res) => resolve(res),
                (err) => reject(err)
            );
        });
    }
    cancelDirectorInvite(invite_id){
        return this.connection({
            url: "invites/director/"+invite_id,
            method: "DELETE"
        })
    }
    redeemCarolerInvite(code){
        return new Promise((resolve, reject)=>{
            this.connection({
                url: "invites/caroler/redeem/"+code,
                method: "GET"
            }).then(
                (res) => resolve(res),
                (err) => {
                    if(err.response) reject(err.response.data.status);
                    reject(err);
                }
            )
        });
    }
    redeemDirectorInvite(code){
        return new Promise((resolve, reject)=>{
            this.connection({
                url: "invites/director/redeem/"+code,
                method: "GET"
            }).then(
                (res) => resolve(res),
                (err) => {
                    if(err.response) reject(err.response.data.status);
                    reject(err);
                }
            )
        });
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
    subscribe(email){
        return this.connection({
            url: "subscribe",
            method: "POST",
            data: qs.stringify({
                email: email
            })
        });
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

    /* caroler-dashboard.php */
    getAvailableEvents(){
        return new Promise((resolve, reject)=>{
            this.connection({
                url: "events/enrollments/available",
                method: "GET"
            }).then((res)=>{
                resolve(res.data);
            }, reject);
        });
    }
    getBookedEvents(){
        return new Promise((resolve, reject)=>{
            this.connection({
                url: "events/enrollments/booked",
                method: "GET"
            }).then((res)=>{
                resolve(res.data);
            }, reject);
        });
    }
    getPastEvents(){
        return new Promise((resolve, reject)=>{
            this.connection({
                url: "events/enrollments/completed",
                method: "GET"
            }).then((res)=>{
                resolve(res.data);
            }, reject);
        });
    }
    claimEvent(enrollment_id){
        return this.connection({
            url: `events/enrollments/${enrollment_id}/claim`,
            method: "POST"
        });
    }
    withdrawEvent(enrollment_id){
        return this.connection({
            url: `events/enrollments/${enrollment_id}/withdraw`,
            method: "POST"
        });
    }

    /* profile.php */
    getAllCarolerTypes(){
        return new Promise((resolve, reject)=>{
            this.connection({
                url: "caroler-types"
            }).then((res)=>resolve(res.data), reject);
        });
    }
    marketsICarolIn(){
        return new Promise((resolve, reject)=>{
            this.connection({
                url: "/markets/enrolled",
                method: "GET"
            }).then(
                (res) => resolve(res.data),
                reject
            )
        });
    }
    
    /* login-register */
    recoverPassword(email){
        return this.connection({
            url: "auth/recovery",
            method: "POST",
            data: qs.stringify({
                email: email,
                callback: this.callback("recover", "email="+email)
            })
        });
    }
    resetPassword(email, newPassword, token){
        return this.connection({
            url: "auth/reset",
            method: "POST",
            data: qs.stringify({
                email: email,
                password: newPassword,
                password_confirmation: newPassword,
                token: token
            })
        })
    }

    callback(name, params){
        let base = window.location.origin;
        let activity = this.config.callbacks[name];
        let callback = base+"/"+activity;
        if(params){
            if(Array.isArray(params)) callback += "?" + params.join("&");
            if(!Array.isArray(params)) callback += "?" + params;
        }
        console.log("callback", callback);
        return callback;
    }

    submitPayment(invoice_id, stripeToken, amount){
        return new Promise((resolve, reject)=>{
            this.connection({
                url: "checkout",
                method: "POST",
                data: qs.stringify({
                    invoice_id: invoice_id,
                    stripeToken: stripeToken,
                    amount: amount
                })
            }).then(resolve, reject)
        });
    }


    /**
     * ACTIVITIES
     * ========================
     */
    marketCarolers(market_id){
        return this.connection({
            method: "GET",
            url: "market-carolers/"+market_id
        });
    }
    carolerSingle(caroler_id){
        return new Promise((resolve, reject)=>{
            this.connection({
                url: "caroler-single/"+caroler_id,
                method: "GET"
            }).then((res)=>{
                resolve(res.data);
            }, reject);
        });
    }
};