module.exports = class ModelFactory {
    constructor(DataService){
        this.dataService = DataService;
    }

    find(ModelClass, id, onload){
        let instance = new window[ModelClass](this.dataService);
        instance.find(id, onload);
        return instance;
    }
    create(ModelClass, data){
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