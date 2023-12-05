<?php
include("../connection.php"); 
include("../auth/jwt_decode.php"); 

authenticateJWT();

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['room_id'])) {
    $room_id = $data['room_id'];
      
}
else{
    $room_id=$_POST['room_id'];
       
}
$roomStatus="Free";
$room_patient=null;

$query = $conn->prepare('UPDATE rooms 
                         SET room_status=?, room_patient=? 
                         WHERE room_id=?');
$query->bind_param("sii", $roomStatus, $room_patient, $room_id);

                      
$query->execute();
if ($query->execute()) {
    echo "room deleted successfully";
} else {
    echo "Error deleting room: " . $query->error;
}

$query2 = $conn->prepare('UPDATE patients 
                         SET room_number=? 
                         WHERE room_number=?');
$query2->bind_param("ii", $room_patient, $room_id);

$query2->execute();
if ($query2->execute()) {
    echo "room deleted successfully";
} else {
    echo "Error deleting room: " . $query2->error;
}
$conn->close();
?>