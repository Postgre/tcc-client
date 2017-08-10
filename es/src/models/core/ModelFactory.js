/**
 * Constructs model instances, injecting dependencies.
 * ---------------------------------------------------
 * find(ResourceName, id, rel[]): finds a single resource, fetches it's data, and constructs a model.
 * create(Resource): creates a new, blank, resource model
 * all(Resource, filters, rel[]): fetches an entire resource collection, wrapping each entity in a model
 */
// TODO: relations
module.exports = class ModelFactory {
    constructor(DataService, classMap){
        this.dataService = DataService;
        this.classMap = classMap;
    }

    find(ModelClass, id){
        return new Promise((resolve, reject)=>{
            let instance = new this.classMap[ModelClass](this.dataService);
            this.dataService.getResource(instance.constructor.endpoint, id)
                .then((_model)=>{
                    instance.setData(_model);
                    resolve(instance);
                }).catch(reject);
        });
    }
    create(ModelClass, data){
        let instance = new this.classMap[ModelClass](this.dataService);
        if(data) instance.setData(data);
        return instance;
    }
    all(ModelClass, filters){
        return new Promise((resolve, reject)=>{
            this.dataService.getResourceAll(this.classMap[ModelClass].endpoint, filters)
                .then((_models)=>{
                    let models = [];
                    _models.forEach((_model)=>{
                        let model = new this.classMap[ModelClass](this.dataService);
                        model.setData(_model);
                        models.push(model);
                    });
                    resolve(models);
                }).catch(reject);
        });
    }
};