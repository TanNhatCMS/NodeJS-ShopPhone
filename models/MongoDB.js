const { MongoClient, ObjectId } = require('mongodb');

const url = process.env.MONGODB_URL;
const dbName = process.env.MONGODB_DATABASE;

class MongoDB {
    static async connect() {
        const client = await MongoClient.connect(url, { useUnifiedTopology: true });
        return client.db(dbName);
    }

    async save(product, cb) {
        const db = await MongoDB.connect();
        product._id = new ObjectId();
        db.collection('products').insertOne(product, cb);
    }

    async fetchAll(cb) {
        const db = await MongoDB.connect();
        const products = await db.collection('products').find().toArray();
        cb(products);
    }

    async findById(id, cb) {
        const db = await MongoDB.connect();
        const product = await db.collection('products').findOne({ _id: new ObjectId(id) });
        cb(product);
    }

    async deleteById(id, cb) {
        const db = await MongoDB.connect();
        db.collection('products').deleteOne({ _id: new ObjectId(id) }, cb);
    }

    async updateProduct(id, updatedProduct, cb) {
        const db = await MongoDB.connect();
        db.collection('products').updateOne({ _id: new ObjectId(id) }, { $set: updatedProduct }, cb);
    }
}

module.exports = MongoDB;
