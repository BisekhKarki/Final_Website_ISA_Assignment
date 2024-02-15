<?php 
    //connecting the database to mysql
    $con = mysqli_connect("localhost","root");
    if ($con){
        echo "Database is connected<br>";
    } else {
        echo "Database is not connected<br>";
    }

    // Creating a database in mysql
    $database = "CREATE DATABASE IF NOT EXISTS practic12";
    $created = $con->query($database);
    if (!$created){
        echo "<br>Database is not created<br>";
    } else {
        echo "<br>Database is  created<br>";
    }

?>