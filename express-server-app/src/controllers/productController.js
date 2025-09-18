class ProductController {
    constructor(productService) {
        this.productService = productService;
        this.getAllProducts = this.getAllProducts.bind(this);
        this.getProductById = this.getProductById.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
    }

    async getAllProducts(req, res) {
        try {
            const products = this.productService.getAllProducts();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getProductById(req, res) {
        const { pid } = req.params;
        try {
            const product = this.productService.getProductById(pid);
            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).json({ message: 'Producto no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async addProduct(req, res) {
        const newProduct = req.body;
        // Validación básica
        const requiredFields = ['title', 'description', 'code', 'price', 'status', 'stock', 'category', 'thumbnails'];
        for (const field of requiredFields) {
            if (!(field in newProduct)) {
                return res.status(400).json({ message: `Falta el campo: ${field}` });
            }
        }
        try {
            const createdProduct = this.productService.addProduct(newProduct);
            res.status(201).json(createdProduct);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateProduct(req, res) {
        const { pid } = req.params;
        const updatedProduct = req.body;
        try {
            const product = this.productService.updateProduct(pid, updatedProduct);
            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).json({ message: 'Producto no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteProduct(req, res) {
        const { pid } = req.params;
        try {
            const deleted = this.productService.deleteProduct(pid);
            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Producto no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = ProductController;