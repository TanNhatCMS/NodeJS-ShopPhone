const ProductClass = require("../models/Product");
const db = require("../models/db"); // assuming you export your db instance from this file
const Product = new ProductClass(db);

exports.AddProduct = (req, res) => {
    Product.save(req.body, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to create product' });
        }
        res.status(201).json({ message: 'Created product' });
    });
};

exports.getProducts = (req, res) => {
    Product.fetchAll((products) => {
        const modifiedProducts = products.map(product => {
            return {
                id: product._id,
                ...product,
                _id: undefined // remove the _id field
            };
        });
        res.status(200).json({ products: modifiedProducts });
    });
};

exports.getProduct = (req, res) => {
    const params = req.params;
    if (!params.productId || params.productId.length !== 24) {
        return res.status(400).json({ message: 'Invalid product ID' });
    }
    Product.findById(params.productId, (product) => {
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const modifiedProduct = {
            id: product._id,
            ...product,
            _id: undefined // remove the _id field
        };
        res.status(200).json({ product: modifiedProduct });
    });
};

exports.deleteProduct = (req, res) => {
    const params = req.params;
    Product.deleteById(params.productId, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to delete product' });
        }
        res.status(200).json({ message: 'Product deleted' });
    });
};

exports.updateProduct = (req, res) => {
    const params = req.params;
    const body = req.body;
    Product.updateProduct(params.productId, body, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to update product' });
        }
        res.status(200).json({ message: 'Product updated' });
    });
};
