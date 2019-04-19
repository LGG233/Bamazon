# Bamazon

Online shopping was never easier. Customers and managers alike will appreciate the simplicity of Bamazon, the online app that lets shoppers buy products and supervisors manage stock with just a few keystrokes. Here's how it works:

# For Customers

Simply type "node bamazonCustomer" into the terminal to run the Bamazon shopping app. On startup, you'll be presented with a list of items for sale, prices, and the available quantity for each:
![Customer Startup](/images/customer-startup.jpg)

At the prompt, you'll enter the Product ID of the item you wish to purchase, along with the number of items you want to buy, and hit return. If there aren't enough items to fill your order, you'll get an "insufficient quantity" alert and a request to start over:

![Insufficient Quantity](/images/insufficient-quantity.jpg)

If all goes well, Bamazon tells you your purchase has gone through, and provides the total cost of your order:
![Successful Purchase](/images/customer-purchase.jpg)

Keep shopping as long as you'd like, then select "Exit" to end the program

# For Managers

Bamazon managers can perform a number of operations:
- view products for sale,
- view low inventory,
- add inventory, and 
- add new products.

Type "node bamazonManager" to launch the app; you'll be presented with a startup screen listing the products currently available in the marketplace:
![Mananger Startup](/images/manager-startup.jpg)

Selecting "View Products for Sale" reloads the list of items, and can be done at any point to refresh the screen.

Picking "View Low Inventory" will give you a list of items for which there are fewer than five items available:
![Low Inventory](/images/low-inventory.jpg)

Choosing "Add to Inventory" lets you increase the stock quantity of any item on the list. You'll merely add the Product ID and the updated quantity, and Bamazon automatically updates the list and refreshes the screen to show you the update was properly processed:

![Add to Inventory](/images/add-to-inventory.jpg)

Finally, you can add new products to the marketplace by selecting "Add New Product." Bamazon will ask you to provide the name, department, price, and stock quantity of the product ![Add New Product](/images/add-new-product.jpg) and then refresh the display to show your item has been updated:
![Successful Product Addition](/images/new-product-added.jpg)

# For Supervisors

Supervisors at Bamazon are authorized to access sales data for each department. In addition, they can add new departments to Bamazon. Type "node bamazonSupervisor" to launch the app and you'll see the startup screen:
![Supervisor Startup](/images/supervisor-startup.jpg)

To view sales data, select "View Sales by Department:"
![View Sales Data](/images/view-sales.jpg)

Sales information is refreshed each time you request the data, so includes up-to-date sales data from the marketplace.

Creating new departments is simple. Just select "Add new department" and provide the name of and total overhead costs for the new department. The screen automatically refreshes to confirm that the database has been updated:
![New Department Added](/images/new-department.jpg) 

