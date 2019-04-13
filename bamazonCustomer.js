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
    displayItems();
});

function displayItems() {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        var table = new Table({
            head: ['ID', 'Product', 'Department', 'Price', 'Quantity']
            , colWidths: [10, 50, 50, 20, 10]
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
            console.log(answer.buyID);
            console.log(answer.quantity);
            console.log("You want to buy " + answer.quantity + " of Item # " + answer.buyID)
            // var buyQuery = "SELECT * FROM products WHERE ? { item_id = answer.buyID }";
            connection.query("SELECT * FROM products WHERE ?", { item_id: answer.buyID }, function (err, res) {
                console.log(res)
                console.log(res[0].product_name);
                console.log(res[0].stock_quantity);
                if (res[0].stock_quantity < answer.quantity) {
                    console.log("Sorry, there are not that many available for purchase. Please start over.");
                    buySomething();
                } else {
                    var newQuantity = res[0].stock_quantity - answer.quantity;
                    console.log("There are now " + newQuantity + res[0].product_name + " remaining.");
                    connection.query("UPDATE products SET stock_quantity = ? WHERE ?", [newQuantity, res[0].item_id], function (error) {
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
                displayItems();
            }
        })
};



