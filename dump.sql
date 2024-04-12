-- MySQL dump 10.13  Distrib 8.0.31, for Linux (x86_64)
--
-- Host: localhost    Database: investnfarmDB
-- ------------------------------------------------------
-- Server version	8.0.31-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `investnfarmDB`
--

-- CREATE DATABASE /*!32312 IF NOT EXISTS*/ `investnfarmDB` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

-- USE `investnfarmDB`;

--
-- Table structure for table `Admins`
--

DROP TABLE IF EXISTS `Admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `Admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `type` varchar(255) DEFAULT 'admin-user',
  `password` varchar(255) DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `admins_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Admins`
--

LOCK TABLES `Admins` WRITE;
/*!40000 ALTER TABLE `Admins` DISABLE KEYS */;
INSERT INTO `Admins` VALUES (1,'Adewusi Adedamola','damola.adewusi@serverpointnig.com','admin-user','$2a$10$f4W1Gfl2M8ezDjnOaasXo.qv3X.c5A9WGCDQXLS6p.P9ou0s7XQ5C',1,'2022-08-17 21:02:12','2022-08-17 21:02:12'),(2,'Adewusi Adedamola','damola.adewusi@gmail.com','admin-user','$2a$10$53TWKk1kNhnUOAaDfDxCb.m3NWhReEU6eeBXzNJsMFEe8TUbyqqIe',1,'2022-08-22 18:59:48','2022-08-22 18:59:48'),(3,'Admin Admin','admin@admin.com','admin-user','$2a$10$3Tml6VFZyQ4bc1ipiHH7duqx1d9kSxcESv9OL7OmsVtOeyn84YVMy',1,'2022-08-23 10:45:52','2022-08-23 10:45:52'),(4,'Akalonu Collins','collinsakalonu@investnfarm.com','admin-user','$2a$10$O621PXAULVhwyfYqs0Mx4up5Za.N57z1kEP7pufXbklcLTZlEEmh2',1,'2022-08-24 19:40:32','2022-08-24 19:40:32'),(5,'Adewusi Adedamola','damola@investnfarm.com','admin-user','$2a$10$12zvEMUD1k3qEw/cR6wYtu0Zvg/0LxrsR/8eHVxrCNM8WkMEn6UCe',1,'2022-09-02 09:49:31','2022-09-02 09:49:31');
/*!40000 ALTER TABLE `Admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Countries`
--

DROP TABLE IF EXISTS `Countries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `Countries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `dial_code` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=243 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Countries`
--

LOCK TABLES `Countries` WRITE;
/*!40000 ALTER TABLE `Countries` DISABLE KEYS */;
INSERT INTO `Countries` VALUES (1,'Afghanistan','+93','AF'),(2,'Aland Islands','+358','AX'),(3,'Albania','+355','AL'),(4,'Algeria','+213','DZ'),(5,'AmericanSamoa','+1684','AS'),(6,'Andorra','+376','AD'),(7,'Angola','+244','AO'),(8,'Anguilla','+1264','AI'),(9,'Antarctica','+672','AQ'),(10,'Antigua and Barbuda','+1268','AG'),(11,'Argentina','+54','AR'),(12,'Armenia','+374','AM'),(13,'Aruba','+297','AW'),(14,'Australia','+61','AU'),(15,'Austria','+43','AT'),(16,'Azerbaijan','+994','AZ'),(17,'Bahamas','+1242','BS'),(18,'Bahrain','+973','BH'),(19,'Bangladesh','+880','BD'),(20,'Barbados','+1246','BB'),(21,'Belarus','+375','BY'),(22,'Belgium','+32','BE'),(23,'Belize','+501','BZ'),(24,'Benin','+229','BJ'),(25,'Bermuda','+1441','BM'),(26,'Bhutan','+975','BT'),(27,'Bolivia, Plurinational State of','+591','BO'),(28,'Bosnia and Herzegovina','+387','BA'),(29,'Botswana','+267','BW'),(30,'Brazil','+55','BR'),(31,'British Indian Ocean Territory','+246','IO'),(32,'Brunei Darussalam','+673','BN'),(33,'Bulgaria','+359','BG'),(34,'Burkina Faso','+226','BF'),(35,'Burundi','+257','BI'),(36,'Cambodia','+855','KH'),(37,'Cameroon','+237','CM'),(38,'Canada','+1','CA'),(39,'Cape Verde','+238','CV'),(40,'Cayman Islands','+ 345','KY'),(41,'Central African Republic','+236','CF'),(42,'Chad','+235','TD'),(43,'Chile','+56','CL'),(44,'China','+86','CN'),(45,'Christmas Island','+61','CX'),(46,'Cocos (Keeling) Islands','+61','CC'),(47,'Colombia','+57','CO'),(48,'Comoros','+269','KM'),(49,'Congo','+242','CG'),(50,'Congo, The Democratic Republic of the Congo','+243','CD'),(51,'Cook Islands','+682','CK'),(52,'Costa Rica','+506','CR'),(53,'Cote d\'Ivoire','+225','CI'),(54,'Croatia','+385','HR'),(55,'Cuba','+53','CU'),(56,'Cyprus','+357','CY'),(57,'Czech Republic','+420','CZ'),(58,'Denmark','+45','DK'),(59,'Djibouti','+253','DJ'),(60,'Dominica','+1767','DM'),(61,'Dominican Republic','+1849','DO'),(62,'Ecuador','+593','EC'),(63,'Egypt','+20','EG'),(64,'El Salvador','+503','SV'),(65,'Equatorial Guinea','+240','GQ'),(66,'Eritrea','+291','ER'),(67,'Estonia','+372','EE'),(68,'Ethiopia','+251','ET'),(69,'Falkland Islands (Malvinas)','+500','FK'),(70,'Faroe Islands','+298','FO'),(71,'Fiji','+679','FJ'),(72,'Finland','+358','FI'),(73,'France','+33','FR'),(74,'French Guiana','+594','GF'),(75,'French Polynesia','+689','PF'),(76,'Gabon','+241','GA'),(77,'Gambia','+220','GM'),(78,'Georgia','+995','GE'),(79,'Germany','+49','DE'),(80,'Ghana','+233','GH'),(81,'Gibraltar','+350','GI'),(82,'Greece','+30','GR'),(83,'Greenland','+299','GL'),(84,'Grenada','+1473','GD'),(85,'Guadeloupe','+590','GP'),(86,'Guam','+1671','GU'),(87,'Guatemala','+502','GT'),(88,'Guernsey','+44','GG'),(89,'Guinea','+224','GN'),(90,'Guinea-Bissau','+245','GW'),(91,'Guyana','+595','GY'),(92,'Haiti','+509','HT'),(93,'Holy See (Vatican City State)','+379','VA'),(94,'Honduras','+504','HN'),(95,'Hong Kong','+852','HK'),(96,'Hungary','+36','HU'),(97,'Iceland','+354','IS'),(98,'India','+91','IN'),(99,'Indonesia','+62','ID'),(100,'Iran, Islamic Republic of Persian Gulf','+98','IR'),(101,'Iraq','+964','IQ'),(102,'Ireland','+353','IE'),(103,'Isle of Man','+44','IM'),(104,'Israel','+972','IL'),(105,'Italy','+39','IT'),(106,'Jamaica','+1876','JM'),(107,'Japan','+81','JP'),(108,'Jersey','+44','JE'),(109,'Jordan','+962','JO'),(110,'Kazakhstan','+77','KZ'),(111,'Kenya','+254','KE'),(112,'Kiribati','+686','KI'),(113,'Korea, Democratic People\'s Republic of Korea','+850','KP'),(114,'Korea, Republic of South Korea','+82','KR'),(115,'Kuwait','+965','KW'),(116,'Kyrgyzstan','+996','KG'),(117,'Laos','+856','LA'),(118,'Latvia','+371','LV'),(119,'Lebanon','+961','LB'),(120,'Lesotho','+266','LS'),(121,'Liberia','+231','LR'),(122,'Libyan Arab Jamahiriya','+218','LY'),(123,'Liechtenstein','+423','LI'),(124,'Lithuania','+370','LT'),(125,'Luxembourg','+352','LU'),(126,'Macao','+853','MO'),(127,'Macedonia','+389','MK'),(128,'Madagascar','+261','MG'),(129,'Malawi','+265','MW'),(130,'Malaysia','+60','MY'),(131,'Maldives','+960','MV'),(132,'Mali','+223','ML'),(133,'Malta','+356','MT'),(134,'Marshall Islands','+692','MH'),(135,'Martinique','+596','MQ'),(136,'Mauritania','+222','MR'),(137,'Mauritius','+230','MU'),(138,'Mayotte','+262','YT'),(139,'Mexico','+52','MX'),(140,'Micronesia, Federated States of Micronesia','+691','FM'),(141,'Moldova','+373','MD'),(142,'Monaco','+377','MC'),(143,'Mongolia','+976','MN'),(144,'Montenegro','+382','ME'),(145,'Montserrat','+1664','MS'),(146,'Morocco','+212','MA'),(147,'Mozambique','+258','MZ'),(148,'Myanmar','+95','MM'),(149,'Namibia','+264','NA'),(150,'Nauru','+674','NR'),(151,'Nepal','+977','NP'),(152,'Netherlands','+31','NL'),(153,'Netherlands Antilles','+599','AN'),(154,'New Caledonia','+687','NC'),(155,'New Zealand','+64','NZ'),(156,'Nicaragua','+505','NI'),(157,'Niger','+227','NE'),(158,'Nigeria','+234','NG'),(159,'Niue','+683','NU'),(160,'Norfolk Island','+672','NF'),(161,'Northern Mariana Islands','+1670','MP'),(162,'Norway','+47','NO'),(163,'Oman','+968','OM'),(164,'Pakistan','+92','PK'),(165,'Palau','+680','PW'),(166,'Palestinian Territory, Occupied','+970','PS'),(167,'Panama','+507','PA'),(168,'Papua New Guinea','+675','PG'),(169,'Paraguay','+595','PY'),(170,'Peru','+51','PE'),(171,'Philippines','+63','PH'),(172,'Pitcairn','+872','PN'),(173,'Poland','+48','PL'),(174,'Portugal','+351','PT'),(175,'Puerto Rico','+1939','PR'),(176,'Qatar','+974','QA'),(177,'Romania','+40','RO'),(178,'Russia','+7','RU'),(179,'Rwanda','+250','RW'),(180,'Reunion','+262','RE'),(181,'Saint Barthelemy','+590','BL'),(182,'Saint Helena, Ascension and Tristan Da Cunha','+290','SH'),(183,'Saint Kitts and Nevis','+1869','KN'),(184,'Saint Lucia','+1758','LC'),(185,'Saint Martin','+590','MF'),(186,'Saint Pierre and Miquelon','+508','PM'),(187,'Saint Vincent and the Grenadines','+1784','VC'),(188,'Samoa','+685','WS'),(189,'San Marino','+378','SM'),(190,'Sao Tome and Principe','+239','ST'),(191,'Saudi Arabia','+966','SA'),(192,'Senegal','+221','SN'),(193,'Serbia','+381','RS'),(194,'Seychelles','+248','SC'),(195,'Sierra Leone','+232','SL'),(196,'Singapore','+65','SG'),(197,'Slovakia','+421','SK'),(198,'Slovenia','+386','SI'),(199,'Solomon Islands','+677','SB'),(200,'Somalia','+252','SO'),(201,'South Africa','+27','ZA'),(202,'South Sudan','+211','SS'),(203,'South Georgia and the South Sandwich Islands','+500','GS'),(204,'Spain','+34','ES'),(205,'Sri Lanka','+94','LK'),(206,'Sudan','+249','SD'),(207,'Suriname','+597','SR'),(208,'Svalbard and Jan Mayen','+47','SJ'),(209,'Swaziland','+268','SZ'),(210,'Sweden','+46','SE'),(211,'Switzerland','+41','CH'),(212,'Syrian Arab Republic','+963','SY'),(213,'Taiwan','+886','TW'),(214,'Tajikistan','+992','TJ'),(215,'Tanzania, United Republic of Tanzania','+255','TZ'),(216,'Thailand','+66','TH'),(217,'Timor-Leste','+670','TL'),(218,'Togo','+228','TG'),(219,'Tokelau','+690','TK'),(220,'Tonga','+676','TO'),(221,'Trinidad and Tobago','+1868','TT'),(222,'Tunisia','+216','TN'),(223,'Turkey','+90','TR'),(224,'Turkmenistan','+993','TM'),(225,'Turks and Caicos Islands','+1649','TC'),(226,'Tuvalu','+688','TV'),(227,'Uganda','+256','UG'),(228,'Ukraine','+380','UA'),(229,'United Arab Emirates','+971','AE'),(230,'United Kingdom','+44','GB'),(231,'United States','+1','US'),(232,'Uruguay','+598','UY'),(233,'Uzbekistan','+998','UZ'),(234,'Vanuatu','+678','VU'),(235,'Venezuela, Bolivarian Republic of Venezuela','+58','VE'),(236,'Vietnam','+84','VN'),(237,'Virgin Islands, British','+1284','VG'),(238,'Virgin Islands, U.S.','+1340','VI'),(239,'Wallis and Futuna','+681','WF'),(240,'Yemen','+967','YE'),(241,'Zambia','+260','ZM'),(242,'Zimbabwe','+263','ZW');
/*!40000 ALTER TABLE `Countries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `InvestmentCategories`
--

DROP TABLE IF EXISTS `InvestmentCategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `InvestmentCategories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) NOT NULL,
  `about` text,
  `benefits` text,
  `model` text,
  `photo_url` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'Available',
  `deleted` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `InvestmentCategories`
--

LOCK TABLES `InvestmentCategories` WRITE;
/*!40000 ALTER TABLE `InvestmentCategories` DISABLE KEYS */;
INSERT INTO `InvestmentCategories` VALUES (1,'Cassava Farming','Cassava is the third-largest source of food carbohydrates in the tropics, after rice and maize. Cassava is a major staple food in the developing world, providing a basic diet for over half a billion people. It is one of the most drought-tolerant crops, capable of growing on marginal soils. Nigeria is the world\'s largest producer of cassava, while Thailand is the largest exporter of cassava starch.\r\nThe cassava root is long and tapered, with a firm, homogeneous flesh encased in a detachable rind, about 1 mm thick, rough, and brown on the outside. Cassava is a calorie-rich vegetable that contains plenty of carbohydrates and key vitamins and minerals. Cassava is a good source of vitamin C, thiamine, riboflavin, and niacin. The leaves, which are also edible if a person cooks them or dries them in the sun, can contain up to 25% protein.\r\nCassava is a versatile, flavorful food and an important source of nutrients and energy, particularly in the tropics.\r\nCassava is like yams and taro, and people can use it in similar ways to a potato. It is possible to use tapioca starch to make gluten-free baked goods. It can be a beneficial addition to the diet.\r\n                                       ','[\"Cassava is a source of resistant starch, which scientists suggest can boost a person’s gut health by helping nurture beneficial gut bacteria.\",\"Boosts energy and improves brain function, lowers blood pressure, makes you less prone to diseases, good for the Eyes, good for your digestive system.\",\"Maintains healthy muscles, beneficial for nerve health. \"]','   We have chosen an accessible well-drained fertile soil farm in Ibadan and Lusada in Nigeria, using the best good agronomic practices and management.\r\nThere are several varieties of cassava stamps and we have chosen\r\n“TMS 30572, NR 8082, NR8083, TMS 4(2) 1425 “for their high yield and processing quality.\r\n      ','portfolio_photos/324942986.jpeg','Available',0,'2022-08-18 05:18:11','2022-08-23 14:15:07'),(2,'Maize Farming','Maize (zea mays) also known as corn is one among the profitable crops in Nigeria, it is a cereal plant of the Gramieae family of grasses that today constitutes the most widely distributed food in the world.\r\nWhen maize cultivation started in Nigeria, it was first cultivated as a subsistence crop, in small quantities for family survival only. As time went on maize farming changed its face and operations from subsistence farming to commercial farming. Today maize is planted in larger(commercial) quantities because of its profitability, economic value and the demand for the crop in the market.\r\n                         ','[\"It prevents haemorrhoids - Corn has 18.4% of the daily recommended dosage of fiber, which means that it is good for your bowel movements. It can help you with various digestive problems like constipation and haemorrhoids and can also protect you from getting colon cancer.\",\"It promotes growth - Corn has high amounts of vitamin B constituents, thiamine, and niacin, which is good for facilitating growth. Thiamine helps your body improve nerve health and cognitive functions while niacin can prevent a series of problems like dementia and dermatitis.\",\"It prevents cancer - Corn is also known for preventing cancer. It is a good source of antioxidants. Antioxidants are extremely important as they get rid of the free radicals in your system. The build-up of free radicals is what often leads to cancer. Furthermore, corn is also known for the ability to induce apoptosis in cancer cells and leaving the healthy cells unaffected. It also contains phytochemicals, which are also a good source of antioxidants.\"]',' At investnfarm, we have chosen  accessible well-drained fertile soil farm in Ibadan, Oyo State and Lusada, Ogun State in Nigeria, using the best good agronomic practices and management.\r\n  ','portfolio_photos/625071244.jpeg','Available',0,'2022-08-23 14:22:21','2022-08-23 14:27:20'),(3,'Fish Farming','One of the most popular agribusinesses  is fish farming. Fish farming is a common type of aquaculture. Fish farming is highly exploited as it allows the production of a cheap source of protein. Today, the modern farm practice has made it possible to grow fish in the farms and control the input.\r\nFish farming is easier to do than other kinds of farming as fish are not care-intensive, but only require food and proper water conditions as well as temperatures. The process is also less land intensive , even though Catfish is not the most popular fish in Nigeria, this fish species is by far the most cultivated in Nigeria. One thing good about catfish is that it is one of the easiest fish species to cultivate. So, people naturally flow in the direction of fish species they found to be the easiest to cultivate.\r\nIf you are thinking of a business to start now, I recommend you start Catfish Farming. If you are an existing farmer and you are looking to expand your farm capacity, I’d encourage you to add fish farming to your line of business. Fish farming (especially catfish) is most compatible with poultry farming as you can use the poultry drops to produce the feed for your fish.\r\n','[\"Fish is Popular Fishery products are by far the most popular animal products in the market, constituting more than 60% of meat produced in the Nigerian market.\",\"Fish is a Source of Protein Fish is one of the highest sources of protein. It is a low-fat high-quality protein that is filled with omega-3 fatty acids and vitamins such as D and B2 (riboflavin). Fish is also very rich in calcium and phosphorus and is equally a great source of minerals, such as iron, zinc, iodine, magnesium, and potassium.\",\"Fish Sells Quick Fish sells faster than any other animal products in the market and is relatively cheaper than meat, making it the number one choice when it comes to affordability.\",\"Fish Matures Quickly Fish grows very fast as practices in fish farming make it possible for farmers to increase the fastness of their fish growth by giving them certain feeds, ensuring that you harvest and sell within a short period of time.\",\"Fish Contains Omega-3 Fish is the biggest source of Omega-3 fatty acids which is extremely beneficial to the human heart; Omega-3 helps to keep our heart and brain very healthy. Since the human body doesn’t produce Omega-3 fatty acids, the only source through which we can get it is by what we eat, that is where fish comes to the rescue.\",\"Fish Farming is Profitable Fish farming is very profitable. With proper planning and good management, N3 million investment in fish farming could easily result in N4 million of pure profit within six months.\",\"No Environmental Hazard Fish farming does not cause any environmental hazard. Unlike poultry farming, you can set up a fish farm anywhere, including residential areas. If you have a spacious compound, you can easily set up a small fish farm within your backyard without any regulatory precautions.\"]','   ','portfolio_photos/853207632.jpeg','Available',0,'2022-08-23 14:31:54','2022-08-23 14:31:54'),(4,'Rice Farming','Rice (Oryza sativa) is the seed of a cereal grass. It’s one of the most important dietary carbohydrates in the world, with over half the global population depending on it. Typically boiled or steamed, rice can also be ground into a gluten-free flour. It has been around for over 3000 years in many parts of Africa and is seen as an essential food.  Just over 57% of rice been consumed in Nigeria on a yearly basis is produced locally. Rice is seen to generate the most income for Nigerian farmers compared to other cash crops in the country. As the population continues to grow in Nigeria, this will result in a growing rice market.\r\n','[\" May help maintain a healthy weight.\",\"Brown rice protects against chronic disease.\",\"Supports energy and restores glycogen levels after exercise.\",\"Easy on the digestive system.\",\"Rich in vitamins and minerals like calcium and iron\",\"It\'s a gluten-free grain.\"]','   Our model under rice\r\n·        Source farm\r\n·        Plant crop\r\n·        Full crop cycle care\r\n·        Harvest and store\r\n·        Marketing\r\n·        Investors pay out\r\n','portfolio_photos/685101740.jpeg','Available',0,'2022-08-23 14:35:04','2022-08-23 14:35:04'),(5,'Pig Farm','Pig farming (also known as piggery) is becoming increasingly popular in Africa. It is a very lucrative branch in farming that can give investors a return on investment within a short space of time. Pigs can easily adapt to most environmental conditions as long as they have a proper ventilation and housing fences. They have a high resistance to diseases and adapt easily to most environments. This makes it possible for pigs to be raised on both a small and large scale. Due to this adaptability, pigs make great candidates for intensified or diversified agriculture that fits a wide range of budgets. As part of its value-addition drive, Invest”N”Farm is into commercial processing and marketing of pigs.\r\n','[\"Fast growth rates\",\"Good feed-to-meat conversion ratios\",\"Relatively easy to raise,\",\"Prolific breeding potential\",\"Pig waste makes good fertilizer for crops and can also be recycled into livestock feeds.\"]','   Our model\r\n·        Pig sourcing and care\r\n·        Housing\r\n·        Care and maintenance\r\n·        Abattoir and storage\r\n·        Production and processing of pork meat\r\n·        Marketing of produce\r\n','portfolio_photos/443269646.jpeg','Available',0,'2022-08-23 14:37:56','2022-08-23 14:37:56');
/*!40000 ALTER TABLE `InvestmentCategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Investments`
--

DROP TABLE IF EXISTS `Investments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `Investments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `investment_name` varchar(255) NOT NULL,
  `unit_cost` int NOT NULL,
  `country` varchar(255) NOT NULL,
  `period` int DEFAULT NULL,
  `units` int DEFAULT NULL,
  `roi` int DEFAULT NULL,
  `photo_url` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'avaliable',
  `deleted` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `InvestmentCategoryId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `InvestmentCategoryId` (`InvestmentCategoryId`),
  CONSTRAINT `Investments_ibfk_1` FOREIGN KEY (`InvestmentCategoryId`) REFERENCES `InvestmentCategories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Investments`
--

LOCK TABLES `Investments` WRITE;
/*!40000 ALTER TABLE `Investments` DISABLE KEYS */;
INSERT INTO `Investments` VALUES (1,'Cassava',50000,'Ibadan & Lagos, Nigeria',8,2500,15,NULL,'avaliable',1,'2022-08-18 05:25:06','2022-08-18 05:26:30',1),(2,'Cassava',50000,'Ibadan & Lagos, Nigeria',12,2500,13,NULL,'avaliable',1,'2022-08-18 05:33:36','2022-08-18 05:41:05',1),(3,'Cassava',50000,'Ibadan & Lagos, Nigeria',12,2500,15,'portfolio_photos/824659573.jpeg','avaliable',0,'2022-08-23 11:07:11','2022-08-23 14:38:55',1),(4,'Fish',100000,'Lagos, Nigeria',6,1000,14,'portfolio_photos/280031806.jpeg','avaliable',0,'2022-08-23 14:41:35','2022-08-23 14:41:35',3),(5,'Maize',50000,'Ibadan & Lagos, Nigeria',4,2000,20,'portfolio_photos/584517827.jpeg','avaliable',0,'2022-08-23 14:45:02','2022-08-23 14:45:02',2);
/*!40000 ALTER TABLE `Investments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Payments`
--

DROP TABLE IF EXISTS `Payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `Payments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `investmentId` int DEFAULT NULL,
  `gateway` varchar(255) DEFAULT 'Flutterwave',
  `reference` varchar(255) NOT NULL,
  `amount` int NOT NULL,
  `transaction_id` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `investmentId` (`investmentId`),
  CONSTRAINT `Payments_ibfk_13` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`),
  CONSTRAINT `Payments_ibfk_14` FOREIGN KEY (`investmentId`) REFERENCES `Investments` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Payments`
--

LOCK TABLES `Payments` WRITE;
/*!40000 ALTER TABLE `Payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `Payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20210907171857-create-user.js'),('20210916141209-create-admin.js'),('20210929113544-create-investment.js'),('20211001073228-create-userInvestment.js'),('20211016134624-create-payment.js'),('20211022121947-create-transaction.js'),('20211022203211-create-withdrawal.js'),('20211116190010-create-country.js'),('20211124215925-create-investment-category.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Transactions`
--

DROP TABLE IF EXISTS `Transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `Transactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `investment_id` int DEFAULT NULL,
  `payment_id` int DEFAULT NULL,
  `reference` varchar(255) DEFAULT NULL,
  `withdrawal_id` int DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  `amount` int NOT NULL,
  `status` varchar(255) DEFAULT 'pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `investment_id` (`investment_id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `Transactions_ibfk_13` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `Transactions_ibfk_14` FOREIGN KEY (`investment_id`) REFERENCES `Investments` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `Transactions_ibfk_15` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Transactions`
--

LOCK TABLES `Transactions` WRITE;
/*!40000 ALTER TABLE `Transactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `Transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserInvestments`
--

DROP TABLE IF EXISTS `UserInvestments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `UserInvestments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `UserId` int DEFAULT NULL,
  `InvestmentId` int DEFAULT NULL,
  `units` int DEFAULT '1',
  `status` varchar(255) DEFAULT 'pending',
  `deleted` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UserInvestments_UserId_InvestmentId_unique` (`UserId`,`InvestmentId`),
  KEY `InvestmentId` (`InvestmentId`),
  CONSTRAINT `UserInvestments_ibfk_17` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `UserInvestments_ibfk_18` FOREIGN KEY (`InvestmentId`) REFERENCES `Investments` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserInvestments`
--

LOCK TABLES `UserInvestments` WRITE;
/*!40000 ALTER TABLE `UserInvestments` DISABLE KEYS */;
INSERT INTO `UserInvestments` VALUES (1,11,5,1,'pending',0,'2022-09-06 19:17:20','2022-09-06 19:17:20'),(2,12,5,5,'pending',0,'2022-09-06 21:01:23','2022-09-06 21:01:23'),(3,13,5,1,'pending',0,'2022-09-06 21:57:58','2022-09-06 21:57:58'),(4,13,3,1,'pending',0,'2022-09-07 18:44:27','2022-09-07 18:44:27'),(5,14,5,1,'pending',0,'2022-09-07 19:30:28','2022-09-07 19:30:28'),(6,13,4,1,'pending',0,'2022-09-11 19:37:19','2022-09-11 19:37:19');
/*!40000 ALTER TABLE `UserInvestments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(255) NOT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `age_group` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `active` tinyint(1) DEFAULT '0',
  `status` varchar(255) DEFAULT 'Inactive',
  `deleted` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email` (`email`),
  UNIQUE KEY `users_phone` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'Adeolu Adewusi','Male','Gen Z','damola.adewusi@gmail.com','(+234)8184380439','Nigeria','$2a$10$eGdk4PHNih5f9zheaf5Nl.ja0GlNgU.UpqHZM9BUwlHKwyXXVRuwq',0,'Inactive',0,'2022-08-19 19:23:25','2022-08-19 19:23:25'),(3,'Damola','Male','WW II','damsy21@yahoo.com','(+234)08184380439','Nigeria','$2a$10$lqwfivk2lYwE/V2x29lEeORpaMKwDWFRm7uNzvbMldducsVnAnmZS',0,'Inactive',0,'2022-08-24 19:42:53','2022-08-24 19:42:53'),(5,'Babatunde','Male','Gen X','techsupport@wofasummit.org','(+234)07019380439','Nigeria','$2a$10$fGN7uvDFUhBF4pvvRQJzp.W791a7v0rTLQ8.cbDtlPLdARBSz.INO',0,'Inactive',0,'2022-09-01 22:34:56','2022-09-01 22:34:56'),(6,'Tester1','Female','Millennials','everythingbadagry@gmail.com','(+234)08068809624','Nigeria','$2a$10$n0q0YyiigNe8j5LmWKlzAe8P7Huy.XHbNgNFPUTkYSKAG6azsBXw.',0,'Inactive',0,'2022-09-01 22:44:23','2022-09-01 22:44:23'),(7,'Dee','Male','Gen X','web_admin@serverpointnig.com','(+234)08344478789','Nigeria','$2a$10$14Jhgvy9I5i24sskSOfppO28LaJy/4.BPcHPVCT1.cnRiC8vCweCy',0,'Inactive',0,'2022-09-02 09:36:16','2022-09-02 09:36:16'),(9,'Olayinka Adewusi','Female','Boomers I','spclouddbase@gmail.com','(+234)11223344567','Nigeria','$2a$10$iGAGt6J0lpfWZwStGKjwvO.1m/78z5MAOwMXfIkLRgVcJiXNYtype',0,'Inactive',0,'2022-09-02 09:45:53','2022-09-02 09:45:53'),(10,'Oladapo Olawore','Female','Gen X','modivi8272@otodir.com','(+234)88765434345','Nigeria','$2a$10$ANKfu76GwKf3jTo86HVX0Ovr1VdWCeO2ALeeO9Ftb61dZSrURGbOy',0,'Active',0,'2022-09-05 13:30:57','2022-09-05 13:32:59'),(11,'Ladi Ade','Male','Millennials','celite7311@laluxy.com','(+234)87654567656','Nigeria','$2a$10$5NI6dA8/Uz5Mh8wfV.mgQ.IDtWjR8nSE8yfMSAFq5LHAyc09qzwu6',0,'Active',0,'2022-09-06 19:16:19','2022-09-06 19:16:45'),(12,'Romana Farai Cindy Munyavi','Female','Millennials','romanazw@yahoo.com','(+44)07468582373','United Kingdom','$2a$10$r3xiWpJilN42fMmav1nhdO3T0fMRmbRtv1VbUBGq1P1VqJ8QL1xGm',0,'Active',0,'2022-09-06 20:57:20','2022-09-06 20:57:53'),(13,'Olu-adeniran oluyemi','Male','Millennials','adeniranoluyemi01@gmail.com','(+44)07306461984','United Kingdom','$2a$10$OORUgevNSNplSbgu5fEuCOTpc3Fr1jTC/gvpZxbOPBWuMrsgOMmDW',0,'Active',0,'2022-09-06 21:55:48','2022-09-06 21:56:31'),(14,'Victorine Nonjang','Female','Millennials','vtazifor@hotmail.com','(+44)07715747545','United Kingdom','$2a$10$R3Z9t0/u5sm/VYQTERxccuJ3jR95C9lulqr0RLzj85a1UaQC9k8jm',0,'Active',0,'2022-09-07 19:23:17','2022-09-07 19:23:59'),(15,'Roz','Female','Millennials','radekunle@investnfarm.com','(+44)7951419385','United Kingdom','$2a$10$NsDn8/JDLJhM76ByMYVkPeu3yMKE5T1Cm62iq6D5j4a0wA2K9Dpyq',0,'Active',0,'2022-09-19 07:17:36','2022-10-26 11:16:37'),(16,'Adebisi Solesi','Female','Millennials','bisisolesi@gmail.com','(+44)7393159880','United Kingdom','$2a$10$gmNenWxv12niuHvcEa0T/ehojFfQg.Zp2hpwGUZFNwilKxzWgxRh.',0,'Active',0,'2022-10-28 21:12:19','2022-10-28 21:13:03'),(17,'joseph jesuorobo','Male','Millennials','jesuorobo9@gmail.com','(+44)07342200230','United Kingdom','$2a$10$xEr8jtcemxxh2dxxMnZz4e9yzKzWucIv294JD3H4Yi4Xk/3uPfwV6',0,'Active',0,'2022-10-29 19:10:17','2022-10-29 22:17:16'),(18,'NufhedjiwidjwjdwihdisjadhuijdaodejguhweikabfdJIDHWIAUFAWFAWHFAAJDIHIjifheifjeifhwodjssfhuiifiwswhdusfi investnfarm.com','1','WW II','g.e.ral.d.k.u.ms.ert@gmail.com','()88755147472','South Georgia and the South Sandwich Islands','$2a$10$oOMBsDbefmB2.mwLJDJh9.ogvbC7DDMoSjgzB6wkIvGxVEydsgmWS',0,'Inactive',0,'2022-11-10 19:20:50','2022-11-10 19:20:50'),(19,'Nkema Obeten','Male','Gen X','nkema.obeten@gmail.com','(+44)7563337028','United Kingdom','$2a$10$RUHQpABRVv5d/AECd3AQ/.DUynEP6ZM5PDJabIxy2tJOkHcZi.EDe',0,'Active',0,'2022-11-10 19:51:54','2022-11-10 19:52:45');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Withdrawals`
--

DROP TABLE IF EXISTS `Withdrawals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `Withdrawals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `bank` varchar(255) NOT NULL,
  `account_name` varchar(255) NOT NULL,
  `account_number` varchar(255) NOT NULL,
  `amount` int NOT NULL,
  `status` varchar(255) DEFAULT 'Pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `Withdrawals_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Withdrawals`
--

LOCK TABLES `Withdrawals` WRITE;
/*!40000 ALTER TABLE `Withdrawals` DISABLE KEYS */;
/*!40000 ALTER TABLE `Withdrawals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `investmentCategories`
--

DROP TABLE IF EXISTS `investmentCategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `investmentCategories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) NOT NULL,
  `about` text,
  `benefits` text,
  `model` text,
  `photo_url` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `investmentCategories`
--

LOCK TABLES `investmentCategories` WRITE;
/*!40000 ALTER TABLE `investmentCategories` DISABLE KEYS */;
/*!40000 ALTER TABLE `investmentCategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `investments`
--

DROP TABLE IF EXISTS `investments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `investments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `investment_name` varchar(255) NOT NULL,
  `about` text,
  `unit_cost` int NOT NULL,
  `country` varchar(255) DEFAULT NULL,
  `period` int DEFAULT NULL,
  `units` int DEFAULT NULL,
  `roi` int DEFAULT NULL,
  `photo_url` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `investments`
--

LOCK TABLES `investments` WRITE;
/*!40000 ALTER TABLE `investments` DISABLE KEYS */;
/*!40000 ALTER TABLE `investments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `transactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `investment_id` int DEFAULT NULL,
  `payment_id` int DEFAULT NULL,
  `reference` varchar(255) DEFAULT NULL,
  `withdrawal_id` int DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  `amount` int NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userInvestments`
--

DROP TABLE IF EXISTS `userInvestments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `userInvestments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `UserId` int DEFAULT NULL,
  `InvestmentId` int DEFAULT NULL,
  `units` int DEFAULT '1',
  `status` varchar(255) DEFAULT 'pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userInvestments`
--

LOCK TABLES `userInvestments` WRITE;
/*!40000 ALTER TABLE `userInvestments` DISABLE KEYS */;
/*!40000 ALTER TABLE `userInvestments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(255) NOT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `withdrawals`
--

DROP TABLE IF EXISTS `withdrawals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `withdrawals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `bank` varchar(255) NOT NULL,
  `account_name` varchar(255) NOT NULL,
  `account_number` varchar(255) NOT NULL,
  `amount` int NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `withdrawals`
--

LOCK TABLES `withdrawals` WRITE;
/*!40000 ALTER TABLE `withdrawals` DISABLE KEYS */;
/*!40000 ALTER TABLE `withdrawals` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-21 14:50:28
