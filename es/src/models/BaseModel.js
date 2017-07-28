module.exports = class BaseModel {
    constructor(DataService, AuthService, data){
        this.fillable = [];
        this.dataService = DataService;
        this.authService = AuthService;
        Object.assign(this, data);
    }
    bootstrap(){
        this.fillable.forEach((prop)=>{
            if(typeof this[prop] === 'undefined') this[prop] = null;
        })
    }
    getFillables(){
        this.bootstrap();
        let data = {};
        this.fillable.forEach((prop)=>{
            data[prop] = this[prop];
        });
        return data;
    }
};