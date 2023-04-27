const express = require('express');
const ProductManager = require('./productManager');

const app = express();
const port = 8080; 

const productManager = new ProductManager('./productos.json'); 

app.get('/products', async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = await productManager.getProducts();
    const response = limit ? products.slice(0, limit) : products;
    res.send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/products/:pid', async (req, res) => {
  try {
    const id = parseInt(req.params.pid);
    const product = await productManager.getProductById(id);
    res.send(product);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
