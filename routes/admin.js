const express = require('express');
const {AddProduct, deleteProduct, updateProduct} = require("../controller/product");
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin', { title: 'Admin Panel' });
});
router.post('/add-product',AddProduct)
router.delete('/Product/:productId', deleteProduct);
router.put('/Product/:productId', updateProduct);
module.exports = router;
