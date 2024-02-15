<?php
    // Establish a database connection
    $con = mysqli_connect("localhost", "root");

    // Check if the connection was successful or not
    if (!$con){
        echo "Database not connected <br>";
    } else {
        echo "Database connected <br>";
    }

    // Create the 'weather' database if it doesn't exist
    $creation = "CREATE DATABASE IF NOT EXISTS weather";
    $databas = $con->query($creation);
    if ($databas) {
        echo "Database created <br>";
    } else {
        echo "Database not created <br>";
    }

    // Select the 'weather' database
    $con->select_db('weather');

    // Check if the database selection was successful
    if (!$con->select_db('weather')) {
        $creation = "CREATE DATABASE IF NOT EXISTS weather";
        $databas = $con->query($creation);
        $con->select_db($databas);
    } else {
        echo "Database selected <br>";
    }

    // Define the SQL query to create the 'weather_data' table
    $tab = "CREATE TABLE IF NOT EXISTS `weather_data` (`id` INT AUTO_INCREMENT PRIMARY KEY, 
    `city` VARCHAR(255) NOT NULL, 
    `date` DATETIME NOT NULL, 
    `temperature` FLOAT NOT NULL,
    `humidity` FLOAT NOT NULL, 
    `pressure` FLOAT NOT NULL,
    `wind` FLOAT NOT NULL,
    `description` VARCHAR(255) NOT NULL
    )";

    // Execute the table creation query
    $table = $con->query($tab);
    if ($table) {
        echo "Table created <br>";
    } else {
        echo "Table not created <br>";
    }
?>

