<?php
// FILEPATH: /C:/xampp/htdocs/hospital_management_system/backend/connection.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$host = "localhost";
$db_user = "root";
$db_pass = null;
$database = "hospital management system (the project)";

// Create connection
$conn = new mysqli($host, $db_user, $db_pass, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

echo "Connected successfully";
?>
