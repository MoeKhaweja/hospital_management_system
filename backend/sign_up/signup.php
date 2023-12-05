<?php
// FILEPATH: /C:/xampp/htdocs/hospital_management_system/backend/signup.php
include("../connection.php"); 

$data = json_decode(file_get_contents("php://input"), true);

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
} else {
    echo "Error signing up user: " . $stmt->error;
}



if ($userType == "Patient") {
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
