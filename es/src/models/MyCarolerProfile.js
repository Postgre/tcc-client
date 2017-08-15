const BaseModel = require('./core/BaseModel');

module.exports = class MyCarolerProfile extends BaseModel {
    url(){ return this.endpoint; }
    uploadW9(){
        let formData = new FormData();
        formData.append("w9", this.file_w9, this.file_w9.name);
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
    uploadPerformanceAgreement(){
        let formData = new FormData();
        formData.append("performance_agreement", this.file_performance_agreement, this.file_performance_agreement.name);
        return this.ajax({
            url: "users/profile/caroler/performance_agreement",
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