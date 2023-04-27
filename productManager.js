 const fs = require('fs');

class ProductManager {
    constructor(path) {
      this.path = path;
    }
  
    addProduct(product) {
      const products = this.getProducts();
      const lastProduct = products[products.length - 1];
      const id = lastProduct ? lastProduct.id + 1 : 1;
      const newProduct = { id, ...product };
      products.push(newProduct);
      fs.writeFileSync(this.path, JSON.stringify(products));
      return newProduct;
    }
  
    getProducts() {
      const data = fs.readFileSync(this.path);
      return JSON.parse(data);
    }
  
    getProductById(id) {
      const products = this.getProducts();
      const product = products.find((p) => p.id === id);
      if (!product) {
        throw new Error(`Producto con id ${id} no encontardo`);
      }
      return product;
    }
  
    updateProduct(id, updatedProduct) {
      const products = this.getProducts();
      const index = products.findIndex((p) => p.id === id);
      if (index === -1) {
        throw new Error(`Producto con id ${id} no encontrado`);
      }
      products[index] = { id, ...updatedProduct };
      fs.writeFileSync(this.path, JSON.stringify(products));
      return products[index];
    }
  
    deleteProduct(id) {
      const products = this.getProducts();
      const index = products.findIndex((p) => p.id === id);
      if (index === -1) {
        throw new Error(`Producto con id ${id} no encontrado`);
      }
      const deletedProduct = products.splice(index, 1)[0];
      fs.writeFileSync(this.path, JSON.stringify(products));
      return deletedProduct;
    }
  }