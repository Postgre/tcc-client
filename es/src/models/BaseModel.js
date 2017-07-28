module.exports = class BaseModel {
    constructor(DataService, AuthService, data){
        this.dataService = DataService;
        this.authService = AuthService;
        Object.assign(this, data);
    }
};