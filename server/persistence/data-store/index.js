"use strict";

var SimpleStore = require('./simple-store.js');
var User = require('../../models/user.js');
var Connection = require('../../models/connection.js');

const dataStore = function(module) {
    return dataStore.store[module];
};

dataStore.store = {};
dataStore.store.user = new SimpleStore(User);
dataStore.store.connection = new SimpleStore(Connection);


module.exports = dataStore;
