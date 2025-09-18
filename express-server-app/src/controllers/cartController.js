class CartController {
    constructor(cartService) {
        this.cartService = cartService;
        this.createCart = this.createCart.bind(this);
        this.getCartProducts = this.getCartProducts.bind(this);
        this.addProductToCart = this.addProductToCart.bind(this);
    }

    async createCart(req, res) {
        try {
            const newCart = this.cartService.createCart();
            res.status(201).json(newCart);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getCartProducts(req, res) {
        const cartId = req.params.cid;
        try {
            const products = this.cartService.getProductsInCart(cartId);
            if (!products) {
                return res.status(404).json({ message: 'Carrito no encontrado' });
            }
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async addProductToCart(req, res) {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        try {
            const updatedCart = this.cartService.addProductToCart(cartId, productId);
            if (!updatedCart) {
                return res.status(404).json({ message: 'Carrito no encontrado' });
            }
            res.status(200).json(updatedCart);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = CartController;