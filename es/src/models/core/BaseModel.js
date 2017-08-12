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
    /**
     * TODO:
     * + lazy/eager loaded relationships
     * + relationships eloquent style
     */

    init(){
        // TODO:
        // required && optional => fillable
        this.required.forEach((prop)=>{
            this[prop] = null;
        });
        Object.assign(this, this.defaults);
        this.$promise = null;
        this.observers = {
            "async": []
        }
    }
    load(promises, resourcePromise){
        // NOOP
        // Override to for eager loading
    }
    update(){
        return this.dataService.connection({
            url: this.endpoint+"/"+this.getId(),
            method: "PUT",
            data: qs.stringify(this.getData())
        });
    }
    save(){
        return new Promise((resolve, reject)=>{
            this.dataService.connection({
                url: this.endpoint,
                method: "POST",
                data: qs.stringify(this.getData())
            }).then((res)=>{
                this.setId(res.data.id);
                resolve(this);
            }).catch(reject);
        });
    }
    destroy(){
        return new Promise((resolve, reject)=>{
            this.dataService.connection({
                url: this.endpoint+"/"+this.getId(),
                method: "DELETE"
            }).then((res)=>{
                resolve(this);
            }).catch(reject);
        });
    }

    getData(){
        let data = {};
        // extract required properties
        if(this.required){
            this.required.forEach((prop)=>{
                data[prop] = this[prop];
            });
        }
        // extract optional properties
        if(this.optional){
            this.optional.forEach((prop)=>{
                if(typeof this[prop] !== 'undefined') data[prop] = this[prop];
            });
        }
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

    /* observer */ // useful for triggering AngularJS digest cycle
    subscribe(event, callback){
        if(typeof this.observers[event] === 'undefined') this.observers[event] = [];
        this.observers[event].push(callback);
    }
    notify(event, params){
        if(typeof this.observers[event] === 'undefined') this.observers[event] = [];
        this.observers[event].forEach( callback => callback(params) );
    }
};