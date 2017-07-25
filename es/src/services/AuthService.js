/* Libraries */
const axios = require('axios');
const qs = require('qs');
const jwtDecode = require('jwt-decode');

/* Auth Service */
module.exports = class AuthService {
    constructor(config, navService) {
        console.info('AuthService Loading...');

        /* Saving Config */
        this.config = config;
        this.navSerice = navService;

        /* Local variables */
        this.jwt = localStorage.getItem('jwt');
        this.user = null;
        this.jwtExpire = null;

        /* Setting up refresh */
        if (this.jwt != null) {
            let decoded = jwtDecode(this.jwt);
            this.user = decoded.user;

            /* Checking if already expired */
            if (decoded.exp < (new Date().getTime() / 1000)) {
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

    /* Login Requests */
    login(email, password) {
        return new Promise((resolve, reject) => {

            /* Making login request */
            this.connection({
                url: '/auth/login',
                method: "POST",
                data: qs.stringify({
                    email: email,
                    password: password
                })
            })

            /* Success */
                .then((res) => {

                    console.log("from server", res);
                    /* Saving JWT */
                    this.jwt = res.data.token;
                    localStorage.setItem('jwt', res.data.token);

                    /* Decoding jwt */
                    let decoded = jwtDecode(res.data.token);
                    this.user = decoded.user;
                    this.jwtExpire = decoded.exp;

                    /* Sending back authenicated */
                    resolve('Logged in');
                })

                /* Error handling */
                .catch((error) => {
                    /* Sending back error */
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
        localStorage.removeItem('jwt');
        this.jwt = null;
        this.jwtExpire = null;
        this.navSerice.goto("home");
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
