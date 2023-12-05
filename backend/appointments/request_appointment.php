<?php
include("../connection.php"); 
include("../auth/jwt_decode.php"); 

authenticateJWT();

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['id'], $data['appointment_status'], $data['patient_id'])) {
    $id = $data['id'];
    $appointment_status = $data['appointment_status'];
    $patient_id['patient_id'] = $data['patient_id'];
} else {
    $id = $_POST['id'];
    $appointment_status = $_POST['appointment_status'];
    $patient_id['patient_id'] = $_POST['patient_id'];
}

$query = $conn->prepare('UPDATE appointments
                         SET appointment_status = ?, patient_id = ?
                         WHERE id = ?');
$query->bind_param("sii", $appointment_status,$patient_id, $id);

if ($query->execute()) {
    echo "appointment updated successfully";
} else {
    echo "Error updating appointment: " . $query->error;
}

$conn->close();
?>
