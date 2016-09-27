const md5 = require('blueimp-md5');

class User {
    constructor(obj) {
        this.name = obj.name;
        this.username = obj.username;
        this.password = obj.password;
    }

    encryptPassword() {
        this.password = md5(this.password + this.username);
        return this;
    }
}

User.view = function(user) {
    return {
        name: user.name,
        id: user.id
    };
}

module.exports = User;
