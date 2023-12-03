<?php
include("../connection.php"); // Include your database connection file
$data = json_decode(file_get_contents("php://input"), true);

// Check if data is received and set variables
if (isset($data['room_id'])) {
    $room_id = $data['room_id'];
      
}
else{
    $room_id=$_POST['room_id'];
       
}
$roomStatus="Free";
$room_patient=null;
// Query to get all users
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