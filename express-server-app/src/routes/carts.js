const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cartController');
const cartService = require('../services/cartService');

const cartController = new CartController(cartService);

// Ruta para crear un nuevo carrito
router.post('/', cartController.createCart);

// Ruta para listar todos los productos en un carrito especificado
router.get('/:cid', cartController.getCartProducts);

// Ruta para agregar un producto a un carrito especificado
router.post('/:cid/product/:pid', cartController.addProductToCart);

module.exports = router;