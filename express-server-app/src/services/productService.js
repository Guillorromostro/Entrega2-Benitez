const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');

class ProductService {
    // Cargar productos desde el archivo
    loadProducts() {
        if (fs.existsSync(productsFilePath)) {
            const data = fs.readFileSync(productsFilePath);
            return JSON.parse(data);
        }
        return [];
    }

    // Guardar productos en el archivo
    saveProducts(products) {
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
    }

    // Obtener todos los productos
    getAllProducts() {
        return this.loadProducts();
    }

    // Agregar un producto
    addProduct(product) {
        const products = this.loadProducts();
        const lastId = products.length > 0 ? Math.max(...products.map(p => Number(p.id))) : 0;
        const newProduct = {
            id: (lastId + 1).toString(),
            title: product.title,
            description: product.description,
            code: product.code,
            price: product.price,
            status: product.status,
            stock: product.stock,
            category: product.category,
            thumbnails: Array.isArray(product.thumbnails) ? product.thumbnails : []
        };
        products.push(newProduct);
        this.saveProducts(products);
        return newProduct;
    }

    // Eliminar un producto por ID
    deleteProduct(id) {
        let products = this.loadProducts();
        const index = products.findIndex(product => product.id == id);
        if (index !== -1) {
            const deletedProduct = products.splice(index, 1);
            this.saveProducts(products);
            return deletedProduct[0];
        }
        return null;
    }
}

const ProductsManager = new ProductService();

module.exports = {
    getAllProducts: () => ProductsManager.getAllProducts(),
    addProduct: (product) => ProductsManager.addProduct(product),
    deleteProduct: (id) => ProductsManager.deleteProduct(id)
};