const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD
});

class MySQLDB {
    save(product, cb) {
        const sql = 'INSERT INTO products (name, price, screen, backCamera, frontCamera, img, desc, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        pool.execute(sql, [
            product.name, product.price, product.screen,
            product.backCamera, product.frontCamera,
            product.img, product.desc, product.type
        ], (err, results) => {
            if (err) {
                return cb(err);
            }
            cb(null, { insertedId: results.insertId });
        });
    }

    fetchAll(cb) {
        const sql = 'SELECT * FROM products';
        pool.execute(sql, [], (err, results) => {
            if (err) {
                return cb(err);
            }
            cb(null, results);
        });
    }

    findById(id, cb) {
        const sql = 'SELECT * FROM products WHERE id = ?';
        pool.execute(sql, [id], (err, results) => {
            if (err) {
                return cb(err);
            }
            if (results.length === 0) {
                return cb({ status: 404, message: 'Product not found', success: false });
            }
            cb(null, results[0]);
        });
    }

    deleteById(id, cb) {
        const sql = 'DELETE FROM products WHERE id = ?';
        pool.execute(sql, [id], (err, results) => {
            if (err) {
                return cb(err);
            }
            cb(null, { status: 200, message: 'Product deleted', success: true });
        });
    }

    updateProduct(id, updatedProduct, cb) {
        const sql = 'UPDATE products SET name = ?, price = ?, screen = ?, backCamera = ?, frontCamera = ?, img = ?, desc = ?, type = ? WHERE id = ?';
        pool.execute(sql, [
            updatedProduct.name, updatedProduct.price, updatedProduct.screen,
            updatedProduct.backCamera, updatedProduct.frontCamera,
            updatedProduct.img, updatedProduct.desc, updatedProduct.type, id
        ], (err, results) => {
            if (err) {
                return cb(err);
            }
            cb(null, { status: 200, message: 'Product updated', success: true });
        });
    }
}

module.exports = MySQLDB;
