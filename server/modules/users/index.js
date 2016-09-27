"use strict";

const dataStore = require('../../persistence/data-store');
const User = require('../../models/user.js');

const rootPath = '/users';
const endpoints = {
    'registering a user' : {
        method : "POST",
        url : rootPath,
        controller : registerUser
    },
    'getting user by id' : {
        method : "GET",
        url : rootPath + '/:id',
        controller : getUser
    },
    'listing users' : {
        method : "GET",
        url : rootPath,
        controller : listUsers
    }
};

module.exports = endpoints;

function registerUser(req, res) {
    if(!req.body.name || !req.body.password || !req.body.username) {
        return res.status(500).json({error: "missing required field (name, username, password)"});
    }

    let user = new User(req.body).encryptPassword();

    dataStore('user').save(user);
    res.status(201).json(user);
}

function getUser(req, res) {
    let user = dataStore('user').get(req.params.id);
    if(user == null) {
        res.status(404).send();
    } else {
        res.json(user);
    }
}

function listUsers(req, res) {
    let name = req.query.name;
    let users = dataStore('user').list();

    if(name) {
        users = users.filter((user)=>{
            return user.name.toLowerCase().indexOf(name) > -1;
        });
    }

    res.json(users);
}
