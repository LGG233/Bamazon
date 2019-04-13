var mysql = require("mysql");
var inquirer = require("inquirer");
var columnify = require('columnify')

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
    // runSearch();
});

function displayItems() {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        for (var i = 0; i < res.length; i++) {
            var id = res[i].item_id;
            var product = res[i].product_name;
            var department = res[i].department_name;
            var price = res[i].price;
            var quantity = res[i].stock_quantity;
            // } {
            var columns = columnify([{
                // var data = {
                id,
                product,
                department,
                price,
                quantity
                //  {
                //     id: res[i].item_id,
                //     product: res[i].product_name,
                //     department: res[i].department_name,
                //     price: res[i].price,
                //     quantity: res[i].stock_quantity
                }], {
                config: {
                    id: { maxWidth: 6, showHeaders: false },
                    product: { minWidth: 30, showHeaders: false },
                    department: { minWidth: 30, showHeaders: false },
                    price: { minWidth: 12, showHeaders: false },
                    quantity: { maxWidth: 10,showHeaders: false }
                }
            })
            console.log(columns)
        }
    })
    connection.end();
}

//     var data = {
//         res[i].item_id : res[i].product_name : res[i].department_name : res[i].price + : res[i].stock_quantity                
//     }
//         // console.log("| " + res[i].item_id + " || " + res[i].product_name + " || " + res[i].department_name + " || " + res[i].price + " || " + res[i].stock_quantity + " |");
//     // }
// }

function runSearch() {
    inquirer
        .prompt({
            name: "purchase",
            message: "What would you like to buy?",
            choices: [
                "Find songs by artist",
                "Find all artists who appear more than once",
                "Find data within a specific range",
                "Search for a specific song",
                "exit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "Find songs by artist":
                    artistSearch();
                    break;

                case "Find all artists who appear more than once":
                    multiSearch();
                    break;

                case "Find data within a specific range":
                    rangeSearch();
                    break;

                case "Search for a specific song":
                    songSearch();
                    break;

                case "exit":
                    connection.end();
                    break;
            }
        });
}
