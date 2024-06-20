const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
});

client.on('error', (err) => {
    console.error('Redis error:', err);
});

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const delAsync = promisify(client.del).bind(client);

class RedisDB {
    async save(product, cb) {
        try {
            product.id = Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
            await setAsync(`product:${product.id}`, JSON.stringify(product));
            cb(null);
        } catch (err) {
            cb(err);
        }
    }

    async fetchAll(cb) {
        try {
            const keys = await promisify(client.keys).bind(client)('product:*');
            const products = await Promise.all(keys.map(key => getAsync(key).then(JSON.parse)));
            cb(products);
        } catch (err) {
            cb(err);
        }
    }

    async findById(id, cb) {
        try {
            const product = await getAsync(`product:${id}`);
            cb(JSON.parse(product));
        } catch (err) {
            cb(err);
        }
    }

    async deleteById(id, cb) {
        try {
            await delAsync(`product:${id}`);
            cb(null);
        } catch (err) {
            cb(err);
        }
    }

    async updateProduct(id, updatedProduct, cb) {
        try {
            await setAsync(`product:${id}`, JSON.stringify(updatedProduct));
            cb(null);
        } catch (err) {
            cb(err);
        }
    }
}

module.exports = RedisDB;
