const axios = require('axios');
const qs = require('qs');

/* Data Service */
module.exports = class DataService {
    constructor(config, authService) {
        console.info('DataService Loading...');

        /* Connection to server */
        this.connection = axios.create({
            baseURL: config.serverURL,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + authService.jwt
            }
        })
    }

    getProtected(){
        var p = this.connection({
            url: "/protected",
        });
        p.then( (res)=>{
            console.log( "response", res );
        });
    }

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
};