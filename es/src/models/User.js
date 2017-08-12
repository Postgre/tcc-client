const BaseModel = require('./core/BaseModel');

module.exports = class User extends BaseModel {
    constructor(){
        super();
        this.directorProfile = null;
        this.carolerProfile = null;
        this.customerProfile = null;
    }

    loadCustomerProfile(){
        // TODO: wait for Caleb
        setTimeout(()=>{
            this.notify("resolve");
        }, 3000);
    }
    loadDirectorProfile(){
        // TODO: wait for Caleb
    }
    loadCarolerProfile(){
        // TODO: wait for Caleb
    }
};