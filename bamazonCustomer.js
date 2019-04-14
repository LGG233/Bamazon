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
    showStock();
});

function buySomething() {
    inquirer.prompt([
        {
            name: "buyID",
            type: "input",
            message: "What would you like to buy?"
        },
        {
            name: "quantity",
            type: "input",
            message: "How many would you like to buy?"
        }
    ])
        .then(function (answer) {
            connection.query("SELECT * FROM products WHERE ?", { item_id: answer.buyID }, function (err, res) {
                // if (error) throw err;
                if (res[0].stock_quantity < answer.quantity) {
                    console.log("\r\n--------------------------------------------\r\nSorry, there are not that many available for purchase. Please start over.\r\n--------------------------------------------");
                    // buySomething();
                } else {
                    var newQuantity = res[0].stock_quantity - answer.quantity;
                    console.log("\r\n--------------------------------------------\r\nYou just purchased " + answer.quantity + " " + res[0].product_name + " for $" + (answer.quantity * res[0].price).toFixed(2) + ".\r\n--------------------------------------------\r\n");
                    console.log("\r\n--------------------------------------------\r\nThere are now " + newQuantity + " " + res[0].product_name + " remaining.\r\n--------------------------------------------\r\n");
                    connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [newQuantity, res[0].item_id], function (error) {
                        if (error) throw err;
                    }
                    )
                }
                stopShopping();
            });

        }
        )
};

function stopShopping() {
    console.clear;
    inquirer.prompt([
        {
            name: "next",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "Shop more",
                "Exit"
            ]
        }
    ])
        .then(function (answer) {
            if (answer.next === "Exit") {
                console.clear;
                console.log("Thank you for shopping!");
                connection.end();
                return
            } else {
                console.clear;
                showStock();
            }
        })
};

function showStock() {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
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
        buySomething();
    })
}