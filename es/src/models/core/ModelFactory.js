/**
 * Constructs model instances, injecting dependencies.
 * ---------------------------------------------------
 * get(ResourceName, id): returns empty model. upon resolving its data from server, triggers the 'resource-resolved' event
 * create(Resource): constructs a model with injected dependencies
 * all(Resource, filters): fetches an entire resource collection, wrapping each entity in a model
 */
// TODO: relations
module.exports = class ModelFactory {
    constructor(ajaxDriver, classMap, schema, dataService){
        this.ajaxDriver = ajaxDriver;
        this.dataService = dataService;
        this.classMap = classMap;
        this.schema = schema;
        this.dependencies = {
            ajaxDriver: ajaxDriver,
            dataService: this.dataService,
            factory: this
        };
    }

    get(ModelClass, id) {
        this.validate(ModelClass);
        let instance = this.create(ModelClass);
        instance.id = id;
        let url = instance.url();
        instance.$promise = new Promise((resolve, reject) => {
            this.ajaxDriver.execute({ url: url, method: "GET" })
                .then((response)=>{
                    let _model = response.data;
                    instance.setData(_model);
                    instance.notify("ready");
                    resolve(instance);
                }, reject);
        });
        return instance;
    }
    create(ModelClass, data){
        let schema = this.schema[ModelClass];
        let instance = new this.classMap[ModelClass]();
        console.log("created", instance);
        Object.assign(instance, this.dependencies, schema);
        instance.init();
        if(data) Object.assign(instance, data);
        return instance;
    }
    all(ModelClass, filters, relations){
        let queryParams = {};
        Object.assign(queryParams, filters);
        Object.assign(queryParams, {"with": relations});
        return new Promise((resolve, reject)=>{
            this.ajaxDriver.execute({
                url: this.getSchema(ModelClass).endpoint,
                method: "GET",
                params: queryParams
            }).then((res)=>{
                let _models = res.data;
                let models = [];
                let modelPromises = [];
                _models.forEach((_model)=>{
                    let model = this.create(ModelClass, _model);
                    model.load(modelPromises, Promise.resolve(model));
                    models.push(model);
                });
                Promise.all(modelPromises).then(()=>{ resolve(models) }, reject);
            }, reject);
        });
    }

    wrapAll(ModelClass, dataArray){
        let out = [];
        dataArray.forEach((_model)=>{
            out.push(this.create(ModelClass, _model));
        });
        return out;
    }

    /* Exception Handling */
    validate(ModelClass){
        if(!this.schema[ModelClass]) throw `${ModelClass} not defined in schema`;
        if(!this.schema[ModelClass].endpoint) throw `${ModelClass} has no endpoint in schema`;
    }
    getSchema(ModelClass){
        this.validate(ModelClass);
        return this.schema[ModelClass];
    }

    /* SCHEDULED FOR DEPRECATION */
    find(ModelClass, id, eager){
        let instance = this.create(ModelClass);
        instance.id = id;

        let promises = [];
        let resourcePromise = new Promise((resolve, reject)=>{
            this.dataService.getResource(this.schema[ModelClass].endpoint, id)
                .then((_model)=>{
                    console.log(_model);
                    instance.setData(_model);
                    resolve(instance);
                }).catch(reject);
        });
        promises.push(resourcePromise);
        if(eager === true){ instance.load(promises, resourcePromise) }

        return new Promise((resolve, reject)=>{
            Promise.all(promises).then((resolves)=>{
                resolve(resolves[0]);
            })
        });
    }
};