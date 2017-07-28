module.exports = class ModelFactory {
    constructor(DataService, AuthService){
        this.dataService = DataService;
        this.authService = AuthService;
    }
    make(ModelClass, data){
        return new window[ModelClass](this.dataService, this.authService, data);
    }
};