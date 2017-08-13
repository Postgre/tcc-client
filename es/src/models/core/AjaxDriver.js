module.exports = class BaseAjaxDriver {

    constructor(requestMaker){
        this.requestMaker = requestMaker;
    }

    execute(url, method, data, params){
        // implement me
    }

};