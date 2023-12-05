<?php
include("../connection.php");
include("../auth/jwt_decode.php"); 

authenticateJWT();

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['room_id'],$data['room_name'])) {
    $room_id = $data['room_id'];
    $room_name = $data['room_name'];

   }
else{
    $room_id = $_POST['room_id'];
    $room_name = $_POST['room_name'];

    
}

$query = $conn->prepare('UPDATE rooms
                         SET room_name = ?
                         WHERE room_id = ?');
$query->bind_param("si", $room_name, $room_id);
$query->execute();
if ($query->execute()) {
    echo "room updated successfully";
} else {
    echo "Error updating room: " . $stmt->error;
}
$conn->close();
?>