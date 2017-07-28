module.exports = class BaseModel {
    constructor(DataService, AuthService, data){
        this.required = [];
        this.optional = [];
        this.dataService = DataService;
        this.authService = AuthService;
        Object.assign(this, data);
    }
    bootstrap(){
        this.required.forEach((prop)=>{
            if(typeof this[prop] === 'undefined') this[prop] = BaseModel.getDefault();
        });
    }
    getData(){
        this.bootstrap();
        let data = {};
        this.required.forEach((prop)=>{
            data[prop] = this[prop];
        });
        this.optional.forEach((prop)=>{
            if(this[prop]) data[prop] = this[prop];
        });
        return data;
    }
    static getDefault(){
        return "";
    }
};