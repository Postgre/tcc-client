const BaseModel = require('./../core/BaseModel');

module.exports = class Profile extends BaseModel {
    calculateCompletion(){
        console.log(this.fillable);
        let fillable = this.fillable.length;
        let filled = 0;
        for (let i = 0; i < fillable; i++) {
            let prop = this.fillable[i];
            if(this[prop]) ++filled;
        }
        return (filled / fillable) * 100;
    }
};