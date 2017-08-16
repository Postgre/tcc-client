const BaseModel = require('./core/BaseModel');

module.exports = class MyCarolerProfile extends BaseModel {
    url(){ return this.endpoint; }
    uploadW9(file){
        alert(file);
        let formData = new FormData();
        formData.set("w9", file);
        return this.ajax({
            url: "users/profile/caroler/w9",
            method: "POST",
            data: formData,
            config: {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
        });
    }
    uploadPerformanceAgreement(file){
        let formData = new FormData();
        formData.append("performance_agreement", file);
        return this.ajax({
            url: "users/profile/caroler/performance-agreement",
            method: "POST",
            data: formData,
            config: {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
        });
    }
};