const qs = require('qs');

/**
 * Models a resource in the database, allowing update, save, and deletion.
 * -----------------------
 *  + endpoint      :   the REST resource endpoint
 *  + required[]    :   these properties will be initialized to null if they aren't set, and will always be in requests
 *  + optional[]    :   these properties will be included in requests if they are set
 *  + defaults[]    :   specify default values
 *  + hasOne{}      :   specifies a has-one relationship with another resource. Properties with this name get wrapped into the specified model class in the load middleware.
 *                      { <property_name> : <model_class> }
 *  + hasMany{}     :   specifies a has-many relationship with other resource.
 *                      { <property_name> : <model_class> }
 *  [+] update()    :   calls PUT /<endpoint>/id with required and optional properties
 *  [+] save()      :   calls POST /<endpoint> with required and optional properties
 *  [+] destroy()   :   calls DELETE /<endpoint>/id
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
    constructor(dataService){
        this.dataService = dataService;
        // this.modelFactory = modelFactory;
        // initialize required properties
        this.constructor.required.forEach((prop)=>{
            if(typeof this[prop] === 'undefined') this[prop] = null;
        });
        // set defaults
        Object.assign(this, this.constructor.defaults);
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