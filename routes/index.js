const express = require('express');
const {getProducts, getProduct} = require("../controller/product");
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/Products', getProducts);
router.get('/Products/:productId', getProduct);
module.exports = router;
