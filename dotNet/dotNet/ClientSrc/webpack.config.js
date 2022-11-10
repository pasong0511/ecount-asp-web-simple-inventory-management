const path = require("path");

module.exports = {
    entry: {
        product: "./main.js",
        purchase: "./purchase.js",
        sale: "./sale.js",
        inventory: "./inventory.js",
        login: "./login.js",
    },
    output: {
        path: path.join(__dirname, "../Scripts"),
    },
}