/**
 * Constructs model instances, injecting dependencies.
 * ---------------------------------------------------
 * find(ResourceName, id, rel[]): finds a single resource, fetches it's data, and constructs a model.
 * create(Resource): creates a new, blank, resource model
 * all(Resource, filters, rel[]): fetches an entire resource collection, wrapping each entity in a model
 */
// TODO: relations
module.exports = class ModelFactory {
    constructor(DataService, classMap, schema){
        this.dataService = DataService;
        this.classMap = classMap;
        this.schema = schema;
    }

    find(ModelClass, id, eager = true){
        let instance = this.create(ModelClass);
        instance.setId(id);

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
        if(eager === true) falseinstance.load(promises, resourcePromise);

        return new Promise((resolve, reject)=>{
            Promise.all(promises).then((resolves)=>{
                resolve(resolves[0]);
            })
        });
    }
    create(ModelClass, data){
        let schema = this.schema[ModelClass];
        let depends = {
            dataService: this.dataService,
            factory: this
        };
        let instance = new this.classMap[ModelClass]();
        Object.assign(instance, depends, schema);
        instance.init();
        if(data) Object.assign(instance, data);
        return instance;
    }
    all(ModelClass, filters){
        return new Promise((resolve, reject)=>{
            this.dataService.getResourceAll(this.schema[ModelClass].endpoint, filters)
                .then((_models)=>{
                    let models = [];
                    let modelPromises = [];
                    _models.forEach((_model)=>{
                        let model = this.create(ModelClass);
                        model.setData(_model);
                        model.load(modelPromises, Promise.resolve(model));
                        models.push(model);
                    });
                    Promise.all(modelPromises).then(()=>{
                        resolve(models);
                    });
                }).catch(reject);
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
};