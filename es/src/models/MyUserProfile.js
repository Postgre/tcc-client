const BaseModel = require('./core/BaseModel');

module.exports = class MyUserProfile extends BaseModel {
    url(){ return this.endpoint; }
};