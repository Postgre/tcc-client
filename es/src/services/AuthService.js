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

        /* Setting up refresh */
        if (this.jwt !== null) {
            let decoded = jwtDecode(this.jwt);
            this.user = decoded.user;

            /* Checking if already expired */
            if (decoded.exp < (new Date().getTime() / 1000)) {
                this.logout();
                this.navSerice.goto("home", { expired: true });
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
                reject(error);
            });
        })
    }

    register(name, email, password) {
        return new Promise((resolve, reject) => {

            /* Making login request */
            var p = this.connection({
                url: '/auth/signup',
                method: "POST",
                data: qs.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            });
            p.then(
                (res) => {
                    resolve("registered!");
                },
                (error) => {
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

    require( roles ){
        var authorized = false;
        roles.forEach((role)=>{
            if(this.hasRole(role)) authorized = true;
        });
        if(!authorized){
            this.navSerice.goto('auth');
        }
    }
};
