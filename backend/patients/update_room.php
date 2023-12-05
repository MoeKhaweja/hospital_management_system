<?php
include("../connection.php"); $data = json_decode(file_get_contents("php://input"), true);

include("../auth/jwt_decode.php"); 

authenticateJWT();

if (isset($data['room_number'], $data['patient_id'])) {
    $room_number = $data['room_number'];
    $patient_id = $data['patient_id'];
} else {
    $room_number = $_POST['room_number'];
    $patient_id = $_POST['patient_id'];
}

$query = $conn->prepare('UPDATE patients
                         SET room_number = ?
                         WHERE patient_id = ?');
$query->bind_param("ii", $room_number, $patient_id);

if ($query->execute()) {
    echo "Patient room updated successfully";
} else {
    echo "Error updating room: " . $query->error;
}
$room_status="Used";

$query2 = $conn->prepare('UPDATE rooms
SET room_status = ?, room_patient=?
WHERE room_id = ?');
$query2->bind_param("sii",$room_status,$patient_id,$room_number);

if ($query2->execute()) {
echo "Patient room updated successfully";
} else {
echo "Error updating room: " . $query2->error;
}

$conn->close();
?>
