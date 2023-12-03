<?php
// FILEPATH: /C:/xampp/htdocs/hospital_management_system/backend/signup.php
include("connection.php");
include("key.php");
require_once('vendor/autoload.php'); // Include the JWT library

use Firebase\JWT\JWT;

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

$sql = "INSERT INTO users (email, password, role, name, gender, phone) VALUES (?, ?, ?, ?, ?, ?)
";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssss", $email, $hashedPassword, $userType, $name, $gender, $phoneNumber);

if ($stmt->execute()) {
    // User signed up successfully, generate a JWT token
    $tokenId    = base64_encode(random_bytes(32));
    $issuedAt   = time();
    $notBefore  = $issuedAt;  // Token can't be used before this time
    $expire     = $notBefore + 3600; // Token will expire in 1 hour (adjust as needed)

    $token = [
        'iat'  => $issuedAt,         // Issued at: timestamp
        'jti'  => $tokenId,          // JWT ID
        'nbf'  => $notBefore,        // Not before
        'exp'  => $expire,           // Expiration time
        'data' => [
            'email' => $email,      // Add user data to the token
            'role' => $userType     // Include user role (userType) in the token
        ]
    ];

    $jwt = JWT::encode($token, $key, 'HS256'); // Specify the algorithm here (HS256 is used here)
    echo json_encode(['token' => $jwt]); // Return the token to the client
} else {
    echo "Error signing up user: " . $stmt->error;
}



if ($userType == "Patient") {
    // Assuming patients table has a foreign key referring to users table's id
    $sqlPatient = "INSERT INTO patients (patient_id) SELECT id FROM users WHERE email=?";
    $stmtPatient = $conn->prepare($sqlPatient);
    $stmtPatient->bind_param("s", $email);

    if ($stmtPatient->execute()) {
        
    } else {
        echo "Error signing up patient: " . $stmtPatient->error;
    }

    $stmtPatient->close();
}

if ($userType == "Doctor") {
    // Assuming patients table has a foreign key referring to users table's id
    $sqlDoctor = "INSERT INTO doctors (doctor_id) SELECT id FROM users WHERE email=?";
    $stmtDoctor = $conn->prepare($sqlDoctor);
    $stmtDoctor->bind_param("s", $email);

    if ($stmtDoctor->execute()) {
       
    } else {
        echo "Error signing up doctor: " . $stmtDoctor->error;
    }

    $stmtDoctor->close();
}

$stmt->close();
$conn->close();
?>
