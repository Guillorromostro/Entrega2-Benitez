const fs = require('fs');
const path = require('path');

const cartsFilePath = path.join(__dirname, '../data/carts.json');

class CartService {
    constructor() {
        this.carts = this.loadCarts();
        this.lastId = this.carts.length > 0 ? Math.max(...this.carts.map(c => Number(c.id))) : 0;
    }

    loadCarts() {
        if (fs.existsSync(cartsFilePath)) {
            const data = fs.readFileSync(cartsFilePath);
            return JSON.parse(data);
        }
        return [];
    }

    saveCarts() {
        fs.writeFileSync(cartsFilePath, JSON.stringify(this.carts, null, 2));
    }

    createCart() {
        this.lastId += 1;
        const newCart = { id: this.lastId.toString(), products: [] };
        this.carts.push(newCart);
        this.saveCarts();
        return newCart;
    }

    getCartById(cartId) {
        // Permitir buscar por string o number
        return this.carts.find(cart => cart.id == cartId);
    }

    addProductToCart(cartId, productId) {
        const cart = this.getCartById(cartId);
        if (!cart) return null;

        // Buscar si el producto ya existe en el carrito
        const prodIndex = cart.products.findIndex(p => p.product == productId);
        if (prodIndex !== -1) {
            // Si existe, incrementar cantidad
            cart.products[prodIndex].quantity += 1;
        } else {
            // Si no existe, agregar con cantidad 1
            cart.products.push({ product: productId.toString(), quantity: 1 });
        }
        this.saveCarts();
        return cart;
    }

    getProductsInCart(cartId) {
        const cart = this.getCartById(cartId);
        return cart ? cart.products : null;
    }
}

module.exports = new CartService();