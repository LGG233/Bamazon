    DROP TABLE IF EXISTS products;
    CREATE TABLE products(
        item_id INT NOT NULL AUTO_INCREMENT,
		product_name VARCHAR(50) NOT NULL,
        department_name VARCHAR(50) NOT NULL,
        price DECIMAL (6,2) NOT NULL,
        stock_quantity INT NOT NULL,
        PRIMARY KEY(item_id)
    );

    INSERT INTO products(product_name, department_name, price, stock_quantity )
    VALUES("Pencils 20-pack", "Office Supplies", "4.99", "200");
    INSERT INTO products(product_name, department_name, price, stock_quantity )
    VALUES("Lawnmower", "Garden", "249.99", "10");
    INSERT INTO products(product_name, department_name, price, stock_quantity )
    VALUES("Instant Pot", "Kitchen", "99.99", "75");
    INSERT INTO products(product_name, department_name, price, stock_quantity )
    VALUES("Toaster Oven", "Kitchen", "44.95", "100");
    INSERT INTO products(product_name, department_name, price, stock_quantity )
    VALUES("Wine Glasses 6-pack", "Home", "45.99", "90");
    INSERT INTO products(product_name, department_name, price, stock_quantity )
    VALUES("Garden Rake", "Garden", "19.99", "100");
    INSERT INTO products(product_name, department_name, price, stock_quantity )
    VALUES("Paper 500-sheet", "Office Supplies", "9.99", "200");
    INSERT INTO products(product_name, department_name, price, stock_quantity )
    VALUES("Coffee Mugs 6-pack", "Home", "24.99", "175");
    INSERT INTO products(product_name, department_name, price, stock_quantity )
    VALUES("Flash Drive 128GB", "Office Supplies", "21.99", "500");
    INSERT INTO products(product_name, department_name, price, stock_quantity )
    VALUES("Wooden Picture Frame 8 X 10", "Home", "14.99", "100");
    INSERT INTO products(product_name, department_name, price, stock_quantity )
    VALUES("Electric Edger", "Garden", "39.99", "25");
    INSERT INTO products(product_name, department_name, price, stock_quantity )
    VALUES("Paper Towel Holder", "Kitchen", "9.99", "80");
