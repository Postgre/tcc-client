/* Libraries */
const axios = require('axios');
const qs = require('qs');
const jwtDecode = require('jwt-decode');

/* Auth Service */
module.exports = class AuthService {
    constructor(config, storage) {
        /* Saving Config */
        this.config = config;
        this.storage = storage;

        /* Local variables */
        this.jwt = this.storage.getItem('jwt');
        this.user = null;
        this.jwtExpire = null;

        /* Events */
        this.events = {
            'logout': [],
            'expired': []
        };

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
                    callback: this.config['callback_login']
                })
            }).then(
                (res) => {
                    resolve("registered!");
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
        this.events[event_name].push(callback);
    }

    trigger(event_name, params){
        if(!this.events[event_name]) return;
        this.events[event_name].forEach((cb)=>{
            cb(params);
        });
    }
};
