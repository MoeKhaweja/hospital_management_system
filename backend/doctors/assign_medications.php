<?php
include("../connection.php");
include("../auth/jwt_decode.php"); 

authenticateJWT();

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['patient_id'], $data['diagnosis'])) {
    $patient_id = $data['patient_id'];
    $diagnosis = $data['diagnosis'];
} else {
    $patient_id = $_POST['patient_id'];
    $diagnosis = $_POST['diagnosis'];
}

$sql = "INSERT INTO medical_history (patient_id, diagnosis) VALUES (?, ?)";
$stmt = $conn->prepare($sql);

$stmt->bind_param("is", $patient_id, $diagnosis);

if ($stmt->execute()) {
    echo "Diagnosis added successfully";
} else {
    echo "Error adding diagnosis: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>