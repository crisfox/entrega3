const express = require("express");
const Container = require("./Container");
const bodyParser = require("express");
const app = express();
const container = new Container("productos.txt");

app.use(bodyParser.urlencoded({extended: false}));

app.get("/productos", async function (request, response) {
    const products = await container.getAll();
    return response.status(200).json(products);
});

app.get("/productoRandom", async function (request, response) {
    const products = await container.getAll();
    const randomId = Math.floor(Math.random() * products.length);
    const product = await container.getById(randomId);
    return response.status(200).json(product);
});

const listener = app.listen("8080", () => {
    console.log(`Your app is listening on port ${listener.address().port}`)
});
