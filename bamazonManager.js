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
            addInventory(thingToDo);
            return;
        case "Add New Product":
            addProduct();
            return;
        case "Exit":
            console.log("Signing out...")
            return;
        default:
            console.log("Please enter a valid command.");
    }
}

function viewInventory() {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        var table = new Table({
            head: ['ID', 'Product', 'Price', 'Quantity']
            , colWidths: [8, 30, 12, 10]
        });
        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity]
            );
        }
        console.log(table.toString());
        startOperations();
    })
}

function lowInventory() {
    var query = "SELECT * FROM products WHERE stock_quantity < 5";
    connection.query(query, function (err, res) {
        var table = new Table({
            head: ['ID', 'Product', 'Price', 'Quantity']
            , colWidths: [8, 30, 12, 10]
        });
        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity]
            );
        }
        console.log(table.toString());
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
            connection.query("SELECT * FROM products WHERE ?", { item_id: answer.updateID }, function (err, res) {
                console.log("\r\n--------------------------------------------\r\nUpdating Item " + answer.updateID + ". There are now " + answer.quantity + " items for sale.\r\n--------------------------------------------\r\n");
                connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [answwer.quantity, res[0].item_id], function (error) {
                    // connection.query("UPDATE products SET stock_quantity = ? WHERE stock_quantity = ?", [newQuantity, res[0].item_id], function (error) {
                    if (error) throw err;
                }
                )
            })
        });
    connection.query(query, function (err, res) {
        var table = new Table({
            head: ['ID', 'Product', 'Price', 'Quantity']
            , colWidths: [8, 30, 12, 10]
        });
        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity]
            );
        }
        console.log(table.toString());
        startOperations();
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
            connection.query("INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES = ?", [answer.mewItem, answer.newDept, answer.newPrice, answer.newQuantity]);
            if (error) throw err;
        }
        )
    connection.query(query, function (err, res) {
        var table = new Table({
            head: ['ID', 'Product', 'Price', 'Quantity']
            , colWidths: [8, 30, 12, 10]
        });
        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity]
            );
        }
        console.log(table.toString());
        startOperations();
    })
};


