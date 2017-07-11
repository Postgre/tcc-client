/* Libraries */
const axios     = require('axios');
const qs        = require('qs');
const jwtDecode = require('jwt-decode');

/* Auth Service */
module.exports = class AuthService{
  constructor(config){
    console.info('AuthService Loading...');

    /* Saving Config */
    this.config = config;

    /* Local variables */
    this.jwt = localStorage.getItem('jwt');
    this.jwtExpire = null;

    /* Setting up refresh */
    if(this.jwt != null){
      let decoded = jwtDecode(this.jwt);

      /* Checking if already expired */
      if(this.decoded.exp < (new Date().getTime()/1000)){
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
  login(email, password){ return new Promise((resolve, reject)=>{

    /* Making login request */
    this.connection({
      url: '/auth/login',
      data:qs.stringify({
        email: email,
        password: password
      })
    })

    /* Success */
    .then((res)=>{
      /* Saving JWT */
      this.jwt = res.body.token;
      localStorage.setItem('jwt', res.body.token);

      /* Decoding jwt */
      let decoded = jwtDecode(res.body.token);
      this.jwtExpire = decoded.exp;

      /* Sending back authenicated */
      resolve('Logged in');
    })

    /* Error handling */
    .catch((error)=>{
      /* Sending back error */
      reject(error);
    });
  })}

  logout(){
    /* Clearing login data */
    localStorage.removeItem('jwt');
    this.jwt = null;
    this.jwtExpire = null;
  }
}
