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

    find(ModelClass, id){
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
        instance.load(promises, resourcePromise);

        return new Promise((resolve, reject)=>{
            Promise.all(promises).then((resolves)=>{
                resolve(resolves[0]);
            })
        });
    }
    create(ModelClass){
        let schema = this.schema[ModelClass];
        let instance = new this.classMap[ModelClass]();
        let depends = { dataService: this.dataService };
        Object.assign(instance, depends, schema);
        instance.init();
        return instance;
    }
    all(ModelClass, filters){
        let promises = [];
        let collectionPromise = new Promise((resolve, reject)=>{
            this.dataService.getResourceAll(this.schema[ModelClass].endpoint, filters)
                .then((_models)=>{
                    let models = [];
                    _models.forEach((_model)=>{
                        let model = this.create(ModelClass);
                        model.setData(_model);
                        model.load(promises, Promise.resolve(model));
                        models.push(model);
                    });
                    resolve(models);
                }).catch(reject);
        });
        promises.push(collectionPromise);
        return new Promise((resolve, reject)=>{
            Promise.all(promises).then((resolves)=>{
                resolve(resolves[0]);
            });
        });
    }

    /* Exception Handling */
    validate(ModelClass){
        if(!this.schema[ModelClass]) throw `${ModelClass} not defined in schema`;
        if(!this.schema[ModelClass].endpoint) throw `${ModelClass} has no endpoint in schema`;
    }
};