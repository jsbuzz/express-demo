class Connection {
    constructor(obj) {
        if(Array.isArray(obj)) {
            this.users = obj.sort();
        }
        else if(obj.from == obj.to) {
            throw new Error("Two ids cannot be the same");
        } else {
            this.users = [
                Math.min(obj.from, obj.to),
                Math.max(obj.from, obj.to)
            ];
        }
    }
}

Connection.idFromArray = (a)=>a.sort().join(':');
Connection.idGenerator = (c)=>Connection.idFromArray(c.users);

module.exports = Connection;
