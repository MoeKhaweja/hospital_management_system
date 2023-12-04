<?php
include("../connection.php");

$data = json_decode(file_get_contents("php://input"), true);

// Check if data is received and set variables
if (isset($data['patient_id'], $data['diagnosis'])) {
    $patient_id = $data['patient_id'];
    $diagnosis = $data['diagnosis'];
} else {
    $patient_id = $_POST['patient_id'];
    $diagnosis = $_POST['diagnosis'];
}

$sql = "INSERT INTO medical_history (patient_id, diagnosis) VALUES (?, ?)";
$stmt = $conn->prepare($sql);

// Bind parameters
$stmt->bind_param("is", $patient_id, $diagnosis);

// Execute the query
if ($stmt->execute()) {
    echo "Diagnosis added successfully";
} else {
    echo "Error adding diagnosis: " . $stmt->error;
}

// Close the prepared statement and the database connection
$stmt->close();
$conn->close();
?>