/**
 * Constructs model instances, injecting dependencies.
 * ---------------------------------------------------
 * find(ResourceName, id, rel[]): finds a single resource, fetches it's data, and constructs a model.
 * create(Resource): creates a new, blank, resource model
 * all(Resource, filters, rel[]): fetches an entire resource collection, wrapping each entity in a model
 */
module.exports = class ModelFactory {
    constructor(DataService){
        this.dataService = DataService;
    }


    // TODO: refactor
    find(ModelClass, id, onload){
        // soon...
        // let instance = new window[ModelClass](this.dataService, this);
        // return instance.find(id);
        let instance = new window[ModelClass](this.dataService);
        instance.find(id, onload);
        return instance;
    }
    create(ModelClass, data){
        // let instance = new window[ModelClass](this.dataService, this);
        let instance = new window[ModelClass](this.dataService);
        if(data) instance.setData(data);
        return instance;
    }

    all(ModelClass, filters, onload){
        let out = [];
        this.dataService.getResourceAll(window[ModelClass].endpoint, filters)
            .then((_models)=>{
                _models.forEach((_model)=>{
                    let model = new window[ModelClass](this.dataService);
                    model.setData(_model);
                    out.push(model);
                });
                onload();
            });
        return out;
    }
};