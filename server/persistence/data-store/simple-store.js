class SimpleStore {
    constructor(prototype) {
        this.__store = new Map();
        this.__prototype = prototype;
        this.__idGenerator = prototype && prototype.idGenerator || nextId;
    }

    save(item) {
        item.id || (item.id = this.__idGenerator.call(this, item));
        this.__store.set(item.id, item);
        return item;
    }

    get(id) {
        return this.__store.get(id);
    }

    all() {
        return Array.from(this.__store.values());
    }

    list() {
        if(this.__prototype.view) {
            return this.all().map(this.__prototype.view);
        }
        return this.all();
    }

    size() {
        return this.__store.size;
    }
}

function nextId() {
    return this.size() + 1;
}

module.exports = SimpleStore;
