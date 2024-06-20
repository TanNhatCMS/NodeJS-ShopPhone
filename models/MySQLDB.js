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
        pool.execute(sql, [product.name, product.price, product.screen, product.backCamera, product.frontCamera, product.img, product.desc, product.type], (err, results) => {
            cb(err);
        });
    }

    fetchAll(cb) {
        const sql = 'SELECT * FROM products';
        pool.execute(sql, [], (err, results) => {
            cb(results);
        });
    }

    findById(id, cb) {
        const sql = 'SELECT * FROM products WHERE id = ?';
        pool.execute(sql, [id], (err, results) => {
            cb(results[0]);
        });
    }

    deleteById(id, cb) {
        const sql = 'DELETE FROM products WHERE id = ?';
        pool.execute(sql, [id], (err, results) => {
            cb(err);
        });
    }

    updateProduct(id, updatedProduct, cb) {
        const sql = 'UPDATE products SET name = ?, price = ?, screen = ?, backCamera = ?, frontCamera = ?, img = ?, desc = ?, type = ? WHERE id = ?';
        pool.execute(sql, [updatedProduct.name, updatedProduct.price, updatedProduct.screen, updatedProduct.backCamera, updatedProduct.frontCamera, updatedProduct.img, updatedProduct.desc, updatedProduct.type, id], (err, results) => {
            cb(err);
        });
    }
}

module.exports = MySQLDB;
