"use strict";

const dataStore = require('../../persistence/data-store');
const Connection = require('../../models/connection.js');

const rootPath = '/connections';
const endpoints = {
    'adding a new connection' : {
        method : "POST",
        url : rootPath,
        controller : addConnection
    },
    'getting a connection by id' : {
        method : "GET",
        url : rootPath + '/:id',
        controller : getConnection
    },
    'listing connections' : {
        method : "GET",
        url : rootPath,
        controller : listConnections
    }
};

module.exports = endpoints;

function addConnection(req, res) {
    try {
        let connection = new Connection(req.body);
        dataStore('connection').save(connection);
        res.status(201).json(connection);
    } catch(e) {
        res.status(500).json({ error : e.message});
    }
}

function getConnection(req, res) {
    let connection = dataStore('connection').get(req.params.id);
    if(connection == null) {
        res.status(404).send();
    } else {
        res.json(connection);
    }
}

function listConnections(req, res) {
    try {
        var connections;

        if(req.query.between) {
            let userIds = JSON.parse(req.query.between);

            if(userIds.length != 2) {
                throw Error("usage: between=[<id1>,<id2>]");
            }

            let id = Connection.idFromArray(userIds);

            connections = [ dataStore('connection').get(id) ];
        } else {
            connections = dataStore('connection').list();
            let userId = req.query.userId && parseInt(req.query.userId);

            if(userId) {
                connections = connections.filter((connection)=>{
                    return connection.users.includes(userId);
                });
            }
        }

        res.json(connections);
    } catch(e) {
        res.status(500).json({ error : e.message });
    }
}
