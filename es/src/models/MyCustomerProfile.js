const BaseModel = require('./core/BaseModel');

module.exports = class MyCustomerProfile extends BaseModel {
    url(){ return this.endpoint; }
};