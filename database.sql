-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: projectfauji
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `canteens`
--

DROP TABLE IF EXISTS `canteens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `canteens` (
  `id` varchar(50) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `canteens`
--

LOCK TABLES `canteens` WRITE;
/*!40000 ALTER TABLE `canteens` DISABLE KEYS */;
INSERT INTO `canteens` VALUES ('canteen001','Central Army Canteen Delhi','1234','Delhi Cantonment, New Delhi - 110010','2025-10-19 16:46:53','canteen1@example.com'),('canteen002','Eastern Command Canteen Kolkata','1234','Fort William, Kolkata - 700021','2025-10-19 16:46:53','canteen2@example.com'),('canteen003','Southern Command Canteen Pune','1234','Pune Cantonment, Maharashtra - 411001','2025-10-19 16:46:53','canteen3@example.com'),('canteen004','Western Command Canteen Chandigarh','1234','Chandimandir Cantonment, Haryana - 134107','2025-10-19 16:46:53','canteen4@example.com'),('canteen005','Northern Command Canteen Jammu','1234','Udhampur Cantonment, J&K - 182101','2025-10-19 16:46:53','canteen5@example.com'),('canteen006','Central Command Canteen Lucknow','1234','Lucknow Cantonment, UP - 226002','2025-10-19 16:46:53','canteen6@example.com'),('canteen007','Central Army Canteen Delhi 2','1234','Delhi Cantonment, New Delhi - 110010','2025-10-19 16:47:39','canteen7@example.com'),('canteen008','Eastern Command Canteen Kolkata 2','1234','Fort William, Kolkata - 700021','2025-10-19 16:47:39','canteen8@example.com'),('canteen009','Southern Command Canteen Pune 2','1234','Pune Cantonment, Maharashtra - 411001','2025-10-19 16:47:39','canteen9@example.com'),('canteen010','Western Command Canteen Chandigarh 2','1234','Chandimandir Cantonment, Haryana - 134107','2025-10-19 16:47:39','canteen10@example.com'),('canteen011','Northern Command Canteen Jammu 2','1234','Udhampur Cantonment, J&K - 182101','2025-10-19 16:47:39','canteen11@example.com'),('canteen012','Central Command Canteen Lucknow 2','1234','Lucknow Cantonment, UP - 226002','2025-10-19 16:47:39','canteen12@example.com'),('canteen013',NULL,'1234','Kerala','2025-10-20 13:07:43','vanterujahnavi@gmail.com'),('canteen1','Mumbai Canteen','1234','Mumbai','2025-10-19 15:41:49','canteen1@example.com'),('canteen10',NULL,'delhi123','Guntur','2025-10-24 08:56:53','canteen7@gmail.com'),('canteen18',NULL,'1234','Jalandhar','2025-10-19 18:43:59','keerthitummala499@gmail.com'),('canteen2','Delhi Canteen','1234','Delhi','2025-10-19 15:42:04','canteen2@example.com'),('canteen26',NULL,'1234','kolkatha','2025-11-03 16:57:36','saju@gmail.com'),('canteen2626',NULL,'1234','ongole','2025-11-03 16:58:34','aymar131221@gmail.com'),('canteen3',NULL,'1234','bengaluru','2025-10-19 15:49:14',NULL),('canteen4','Central Army Canteen Delhi','1234','Delhi','2025-10-19 16:40:36','canteen3@gmail.com'),('canteen7',NULL,'1234','Pune','2025-10-19 18:26:30',NULL);
/*!40000 ALTER TABLE `canteens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `canteen_id` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `quantity` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `category` varchar(100) NOT NULL DEFAULT 'General',
  `stock` int NOT NULL DEFAULT '0',
  `image` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `canteen_id` (`canteen_id`),
  CONSTRAINT `items_ibfk_1` FOREIGN KEY (`canteen_id`) REFERENCES `canteens` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (16,'canteen1','onions',NULL,20.00,0,'2025-10-19 16:16:21','kitchen',1,'','Mumbai'),(17,'canteen001','Toothpaste','Premium toothpaste 100g',50.00,0,'2025-10-19 16:53:10','toiletries',100,'','Delhi Cantonment, New Delhi - 110010'),(19,'canteen001','Notebook','A4 size ruled notebook',30.00,0,'2025-10-19 16:53:10','Stationery',200,NULL,'Delhi Cantonment, New Delhi - 110010'),(20,'canteen001','Wrist Watch','Analog army watch',2500.00,0,'2025-10-19 16:53:10','electronic devices',7,'','Delhi Cantonment, New Delhi - 110010'),(21,'canteen001','Coffee Powder','Instant coffee 100g',150.00,0,'2025-10-19 16:53:10','Food & Beverages',80,NULL,'Delhi Cantonment, New Delhi - 110010'),(22,'canteen002','Sweets Box','Traditional Bengali sweets',500.00,0,'2025-10-19 16:53:10','Food & Beverages',30,NULL,'Fort William, Kolkata - 700021'),(23,'canteen002','Soap','Luxury bath soap',60.00,0,'2025-10-19 16:53:10','Toiletries',150,NULL,'Fort William, Kolkata - 700021'),(24,'canteen002','Pen Set','Blue ink pens, pack of 10',120.00,0,'2025-10-19 16:53:10','Stationery',100,NULL,'Fort William, Kolkata - 700021'),(25,'canteen002','Wall Clock','Analog decorative clock',800.00,0,'2025-10-19 16:53:10','Watches',15,NULL,'Fort William, Kolkata - 700021'),(26,'canteen003','Spices Pack','Assorted spices 250g',200.00,0,'2025-10-19 16:53:10','Food & Beverages',100,NULL,'Pune Cantonment, Maharashtra - 411001'),(27,'canteen003','Hand Soap','Herbal hand soap',75.00,0,'2025-10-19 16:53:10','Toiletries',80,NULL,'Pune Cantonment, Maharashtra - 411001'),(28,'canteen003','Notebook','Ruled notebook A5',25.00,0,'2025-10-19 16:53:10','Stationery',150,NULL,'Pune Cantonment, Maharashtra - 411001'),(29,'canteen004','Paneer','Fresh cottage cheese 500g',300.00,0,'2025-10-19 16:53:10','Food & Beverages',50,NULL,'Chandimandir Cantonment, Haryana - 134107'),(30,'canteen004','Milk Pack','1 litre full cream milk',60.00,0,'2025-10-19 16:53:10','Food & Beverages',100,NULL,'Chandimandir Cantonment, Haryana - 134107'),(31,'canteen004','Shampoo','Herbal shampoo 200ml',120.00,0,'2025-10-19 16:53:10','Toiletries',60,NULL,'Chandimandir Cantonment, Haryana - 134107'),(32,'canteen005','Kashmiri Shawl','Woollen winter shawl',1500.00,0,'2025-10-19 16:53:10','General',25,NULL,'Udhampur Cantonment, J&K - 182101'),(33,'canteen005','Dry Fruits Pack','Almonds, Cashews 250g',600.00,0,'2025-10-19 16:53:10','Food & Beverages',40,NULL,'Udhampur Cantonment, J&K - 182101'),(34,'canteen006','Sweets Box','Awadhi traditional sweets',450.00,0,'2025-10-19 16:53:10','Food & Beverages',50,NULL,'Lucknow Cantonment, UP - 226002'),(35,'canteen006','Spices Pack','Traditional spices 200g',150.00,0,'2025-10-19 16:53:10','Food & Beverages',70,NULL,'Lucknow Cantonment, UP - 226002'),(36,'canteen006','Toothpaste','100g tube',50.00,0,'2025-10-19 16:53:10','Toiletries',120,NULL,'Lucknow Cantonment, UP - 226002'),(37,'canteen001','Toothpaste','Premium herbal toothpaste 100g',50.00,0,'2025-10-19 16:54:00','Toiletries',100,NULL,'Delhi Cantonment, New Delhi - 110010'),(39,'canteen001','Soap','Antibacterial soap 75g',60.00,0,'2025-10-19 16:54:00','Toiletries',150,NULL,'Delhi Cantonment, New Delhi - 110010'),(40,'canteen001','Hand Sanitizer','100ml gel sanitizer',80.00,0,'2025-10-19 16:54:00','Toiletries',120,NULL,'Delhi Cantonment, New Delhi - 110010'),(43,'canteen001','Pen Set','Blue ink pens pack of 10',100.00,0,'2025-10-19 16:54:00','Stationery',150,NULL,'Delhi Cantonment, New Delhi - 110010'),(44,'canteen001','Pencil','HB pencils pack of 12',40.00,0,'2025-10-19 16:54:00','Stationery',180,NULL,'Delhi Cantonment, New Delhi - 110010'),(46,'canteen001','Wrist Watch','Analog army watch',2500.00,0,'2025-10-19 16:54:00','Watches',20,NULL,'Delhi Cantonment, New Delhi - 110010'),(47,'canteen001','Digital Watch','Military digital watch',3000.00,0,'2025-10-19 16:54:00','Watches',15,NULL,'Delhi Cantonment, New Delhi - 110010'),(48,'canteen001','Coffee Powder','Instant coffee 100g',150.00,0,'2025-10-19 16:54:00','Food & Beverages',80,NULL,'Delhi Cantonment, New Delhi - 110010'),(49,'canteen001','Tea Powder','Premium Assam tea 100g',120.00,0,'2025-10-19 16:54:00','Food & Beverages',100,NULL,'Delhi Cantonment, New Delhi - 110010'),(50,'canteen001','Chocolates','Assorted chocolate pack',200.00,0,'2025-10-19 16:54:00','Food & Beverages',60,NULL,'Delhi Cantonment, New Delhi - 110010'),(51,'canteen001','Energy Drink','250ml bottle',120.00,0,'2025-10-19 16:54:00','Food & Beverages',90,NULL,'Delhi Cantonment, New Delhi - 110010'),(52,'canteen001','First Aid Kit','Basic first aid kit',500.00,0,'2025-10-19 16:54:00','General',30,NULL,'Delhi Cantonment, New Delhi - 110010'),(53,'canteen001','Flashlight','LED torch',300.00,0,'2025-10-19 16:54:00','General',50,NULL,'Delhi Cantonment, New Delhi - 110010'),(54,'canteen001','Water Bottle','1L metal bottle',250.00,0,'2025-10-19 16:54:00','General',100,NULL,'Delhi Cantonment, New Delhi - 110010'),(55,'canteen001','Backpack','Army green backpack',800.00,0,'2025-10-19 16:54:00','General',40,NULL,'Delhi Cantonment, New Delhi - 110010'),(56,'canteen001','Premium Soap','Luxury hand soap',50.00,100,'2025-10-19 17:04:31','toiletries',100,NULL,'Delhi Cantonment'),(57,'canteen001','Coffee Powder','Instant coffee 100g',150.00,50,'2025-10-19 17:04:31','food',50,NULL,'Delhi Cantonment'),(58,'canteen002','Notebook','College ruled notebook',30.00,200,'2025-10-19 17:04:31','stationery',200,NULL,'Fort William, Kolkata'),(59,'canteen002','Tea Bags','Premium Assam Tea',120.00,80,'2025-10-19 17:04:31','food',80,NULL,'Fort William, Kolkata'),(60,'canteen003','Wrist Watch','Analog wrist watch',1200.00,20,'2025-10-19 17:04:31','watches',20,NULL,'Pune Cantonment'),(61,'canteen003','Cooking Oil','Sunflower oil 1L',200.00,50,'2025-10-19 17:04:31','household',50,NULL,'Pune Cantonment'),(62,'canteen001','Broom Stick',NULL,30.00,0,'2025-10-20 04:25:03','household',2,'','Delhi Cantonment, New Delhi - 110010'),(63,'canteen001','onions',NULL,20.00,0,'2025-10-20 11:13:58','kitchen',10,'','Delhi Cantonment, New Delhi - 110010'),(64,'canteen001','potatoes',NULL,50.00,0,'2025-10-20 11:15:20','kitchen',12,'','Delhi Cantonment, New Delhi - 110010'),(65,'canteen001','milk',NULL,35.00,0,'2025-10-20 11:26:47','kitchen',1,'','Delhi Cantonment, New Delhi - 110010'),(66,'canteen001','lenovo laptop',NULL,50000.00,0,'2025-10-20 11:33:56','laptops',2,'','Delhi Cantonment, New Delhi - 110010'),(68,'canteen10','Books','',30.00,0,'2025-10-24 09:24:10','stationery',10,'','Guntur'),(69,'canteen10','Harpic','Red for Toilet and Blue for Bathroom',50.00,0,'2025-10-24 09:25:10','toiletries',40,'','Guntur'),(70,'Canteen001','Harpic','Red for Toilet and Blue for BathRoom',100.00,0,'2025-10-24 09:27:57','toiletries',30,'','Delhi Cantonment, New Delhi - 110010'),(72,'canteen001','saree','draped in elagance',1500.00,0,'2025-11-03 16:56:14','clothes',10,'','Delhi Cantonment, New Delhi - 110010');
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `card_number` varchar(255) DEFAULT NULL,
  `pin` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `category` varchar(50) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `otp` varchar(10) DEFAULT NULL,
  `otp_expires` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `card_number` (`card_number`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'saju','12345678','123','delhi','',NULL,NULL,NULL),(2,'shajida','0987654321','890','bengaluru','',NULL,NULL,NULL),(3,'janu','098765','1234','mumbai','',NULL,NULL,NULL),(4,'Major Shajida','1234567890123456','1234','mumbai','',NULL,NULL,NULL),(5,'Major Mahesh','1234123412341234','1234','bengaluru','','shaikshajida2727@gmail.com',NULL,NULL),(6,'Capt. Rohan Sharma','1122334455667788','1234','lucknow','','shaikshajida2727@gmail.com',NULL,NULL),(7,'Col . Rajesh Mehta','1111222233334444','1234','kolkata','','shaikshajida2727@gmail.com',NULL,NULL),(8,'Mrs Sushma Devi','8888999988889999','1234','pune','','shaikshajida2727@gmail.com',NULL,NULL),(9,'Sgt . Kumar','6666777766667777','1234','kolkata','','shaikshajida2727@gmail.com',NULL,NULL),(10,'Jahnavi','9440553434905107','1234','pune','','vanterujahnavi@gmail.com','902942',1762189617892),(11,'Major Santhosh','0987654321098765','1234','kolkata','','shaikshajida2727@gmail.com',NULL,NULL),(12,'Major Mukundh','1616161616161616','1234','kerala','','shaikshajida2727@gmail.com',NULL,NULL),(13,'varun','9490108386123456','7014','ongole','','o210692@rguktong.ac.in',NULL,NULL),(14,'Major Jahnavi','0000000000111111','1234','kerala','','vanterujahnavi@gmail.com','902942',1762189617892),(15,'Ramesh','0909090909090909','1234','pune','','shaikshajida2727@gmail.com',NULL,NULL),(16,'Omar','1234567812345678','1234','lucknow','','shaikshajida2727@gmail.com',NULL,NULL),(17,'Nathenal','1111111122222222','1234','kerala','Colonel','shaikshajida2727@gmail.com',NULL,NULL),(18,'Jaanu','1234567890567890','1234','Pune','Major','janu@gmail.com',NULL,NULL),(19,'Supriya','6304076881630407','1234','pune','Other','supriyapuppalla@gmail.com',NULL,NULL),(20,'ramya','0000000000000000','1234','andhrapradesh','Lieutenant','saju@gmail.com',NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-11-11 14:04:48
