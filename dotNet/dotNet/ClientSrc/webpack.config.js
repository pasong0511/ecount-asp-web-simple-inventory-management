const path = require("path");

module.exports = {
    mode: "development",
    entry: {
        index: "./index.js",
        main: "./main.js",
        purchase: "./purchase.js",
        sale: "./sale.js",
        inventory: "./inventory.js",
        login: "./login.js",
        client: "./client.js",
    },
    output: {
        path: path.join(__dirname, "../Scripts"),
    },
};
