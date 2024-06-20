const fs = require('fs');
const path = require('path');
const p = path.join(path.dirname(process.mainModule.filename), '../database', 'Products.json');

const readFileContent = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            return cb([]);
        }
        try {
            fileContent = JSON.parse(fileContent);
        } catch (err) {
            return cb([]);
        }
        cb(fileContent);
    });
};

const writeFileContent = (data, cb) => {
    fs.writeFile(p, JSON.stringify(data, null, 2), (err) => {
        cb(err);
    });
};

class JsonDB {
    save(product, cb) {
        product.id = Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
        readFileContent(products => {
            products.push(product);
            writeFileContent(products, cb);
        });
    }

    fetchAll(cb) {
        readFileContent(cb);
    }

    findById(id, cb) {
        readFileContent(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        });
    }

    deleteById(id, cb) {
        readFileContent(products => {
            const updatedProducts = products.filter(p => p.id !== id);
            writeFileContent(updatedProducts, cb);
        });
    }

    updateProduct(id, updatedProduct, cb) {
        readFileContent(products => {
            const productIndex = products.findIndex(p => p.id === id);
            if (productIndex === -1) {
                return cb('Product not found');
            }
            products[productIndex] = { ...products[productIndex], ...updatedProduct };
            writeFileContent(products, cb);
        });
    }
}

module.exports = JsonDB;
