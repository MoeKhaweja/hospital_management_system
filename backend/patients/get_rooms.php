<?php
include("../connection.php"); 
include("../auth/jwt_decode.php"); 

authenticateJWT();

$query=$conn->prepare('select patient_id, room_number from patients');
$query->execute();
$array=$query->get_result();
$response=[];

while($rooms=$array->fetch_assoc()){
    $response[]=$rooms;
}
echo json_encode($response);

$conn->close();
?>