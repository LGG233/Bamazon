var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "Trilogy",

    // Your password
    password: "123",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    startOperations();
});

function startOperations() {
    console.clear;
    inquirer.prompt([
        {
            name: "start",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product",
                "Exit"
            ]
        }
    ])
        .then(function (answer) {
            var initialize = answer.start
            firstAction(initialize);
        })
}

function firstAction(initialize) {
    switch (initialize) {
        case "View Products for Sale":
            viewInventory();
            return;
        case "View Low Inventory":
            lowInventory();
            return;
        case "Add to Inventory":
            addInventory();
            return;
        case "Add New Product":
            addProduct();
            return;
        case "Exit":
            console.log("Signing out...")
            connection.end();
            return;
        default:
            console.log("Please enter a valid command.");
    }
}

function viewInventory() {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        drawTable(res);
        startOperations();
    })
}

function lowInventory() {
    var query = "SELECT * FROM products WHERE stock_quantity < 5";
    connection.query(query, function (err, res) {
        if (!res.length) {
            console.log("\r\n--------------------------------------------\r\nNothing to display. Inventory is good on all items.\r\n--------------------------------------------\r\n")
        } else {
            drawTable(res);
        }
        startOperations();
    })
}

function addInventory() {
    inquirer.prompt([
        {
            name: "updateID",
            type: "input",
            message: "Please enter the ID of the item you would like to update ?"
        },
        {
            name: "quantity",
            type: "input",
            message: "Please enter the new quantity"
        }
    ])
        .then(function (answer) {
            var newQuantity = answer.quantity;
            var idToChange = answer.updateID;
            console.log("\r\n--------------------------------------------\r\nUpdating Item " + answer.updateID + ". There are now " + answer.quantity + " items for sale.\r\n--------------------------------------------\r\n");
            connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [newQuantity, idToChange], function (error) {
                if (error) throw err;
            })
            var query = "SELECT * FROM products";
            connection.query(query, function (err, res) {
                drawTable(res);
                startOperations();
            })
        })
};

function addProduct() {
    inquirer.prompt([
        {
            name: "newItem",
            type: "input",
            message: "Please enter the name of the new product"
        },
        {
            name: "newDept",
            type: "input",
            message: "Please enter the deparment of the new product"
        },
        {
            name: "newPrice",
            type: "input",
            message: "Please enter the price of the new product"
        },
        {
            name: "newQuantity",
            type: "input",
            message: "Please enter the quantity of the new product"
        }
    ])
        .then(function (answer) {
            // var newItem = answer.newItem;
            // var newDept = answer.newDept;
            var newPrice = parseFloat(answer.newPrice);
            var newQuantity = parseInt(answer.newQuantity);
            console.log(newPrice);
            console.log(newQuantity);
            // var newQuantity = answer.newQuantity;
            connection.query("INSERT INTO `products`(`product_name`, `department_name`, `price`, `stock_quantity`) VALUES (?, ?, ?, ?)", [
                answer.newItem,
                answer.newDept,
                parseFloat(answer.newPrice),
                parseInt(answer.newQuantity)
            ]);
            // if (error) throw err;
            var query = "SELECT * FROM products";
            connection.query(query, function (err, res) {
                drawTable(res);
                startOperations();
            })
        })
};

function drawTable(res) {
    var table = new Table({
        head: ['ID', 'Product', 'Department', 'Price', 'Quantity']
        , colWidths: [8, 30, 30, 12, 10]
    });
    for (var i = 0; i < res.length; i++) {
        table.push(
            [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
        );
    }
    console.log(table.toString());
}

function validateNumber() {
    if (typeof input !== 'number') {
        console.log('You need to provide a number');
    }
};  