const NodeCache = require("node-cache");
const memCache = new NodeCache({ checkperiod: 120 });


const get = (key) => {
    return memCache.get(key);
}

const set = (key, value, ttl) => {
    return memCache.set(key, value, ttl);
}


module.exports = {
    get,
    set
}