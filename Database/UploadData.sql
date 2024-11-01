CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS product_history;
 
CREATE TABLE product_history (
    history_id UUID PRIMARY KEY,
    product_id TEXT,
    product_stock INT,
    product_price FLOAT,
    date DATE
);
 
COPY product_history (history_id, product_id, product_stock, product_price, date)
FROM '/product-history.csv'
DELIMITER ','
CSV HEADER;
 
SELECT COUNT(*) FROM product_history;



DROP TABLE IF EXISTS products;
 
CREATE TABLE products (
    product_id TEXT PRIMARY KEY,
    product_name TEXT,
    product_stock INT,
    product_price FLOAT
);
 
COPY products (product_id, product_name, product_stock, product_price)
FROM '/products.csv'
DELIMITER ','
CSV HEADER;
 
SELECT COUNT(*) FROM products;