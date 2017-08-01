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
        instance.setData(data);
        return instance;
    }
};