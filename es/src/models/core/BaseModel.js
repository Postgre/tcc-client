module.exports = class BaseModel {
    static get endpoint(){
        return "";
    }
    static get required(){
        return [];
    }
    static get optional(){
        return [];
    }
    static get defaults(){
        return {};
    }
    static get loaders(){ return [] }
    static get savers(){ return [] }

    onLoaded(){}

    constructor(data){
        // initialize required properties
        this.constructor.required.forEach((prop)=>{
            if(typeof this[prop] === 'undefined') this[prop] = null;
        });
        Object.assign(this, this.constructor.defaults);
        Object.assign(this, data);
    }

    getData(){
        let data = {};
        this.constructor.required.forEach((prop)=>{
            data[prop] = this[prop];
        });
        this.constructor.optional.forEach((prop)=>{
            if(this[prop]) data[prop] = this[prop];
        });
        return data;
    }
    setData(data){
        Object.assign(this, data);
    }

    getId(){
        if(this.id) return this.id;
    }
};