# EloScript
A client-side ORM implementing Active Record. Base on Laravel's Eloquent and AngularJS's $resource factory.

```
$ npm install eloscript
```
## Getting Started
( [Jump to Usage](#usage) )

1. [Prerequisites](#prerequistes)
    1. [Backend](#backend)
    2. [AJAX Library](#ajax)
2. [Defining the Schema](#schema)
3. [Creating Resource Models](#modeling)
4. [Resolving Models](#resolving)
5. [Wiring it Together](#main)

### Prerequisites <a name="prerequistes"></a>
#### Backend <a name="backend"></a>
EloScript requires a classic JSON REST API backend adhering to the following format.

method | url | description
------ | --- | -------
GET | resource/:id | returns the model properties in response body
PUT | resource/:id | accepts the resource properties in request body
POST | resource | accepts resource properties in body, returns the newly created id
DELETE | resource/:id | deletes resource

The request and response bodies of an endpoint should be a key-value map of the resource's properties.

`GET /characters/1`

Should return:
```
{
    name: "Jon Snow",
    alive: true,
    location: "Dragonstone"
}
```
#### AJAX Request Maker <a name="ajax"></a>
EloScript by default uses the [Axios](https://github.com/mzabriskie/axios) http request making library,
but you are free to use your own.

To use your own, simply extend the `BaseAjaxDriver` class
and implement `BaseAjaxDriver.execute(request)`. How you construct the driver is up to you.

### <a name="schema"></a> Defining the Schema
Your schema will map model classes to their REST endpoints, define which properties
should be included in requests, and any default properties

A schema looks like this:
```
{
  "Character": {
    "endpoint": "characters",
    "fillable": [
      "name",
      "location",
      
    ]
  },
  ...
}
```

### <a name="modeling"></a> Creating Resource Models
`Hero` in the above example is the name of a class extending `BaseModel`
```javascript
const BaseModel = require('./../node_modules/eloscript/core/BaseModel');
module.exports = class Hero extends BaseModel{
    // your methods here
}
```

### <a name="resolving"></a> Resolving Models 
EloScript does not force a directory structure. To resolve resource models, you must
create a class map object that maps the class names to their object.
```
/project_root
    /src
        /dao
           modelClassMap.js
           Hero.js
        /config
           schema.json
```
**modelClassMap.js**
```javascript
const Hero = require('./Hero');
module.exports = { Hero }; // short for { "Hero": Hero }
```

### <a name="main"></a> Wiring it all Together
So far, we have created three files: `schema.json`, `Hero.js`, `modelClassMap.js`

All that's left is to open a connection with your API, and create an instance of `ModelFactory`.
We will do this in `main.js`
```
/project_root
    /src
        main.js
        /dao
            modelClassMap.js
            Hero.js
        /config
            schema.json
    /node_modules
        /eloscript
            /core
                BaseModel.js
                BaseAjaxDriver.js
            /drivers
                AxiosDriver.js
```
**main.js**
```javascript
/* config files */
const schema = require('./config/schema.json');
const Models = require('./dao/modelClassMap');
/* classes */
const ModelFactory = require('./node_modules/eloscript/core/ModelFactory');
const AxiosDriver = require('./node_modules/eloscript/drivers/AxiosDriver');
/* instantiate */
let connection = axios.create({
    baseURL: "api.eloscript.com",
    headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + localStorage.jwt
    }
});
let axiosDriver = new AxiosDriver(connection);  // you may use your own driver and connection strategy
let modelFactory = new ModelFactory(axiosDriver, schema, Models);
)
```
#### You're All Set!
Still interested? [See usage](#usage).








## <a name="usage"></a> Usage and Examples
### Basic CRUD
#### Create a Model
```javascript
let hero = modelFactory.create("Hero");
hero.name = "Jon Snow";
hero.wears_cape = true;
hero.color = "black";
hero.superpower = "Can't Die";
hero.save();
```
Yup, its that easy!
#### Update an Existing Model
```javascript
let jonSnow = modelFactory.find("Hero", 1);
jonSnow.$promise.then(()=>{
    jonSnow.wears_cape = false;
    jonSnow.update();
});
```
#### Delete an Existing Model
```javascript
let nedStark = modelFactory.find("Hero", 2);
nedStark.$promise.then(()=>{
    nedStark.destroy();
})
```
#### Load an Existing Model
```javascript
let jaquenHagar = modelFactory.find("Hero", 3);
jaquenHagar.$promise.then((model)=>{
    console.info("I thought you said there was no jaquen hagar here?");
}).catch(()=>{
    console.error("No one here by that name");
})
```
It is important to note that `modelFactory.find()` is returning an empty model, which is often
useful if you are using some sort of MVC framework. (AngularJS)

In addition, the `$promise` attribute of the model is set upon calling modelFactory.find().
This promise will resolve with the model instance after all properties have been loaded.
