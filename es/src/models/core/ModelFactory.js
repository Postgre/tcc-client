const qs = require('qs');

module.exports = class ModelFactory {
    constructor(DataService){
        this.dataService = DataService;
    }

    // TODO: write a decent API so we don't need these 'location' attrs
    find(ModelClass, id, responseHandler){
        let instance = new window[ModelClass]({id:id});
        this.dataService.connection({
            url: instance.constructor.endpoint+"/"+id,
            method: "GET"
        }).then((res)=>{
            let props = res.data;
            if(responseHandler !== null){
                props = responseHandler(res);
            }
            instance.setData(props);
            instance.onLoaded();
        });
        // invoke loaders
        instance.constructor.loaders.forEach((loader)=>{
            loader(instance, this.dataService).then(
                () => { instance.onLoaded(); }
            );
        });
        return instance;
    }
    update(model){
        let promises = [];
        let p = this.dataService.connection({
            url: model.constructor.endpoint+"/"+model.getId(),
            method: "PUT",
            data: qs.stringify(model.getData())
        });
        promises.push(p);
        model.constructor.savers.forEach((saver)=>{
            let p = saver(model, this.dataService);
            promises.push(p);
        });
        return promises;
    }
    save(model, responseHandler){
        return this.dataService.connection({
            url: model.constructor.endpoint,
            method: "POST",
            data: qs.stringify(model.getData())
        }).then((res)=>{
            let id = res.data.id;
            if(responseHandler){
                id = responseHandler(res.data);
            }
            model.id = id;
            model.constructor.savers.forEach((saver)=>{
                saver(model, this.dataService);
            })
        });
    }
    destroy(model){
        return this.dataService.connection({
            url: model.constructor.endpoint+"/"+model.getId(),
            method: "DELETE"
        });
    }
};