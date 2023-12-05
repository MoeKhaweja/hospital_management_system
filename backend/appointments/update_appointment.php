<?php
include("../connection.php");
include("../auth/jwt_decode.php"); 

authenticateJWT();

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['id'], $data['appointment_status'])) {
    $id = $data['id'];
    $appointment_status = $data['appointment_status'];
} else {
    $id = $_POST['id'];
    $appointment_status = $_POST['appointment_status'];
}

$query = $conn->prepare('UPDATE appointments
                         SET appointment_status = ?
                         WHERE id = ?');
$query->bind_param("si", $appointment_status, $id);

if ($query->execute()) {
    echo "appointment updated successfully";
} else {
    echo "Error updating appointment: " . $query->error;
}

$conn->close();
?>
