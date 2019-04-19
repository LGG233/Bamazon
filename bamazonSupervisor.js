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

console.clear();
console.log("\r\nWelcome to Bamazon Manager.\r\n--------------------------------------------------------------------------------------------\r\n\r\n");
connection.connect(function (err) {
    if (err) throw err;
    startOperations();
});

function startOperations() {
    inquirer.prompt([
        {
            name: "start",
            type: "list",
            message: "Please select your operation below.\r\n\r\n",
            choices: [
                "View Product Sales by Department",
                "Create New Department",
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
        case "View Product Sales by Department":
            productSales();
            return;
        case "Create New Department":
            newDepartment();
            return;
        case "Exit":
            console.log("Signing out...")
            connection.end();
            return;
        default:
            console.log("Please enter a valid command.");
    }
}

function productSales() {
    var query = "SELECT d.`department_id`, d.`department_name`, d.`over_head_costs`, p.`product_sales`, d.`total_profit` FROM products AS p RIGHT JOIN departments AS d ON p.department_name = d.department_name GROUP BY department_name;";
    connection.query(query, function (err, res) {
        drawTable(res);
    })
}

function newDepartment() {
    console.clear();
    console.log("\r\\r\n--------------------------------------------------------------------------------------------\r\n\r\n");
    inquirer.prompt([
        {
            name: "newDept",
            type: "input",
            message: "Please enter the name of the new department"
        },
        {
            name: "overHead",
            type: "number",
            message: "Please enter the total overhead costs for the new product"
        }
    ])
        .then(function (answer) {
            connection.query("INSERT INTO `departments`(`department_name`, `over_head_costs`) VALUES (?, ?)", [
                answer.newDept,
                answer.overHead,
            ]);
            var query = "SELECT d.`department_id`, d.`department_name`, d.`over_head_costs`, p.`product_sales`, d.`total_profit` FROM products AS p RIGHT JOIN departments AS d ON p.department_name = d.department_name GROUP BY department_name;";
            connection.query(query, function (err, res) {
                drawTable(res);
            })
        })
};

function drawTable(res) {
    var table = new Table({
        head: ['Dept ID', 'Department', 'Overhead Costs', 'Product Sales', 'Profit (Loss)']
        , colWidths: [15, 30, 22, 22, 22]
    });
    for (var i = 0; i < res.length; i++) {
        if ((res[i].product_sales) === null) {
            var sales = 0;
        } else {
            var sales = parseInt(res[i].product_sales);
        }
        var profits = parseInt(sales) - parseInt(res[i].over_head_costs);
        table.push(
            [res[i].department_id, res[i].department_name, parseInt(res[i].over_head_costs), parseInt(sales), parseInt(profits)]
        );
    }
    console.log("\r\n\r\nCurrent Bamazon Deparments Are As Follow:\r\n");
    console.log(table.toString() + "\r\n\r\n");
    startOperations();
}