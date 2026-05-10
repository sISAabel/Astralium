-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: astralium
-- ------------------------------------------------------
-- Server version	8.0.46

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
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `type` varchar(100) NOT NULL,
  `date` date NOT NULL,
  `visibility` varchar(255) DEFAULT NULL,
  `points` int DEFAULT '0',
  `status` varchar(50) DEFAULT NULL,
  `description` text,
  `image` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (5,'Lluvia de Meteoros Perseidas','lluvia de meteoros','2026-08-13','Mejor visible en el hemisferio norte',80,'new','Una de las lluvias de estrellas más populares, con hasta 100 meteoros por hora en su pico.','assets/images/meteor-shower.png'),(6,'Eclipse Lunar Parcial','eclipse','2025-09-06','Visible en Europa, África y Asia',100,'new','Solo una parte de la Luna entra en la sombra de la Tierra, creando un efecto oscuro parcial.','assets/images/eclipse.png'),(8,'Lluvia de Meteoros Gemínidas','lluvia de meteoros','2025-12-14','Visible en ambos hemisferios',90,'new','Una de las lluvias más intensas del año, con meteoros brillantes y abundantes.','assets/images/meteor-shower.png'),(9,'Superluna','luna','2025-10-16','Visible en todo el mundo',40,'new','La Luna se verá más grande y brillante de lo habitual debido a su cercanía a la Tierra.','assets/images/default-space.png'),(10,'Cometa Encke','cometa','2027-03-10','Visible con telescopio desde el hemisferio norte',110,'new','Cometa de período corto que puede observarse con telescopios desde ciertas regiones.','assets/images/comet.png'),(11,'Eclipse Lunar Total','eclipse','2026-03-03','Visible en Europa, África y América',120,'new','La Luna adquiere un tono rojizo al entrar completamente en la sombra de la Tierra.','assets/images/eclipse.png'),(12,'Lluvia de Meteoros Delta Acuáridas','lluvia de meteoros','2026-07-29','hemisferio sur  pero también son visibles en el hemisferio norte con una tasa de actividad algo más baja',75,'new','Provienen de los restos del cometa 96P/Machholz, un cometa de período corto que orbita alrededor del Sol cada cinco años.  Se especula que este cometa podría tener un origen extrasolar debido a su composición química única. ','assets/images/meteor-shower.png'),(13,'Superluna','luna','2026-05-15','Todo el planeta',25,'new','La superluna es la coincidencia de una luna nueva o llena y el momento en que la Luna está más cerca a La Tierra durante el año. Se le llama perigeo de la Luna al punto de menor distancia entre la Luna y la Tierra. Debido a que la superluna está muy cercana a La Tierra, esta luce aparentemente más brillante y agrandada hasta un 14%','assets/images/moon.png'),(14,'Microluna: Luna de Fresa','luna','2026-06-30','Todo el planeta',25,'new','La Luna se ve aproximadamente un 10% más pequeña y un 9% más tenue que en una superluna, con un diámetro aparente de unos 29,72 minutos de arco (frente a los 31 minutos promedio)','assets/images/moon.png');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-09 19:39:03
