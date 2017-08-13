module.exports = class BaseAjaxDriver {

    constructor(requestMaker){
        this.requestMaker = requestMaker;
    }

    /**
     * DRIVERS MUST IMPLEMENT THIS METHOD
     * @param request.url Your API endpoint
     * @param request.method Request method: GET | PUT | POST | DELETE
     * @param request.data Request body/payload
     * @param request.params Request URL(GET) parameters
     */
    execute(request){
        // implement me
    }

};