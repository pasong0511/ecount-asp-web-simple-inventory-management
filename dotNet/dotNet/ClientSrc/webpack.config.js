const path = require("path");

module.exports = {
    entry: {
        main: "./main.js",
        purchase: "./purchase.js",
        sale: "./sale.js",
        inventory: "./inventory.js",
        login: "./login.js",
    },
    output: {
        path: path.join(__dirname, "../Scripts"),
    },
}