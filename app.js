var bodyParser = require('body-parser');
const express = require('express');

let app = express();

let urlencodedParser = bodyParser.urlencoded({ extended: true });
function loadModule(module) {
    for(action of Object.getOwnPropertyNames(module)) {
        let endpoint = module[action];
        let method = endpoint.method.toLowerCase();
        app[method](endpoint.url, urlencodedParser, endpoint.controller);
        console.log('Attached: ', action);
    }
}
loadModule(require('./server/modules/users'));
loadModule(require('./server/modules/connections'));

app.listen(3200, function () {
  console.log('App listening on port 3200');
});

// fill dataStore
require('./testData.js');
