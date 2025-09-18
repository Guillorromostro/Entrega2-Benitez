const express = require('express');
const router = express.Router();
const productService = require('../services/productService');

router.get('/', (req, res) => {
    const products = productService.getAllProducts();
    res.render('home', { products });
});

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
});

module.exports = router;