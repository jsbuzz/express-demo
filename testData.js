const dataStore = require('./server/persistence/data-store');
const User = require('./server/models/user.js');
const Connection = require('./server/models/connection.js');
dataStore('user').save(new User({name : 'Dudette Una', username : 'miss1', password: 'password'}).encryptPassword());
dataStore('user').save(new User({name : 'Dude Dos', username : 'dude2', password: 'password'}).encryptPassword());
dataStore('user').save(new User({name : 'Dudek Tricsek', username : 'tricsek', password: 'password'}).encryptPassword());

dataStore('connection').save(new Connection([1, 2]));
dataStore('connection').save(new Connection([1, 3]));
dataStore('connection').save(new Connection([2, 3]));
