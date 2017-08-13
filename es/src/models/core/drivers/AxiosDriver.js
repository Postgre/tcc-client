const qs = require('qs');

module.exports = class AxiosDriver {

    constructor(axiosConnection){
        this.axiosConnection = axiosConnection;
    }

    execute(url, method, data, params){
        return this.axiosConnection({
            urL: url,
            method: method,
            data: qs.stringify(data),
            params: params
        })
    }

};