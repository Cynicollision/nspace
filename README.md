# nspace.js
JavaScript namespace-ifier

nspace.js is a simple JavaScript module management utility. It stores related objects/classes/etc. as nested object members defined by a .NET/Java-style namespace name. It can be used in the browser or as a node module.

For example (Node.js), 

The following stores a reference to the `fileModule` object with the name "MyApp.Services.FileService". It then retrieves the entire "MyApp" namespace as an object and prints each object as JSON.

```javascript
var nspace = require('./nspace');

// the module we want to "namespace-ify"
var fileModule = {
    someProperty: [1, 2, 3],
};

// nspace.js will store a reference to the module with the given namespace as a key
var fileService = nspace('MyApp.Services.FileService', fileModule);

// retrieve by namespace name to get its nested modules
var MyApp = nspace('MyApp');

console.log(JSON.stringify(fileService));
console.log(JSON.stringify(MyApp));
```

Outputs:

`
{"someProperty":[1,2,3]}
`

`
{"Services":{"FileService":{"someProperty":[1,2,3]}}}
`

The intended use would be to store entire JavaScript modules in this fashion, but for brevity a simple object literal was used here.

#### Installation
(WIP)
