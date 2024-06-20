const express = require('express');
const {getProducts, getProduct} = require("../controller/productController");
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
