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
};