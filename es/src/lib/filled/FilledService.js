module.exports = class FilledService {
    static getPercentage(inputObject, fillables){
        let fillable = fillables.length;
        let filled = 0;
        for (let i = 0; i < fillable; i++) {
            let prop = fillables[i];
            if(inputObject[prop]) ++filled;
        }
        return ((filled / fillable)*100).toFixed(0);
    }
};