const qs = require('qs');

module.exports = class Braintree {
    static getClientToken(axios){
        return new Promise((resolve, reject)=>{
            axios({
                url: "bttoken",
                method: "GET"
            }).then((res)=>{
                resolve(res.data);
            }, reject);
        });
    }

    static submitForCheckout(axios, payload){
        return new Promise((resolve, reject)=>{
            axios({
                url: "checkout",
                method: "POST",
                data: qs.stringify(payload)
            }).then(
                (res) => resolve(res.data),
                reject
            )
        });
    }
};