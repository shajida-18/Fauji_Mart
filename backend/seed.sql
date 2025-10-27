CREATE DATABASE IF NOT EXISTS faujimart;
USE faujimart;

-- users (army personnel)
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  card_number VARCHAR(32) UNIQUE,
  pin VARCHAR(32),
  name VARCHAR(200),
  location VARCHAR(100)
);

-- canteens
CREATE TABLE IF NOT EXISTS canteens (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255),
  address TEXT,
  location VARCHAR(100),
  password VARCHAR(255)
);

-- items
CREATE TABLE IF NOT EXISTS items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  canteen_id VARCHAR(64),
  category VARCHAR(64),
  name VARCHAR(255),
  price DECIMAL(10,2),
  stock INT,
  image VARCHAR(255),
  FOREIGN KEY (canteen_id) REFERENCES canteens(id) ON DELETE CASCADE
);

-- Sample seeds (a few rows; extend as needed)
INSERT IGNORE INTO users (card_number, pin, name) VALUES
('1234567890','1234','Major Rajesh Kumar');


INSERT IGNORE INTO canteens (id, name, address, location, password) VALUES
('canteen001','Central Army Canteen Delhi','Delhi Cantonment, New Delhi - 110010','delhi','delhi123')
;

-- Example items for canteen001
INSERT INTO items (canteen_id, category, name, price, stock, image) VALUES
('canteen001','toiletries','Colgate Total Toothpaste 200g',145.00,450,'https://m.media-amazon.com/images/I/61ZjlKoOpPL._SL1500_.jpg'),
('canteen001','toiletries','Head & Shoulders Anti-Dandruff Shampoo 400ml',280.00,420,'https://m.media-amazon.com/images/I/61Uy0HtVuJL._SL1500_.jpg'),
('canteen001','general','Duracell AA Batteries (Pack of 8)',285.00,500,'https://m.media-amazon.com/images/I/61ZjlKoOpPL._SL1500_.jpg');
