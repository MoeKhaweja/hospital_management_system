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

$query = $conn->prepare('DELETE FROM rooms WHERE room_id =?');
$query->bind_param("i",  $room_id);

                      
$query->execute();
if ($query->execute()) {
    echo "room deleted successfully";
} else {
    echo "Error deleting room: " . $query->error;
}


$conn->close();
?>