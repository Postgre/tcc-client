const qs = require('qs');

module.exports = class AxiosDriver {

    constructor(axiosConnection){
        this.axiosConnection = axiosConnection;
    }

    execute(request){
        return this.axiosConnection(request);
    }

};