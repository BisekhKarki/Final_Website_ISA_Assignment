<?php
    // Database connection parameters
    $server = "localhost";
    $user = "root"; // MySQL username
    $pass = ""; // MySQL password
    $db = "weather"; // Database name

    // Read and decode JSON data from the HTTP request
    $data = json_decode(file_get_contents("php://input"));

    // Check if JSON data is valid
    if ($data === null) {
        echo "Error: Invalid JSON data";
        exit;
    }

    // Create a database connection
    $con = new mysqli($server, $user, $pass, $db);

    // Check if the connection was successful or not
    if ($con->connect_error) {
        die("No connection: " . $con->connect_error);
    }

    // Sanitize user input
    $city = isset($data->city) ? $con->real_escape_string($data->city) : '';
    $temperature = isset($data->data->main->temp) ? $data->data->main->temp : null;
    $humidity = isset($data->data->main->humidity) ? $data->data->main->humidity : null;
    $pressure = isset($data->data->main->pressure) ? $data->data->main->pressure : null;
    $wind = isset($data->data->wind->speed) ? $data->data->wind->speed : null;
    $description = isset($data->data->weather[0]->description) ? $data->data->weather[0]->description : '';

    // Check if city data is provided
    if ($city === '') {
        echo "Error: City data not provided";
        exit;
    }

    // Check if data for the same city exists on the current date
    $select = "SELECT * FROM weather_data WHERE city = '$city' AND DATE(date) = CURDATE()";
    $output = $con->query($select);

    if ($output->num_rows > 0) {
        // Data for the same city already exists today
        echo "Data for the same city already exists today";
    } else {
        // Insert the data into the database
        $inserting = "INSERT INTO weather_data (city, date, temperature, humidity, pressure, wind, description)
                      VALUES ('$city', NOW(), '$temperature', '$humidity', '$pressure', '$wind', '$description')";

        if ($con->query($inserting) === TRUE) {
            echo "Data was saved successfully";
        } else {
            echo "Data was not saved";
        }
    }

    // Close the database connection
    $con->close();
?>
