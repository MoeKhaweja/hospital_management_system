<?php
// FILEPATH: /C:/xampp/htdocs/hospital_management_system/backend/signup.php
include("connection.php");

// Receive JSON data from the request body
$data = json_decode(file_get_contents("php://input"), true);

// Check if data is received and set variables
if (isset($data['email'], $data['password'], $data['userType'], $data['name'], $data['gender'], $data['phoneNumber'])) {
    $email = $data['email'];
    $password = $data['password'];
    $userType = $data['userType'];
    $name = $data['name'];
    $gender = $data['gender'];
    $phoneNumber = $data['phoneNumber'];}

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$sql = "INSERT INTO users (email, password, role, name, gender, phone) VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssss", $email, $hashedPassword, $userType, $name, $gender, $phoneNumber);

if ($stmt->execute()) {
    echo "User signed up successfully";
} else {
    echo "Error signing up user: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
