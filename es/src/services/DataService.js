const axios = require('axios');

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
};