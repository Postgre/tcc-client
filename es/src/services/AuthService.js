/* Libraries */
const axios = require('axios');
const qs = require('qs');
const jwtDecode = require('jwt-decode');

/* Auth Service */
module.exports = class AuthService {
    constructor(config, storage, observers) {
        this.events = {};
        /* Register Observers */
        if(observers){
            observers.forEach((observer)=>{
                this.subscribe(observer.event, observer.callback);
            })
        }

        /* Saving Config */
        this.config = config;
        this.storage = storage;

        /* Local variables */
        this.jwt = this.storage.getItem('jwt');
        this.user = null;
        this.jwtExpire = null;

        /* Setting up refresh */
        if (this.jwt !== null) {
            let decoded = jwtDecode(this.jwt);
            this.user = decoded.user;

            /* Checking if already expired */
            if (decoded.exp < (new Date().getTime() / 1000)) {
                this.trigger("expired");
                this.logout();
            }
        }

        /* Connection to server */
        this.connection = axios.create({
            baseURL: config.serverURL,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            }
        })
    }

    login(email, password) {
        return new Promise((resolve, reject) => {
            this.connection({
                url: '/auth/login',
                method: "POST",
                data: qs.stringify({
                    email: email,
                    password: password
                })
            }).then((res) => {
                this.jwt = res.data.token;
                this.storage.setItem('jwt', res.data.token);
                let decoded = jwtDecode(res.data.token);
                this.user = decoded.user;
                this.jwtExpire = decoded.exp;

                this.trigger("newToken");
                resolve('Logged in');
            }).catch((error) => {
                if(error.response){
                    reject(error.response.status);
                }
                reject(error);
            });
        })
    }

    register(name, email, password) {
        return new Promise((resolve, reject) => {
            this.connection({
                url: '/auth/signup',
                method: "POST",
                data: qs.stringify({
                    name: name,
                    email: email,
                    password: password,
                    callback: this.callback('verify_your_email', ["action=verify"])
                })
            }).then(
                (res) => {
                    this.jwt = res.data.token;
                    this.storage.setItem('jwt', res.data.token);
                    let decoded = jwtDecode(res.data.token);
                    this.user = decoded.user;
                    this.jwtExpire = decoded.exp;
                    this.trigger("newToken");
                    resolve(res);
                },
                (error) => {
                    if(error.response){
                        reject(error.response.status);
                    }
                    reject(error);
                }
            );
        })
    }

    refresh(){
        if(!this.jwt) throw "Tried to refresh token, but you don't even have one!";
        return new Promise((resolve, reject) => {
            this.connection({
                url: '/refresh',
                method: "GET",
                data: qs.stringify({
                    token: this.jwt
                }),
                headers: {
                    'Authorization': 'Bearer ' + this.jwt
                }
            }).then(
                (res) => {
                    this.jwt = res.data.token;
                    this.storage.setItem('jwt', res.data.token);
                    let decoded = jwtDecode(res.data.token);
                    this.user = decoded.user;
                    console.info("refreshed jwt", this.jwt, this.user);
                    this.jwtExpire = decoded.exp;
                    resolve(true);
                },
                (error) => {
                    if(error.response){
                        reject(error.response.status);
                    }
                    reject(error);
                }
            );
        })
    }

    logout() {
        /* Clearing login data */
        this.storage.removeItem('jwt');
        this.jwt = null;
        this.jwtExpire = null;
        this.trigger("logout");
    }

    isLoggedIn(){
        return this.jwt !== null;
    }

    hasRole( role ){
        if( this.user ){
            return ( this.user.roles.indexOf(role) !== -1 );
        }
        return false;
    }

    id(){
        if( this.isLoggedIn() ) return this.user.id;
    }

    subscribe(event_name, callback){
        if(!this.events[event_name]) this.events[event_name] = [];
        this.events[event_name].push(callback);
    }

    trigger(event_name, params){
        if(!this.events[event_name]) return;
        this.events[event_name].forEach((cb)=>{
            cb(params);
        });
    }

    callback(name, params){
        let base = window.location.origin;
        let activity = this.config.callbacks[name];
        let callback = base+"/"+activity;
        if(params) callback += "?" + params.join("&");
        console.log("callback", callback);
        return callback;
    }
};
