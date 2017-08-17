const BaseModel = require('./core/BaseModel');

module.exports = class MyCarolerProfile extends BaseModel {
    url(){ return this.endpoint; }

    loadCarolerTypes(){
        this.types = [];
        this.ajax({
            url: "users/caroler-types",
            method: "GET"
        }).then(
            res => {
                this.types = res.data;
                this.notify("async");
            }
        );
    }

    addType(name){
        return this.ajax({
            url: "users/caroler-types/"+name,
            method: "POST"
        }).then(
            () => {
                this.types.push({name:name});
                this.notify("async");
            },
            (err) => {
                if(err.response){
                    if(err.response.status === 409) reject(409);
                }
                reject(err);
            }
        )
    }
    removeType(type){
        return this.ajax({
            url: "users/caroler-types/"+type,
            method: "DELETE"
        }).then(()=>{
            this.types.splice(this.types.indexOf(type), 1);
        })
    }

    uploadW9(file){
        alert(file);
        let formData = new FormData();
        formData.set("w9", file);
        return this.ajax({
            url: "users/profile/caroler/w9",
            method: "POST",
            data: formData,
            noStringify: true
        });
    }
    uploadPerformanceAgreement(file){
        let formData = new FormData();
        formData.set("performance_agreement", file);
        return this.ajax({
            url: "users/profile/caroler/performance-agreement",
            method: "POST",
            data: formData,
            noStringify: true
        });
    }
};