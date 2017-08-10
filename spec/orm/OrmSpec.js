describe("ORM", function(){
    const mockStorage = {
        data: {},
        getItem: function(name){
            if(this.data[name]) return this.data[name];
            return null;
        },
        setItem: function(name, obj){
            this.data[name] = JSON.stringify(obj);
        },
        removeItem: function(name){
            this.data[name] = null;
        }
    };
    /* Configuration */
    const config = require('../../config.json');
    const schema = require('../../schema.json');
    const AuthService = require('../../es/src/services/AuthService');
    const DataService = require('../../es/src/services/DataService');
    const ModelFactory = require('../../es/src/models/core/ModelFactory');
    const modelClassMap = require('../../es/src/modelClassMap');
    let authService;
    let dataService;
    let modelFactory;

    beforeAll(function(done) {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;

        authService = new AuthService(config, mockStorage);
        authService.login("admin@example.com", "password").then(()=>{
            dataService = new DataService(config, authService);
            modelFactory = new ModelFactory(dataService, modelClassMap, schema);
            done();
        });
    });

    describe("DATABASE OPERATIONS", function(){
        let id;
        let model;
        it("CREATE", function(done){
            let reseller = modelFactory.create("Reseller");
            reseller.setData({
                name: "test",
                address: "123 Dove Lane"
            });
            expect(reseller.getData().name).toEqual("test");
            expect(reseller.getData().address).toEqual("123 Dove Lane");
            reseller.save().then((res)=>{
                expect(reseller.id).toBeTruthy();
                id = reseller.id;
                done();
            })
        });
        it("RETRIEVE ONE", function(done){
            console.log("ID: ", id);
            modelFactory.find("Reseller", id)
                .then((reseller)=>{
                    expect(reseller.address).toEqual("123 Dove Lane");
                    model = reseller;
                    done();
                });
        });
        it("RETRIEVE ALL", (done)=>{
            modelFactory.all("Reseller")
                .then((resellers)=>{
                    expect(resellers.length).toBeGreaterThan(0);
                    console.log(resellers);
                    done();
                })
        });
        it("UPDATE", (done)=>{
            model.name = "edit!";
            model.update().then((res)=>{
                done();
            })
        });
        it("DELETE", (done)=>{
            model.destroy().then((res)=>{
                done();
            })
        });
    });
});