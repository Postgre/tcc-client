const qs = require('qs');

module.exports = class AxiosDriver {

    constructor(axiosConnection){
        this.axiosConnection = axiosConnection;
    }

    execute(request){
        if(request.data){
            request.data = qs.stringify(request.data);
        }
        return this.axiosConnection(request);
    }

};