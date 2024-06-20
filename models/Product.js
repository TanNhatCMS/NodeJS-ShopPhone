const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');

const p = path.join(rootDir.path, '../database', 'Products.json');

const readFileContent = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            console.error('Error reading file:', err);
            return cb([]);
        }
        try {
            fileContent = JSON.parse(fileContent);
        } catch (err) {
            console.error('Error parsing JSON:', err);
            return cb([]);
        }
        cb(fileContent);
    });
};

const writeFileContent = (data, cb) => {
    fs.writeFile(p, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error('Error writing file:', err);
        }
        cb(err);
    });
};

module.exports = class Product {
    constructor(data) {
        this.name = data.name;
        this.price = data.price;
        this.screen = data.screen;
        this.backCamera = data.backCamera;
        this.frontCamera = data.frontCamera;
        this.img = data.img;
        this.desc = data.desc;
        this.type = data.type;
    }

    save(cb) {
        this.id = Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
        readFileContent(products => {
            products.push(this);
            writeFileContent(products, (err) => {
                if (err) {
                    console.error('Error saving product:', err);
                }
                cb(err);
            });
        });
    }

    static fetchAll(cb) {
        readFileContent(cb);
    }

    static findById(id, cb) {
        readFileContent(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        });
    }

    static deleteById(id, cb) {
        readFileContent(products => {
            const updatedProducts = products.filter(p => p.id !== id);
            writeFileContent(updatedProducts, (err) => {
                if (err) {
                    console.error('Error deleting product:', err);
                }
                cb(err);
            });
        });
    }

    static updateProduct(id, updatedProduct, cb) {
        readFileContent(products => {
            const productIndex = products.findIndex(p => p.id === id);
            if (productIndex === -1) {
                console.error('Product not found:', id);
                return cb('Product not found');
            }
            products[productIndex] = { ...products[productIndex], ...updatedProduct };
            writeFileContent(products, (err) => {
                if (err) {
                    console.error('Error updating product:', err);
                }
                cb(err);
            });
        });
    }
};
