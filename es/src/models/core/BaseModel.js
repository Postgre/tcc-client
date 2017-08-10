const qs = require('qs');

/**
 * Models a resource in the database, allowing update, save, and deletion.
 * -----------------------
 *  + endpoint      :   the REST resource endpoint
 *  + required      :   these properties will be initialized to null if they aren't set, and will always be in requests
 *  + optional      :   these properties will be included in requests if they are set
 *  + defaults      :   specify default values
 *  [+] update()    :   calls PUT /<endpoint>/id with required and optional properties
 *  [+] save()      :   calls POST /<endpoint> with required and optional properties
 *  [+] destroy()   :   calls DELETE /<endpoint>/id
 *  -----------------------
 *  MIDDLEWARE:
 *  [~] onLoad()
 *  [~] onUpdate()
 *  [~] onCreate()
 *  [~] onDelete()
 */
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

    // TODO: refactor
    constructor(dataService/*, modelFactory*/){
        this.dataService = dataService;
        // this.modelFactory = modelFactory;
        // initialize required properties
        this.constructor.required.forEach((prop)=>{
            if(typeof this[prop] === 'undefined') this[prop] = null;
        });
        // set defaults
        Object.assign(this, this.constructor.defaults);
    }
    // TODO: refactor
    find(id, onload){
        this.setId(id);
        // return
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
        });
    }
    destroy(){
        return this.dataService.connection({
            url: this.constructor.endpoint+"/"+this.getId(),
            method: "DELETE"
        });
    }

    getData(){
        let data = {};
        // extract required properties
        this.constructor.required.forEach((prop)=>{
            data[prop] = this[prop];
        });
        // extract optional properties
        this.constructor.optional.forEach((prop)=>{
            if(typeof this[prop] !== 'undefined') data[prop] = this[prop];
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