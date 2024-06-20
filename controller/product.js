const Product = require("../models/Product");

exports.Addproduct = (req, res, next) => {
    const product = new Product(req.body);
    product.save((err) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to create product' });
        }
        res.status(201).json({ message: 'Created product' });
    });
};

exports.getProducts = (req, res) => {
    Product.fetchAll((products) => {
        res.status(200).json({ products: products });
    });
};

exports.getProduct = (req, res) => {
    const params = req.params;
    Product.findById(params.productId, (product) => {
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ product: product });
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
