const BaseModel = require('./core/BaseModel');

module.exports = class MyDirectorProfile extends BaseModel {
    url(){ return this.endpoint; }
};