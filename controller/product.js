const Product = require("../models/Product");

exports.Addproduct = (req, res, next) => {
    console.log(req.body)
    const products = new Product(req.body);
    products.save();
    res.status(201).json({
         message: 'Created product'
    })
}

exports.getProducts = (req, res) => {
    Product.fetchData(products => {
        res.status(200).json({
            products: products
         })
    })
}

exports.getProduct = (req, res) => {
    const params = req.params;
    Product.findById( params.productId,products => {
        res.status(200).json({
            product: products
        })
    })
}

exports.deleteProduct = (req, res) => {
    const params = req.params;
    Product.deleteById(params.productId);
    res.status(200).json({
        message: 'Product Deleted'
    })
}

exports.updateProduct = (req, res) => {
    const params = req.params;
    const body = req.body;
    Product.updateProduct( params.productId, body);
    res.status(200).json({
        message: 'Product Updated'
    })
}
