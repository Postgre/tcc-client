const Profile = require('./user/Profile');

module.exports = class MyUserProfile extends Profile {
    url(){ return this.endpoint; }
};