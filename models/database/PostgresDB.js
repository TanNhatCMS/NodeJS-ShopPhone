const pgp = require('pg-promise')();

const db = pgp({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD
});

class PostgresDB {
    save(product, cb) {
        const sql = `INSERT INTO products (name, price, screen, backCamera, frontCamera, img, desc, type) 
                     VALUES ($[name], $[price], $[screen], $[backCamera], $[frontCamera], $[img], $[desc], $[type]) 
                     RETURNING id`;
        db.one(sql, product)
            .then(result => cb(null, result))
            .catch(err => cb(err));
    }

    fetchAll(cb) {
        db.any('SELECT * FROM products')
            .then(products => cb(products))
            .catch(err => cb(err));
    }

    findById(id, cb) {
        db.oneOrNone('SELECT * FROM products WHERE id = $1', [id])
            .then(product => cb(product))
            .catch(err => cb(err));
    }

    deleteById(id, cb) {
        db.none('DELETE FROM products WHERE id = $1', [id])
            .then(() => cb(null))
            .catch(err => cb(err));
    }

    updateProduct(id, updatedProduct, cb) {
        const sql = `UPDATE products 
                     SET name = $[name], price = $[price], screen = $[screen], backCamera = $[backCamera], 
                         frontCamera = $[frontCamera], img = $[img], desc = $[desc], type = $[type] 
                     WHERE id = $[id]`;
        db.none(sql, { ...updatedProduct, id })
            .then(() => cb(null))
            .catch(err => cb(err));
    }
}

module.exports = PostgresDB;
