<?php
include("../connection.php"); // Include your database connection file

// Query to get all rooms
$query=$conn->prepare('select patient_id, room_number from patients');
$query->execute();
$array=$query->get_result();
$response=[];

while($rooms=$array->fetch_assoc()){
    $response[]=$rooms;
}
echo json_encode($response);
// Close the database connection
$conn->close();
?>