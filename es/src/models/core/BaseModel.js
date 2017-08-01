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
        this.dataService.connection({
            url: this.constructor.endpoint+"/"+model.getId(),
            method: "PUT",
            data: qs.stringify(this.getData())
        });
    }
    save(){
        this.dataService.connection({
            url: this.constructor.endpoint,
            method: "POST",
            data: qs.stringify(this.getData())
        })
    }
    destroy(){
        this.dataService.connection({
            url: model.constructor.endpoint+"/"+model.getId(),
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