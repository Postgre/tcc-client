module.exports = class BaseModel {
    constructor(DataService, AuthService, data){
        this.dataService = DataService;
        this.authService = AuthService;

        this.required = [];
        this.optional = [];
        this.defaults = {};

        Object.assign(this, data);
    }
    bootstrap(){
        this.required.forEach((prop)=>{
            if(typeof this[prop] === 'undefined') this[prop] = BaseModel.getDefault();
        });
        for(let key in this.defaults){
            if (this.defaults.hasOwnProperty(key)) {
                this[key] = this[key] || this.defaults[key];
            }
        }
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