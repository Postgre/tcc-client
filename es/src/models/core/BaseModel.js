const qs = require('qs');

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

    constructor(dataService){
        this.dataService = dataService;
        // initialize required properties
        this.constructor.required.forEach((prop)=>{
            if(typeof this[prop] === 'undefined') this[prop] = null;
        });
        // set defaults
        Object.assign(this, this.constructor.defaults);
    }

    find(id, onload){
        this.setId(id);
        this.dataService.connection({   // load the actual model data
            url: this.constructor.endpoint+"/"+id,
            method: "GET"
        }).then((res)=>{
            let props = res.data;
            this.setData(props);
            onload();
        });
    }
    update(){
        return this.dataService.connection({
            url: this.constructor.endpoint+"/"+this.getId(),
            method: "PUT",
            data: qs.stringify(this.getData())
        });
    }
    save(){
        return this.dataService.connection({
            url: this.constructor.endpoint,
            method: "POST",
            data: qs.stringify(this.getData())
        }).then((res)=>{
            this.setId(res.data.id)
        })
    }
    destroy(){
        return this.dataService.connection({
            url: this.constructor.endpoint+"/"+this.getId(),
            method: "DELETE"
        })
    }

    getData(){
        let data = {};
        // extract required properties
        this.constructor.required.forEach((prop)=>{
            data[prop] = this[prop];
        });
        // extract optional properties
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
    setId(id){
        this.id = id;
    }
};