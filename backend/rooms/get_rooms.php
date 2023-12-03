<?php
include("../connection.php"); // Include your database connection file
$data = json_decode(file_get_contents("php://input"), true);

// Check if data is received and set variables
if (isset($data['room_status'])) {
    $roomStatus = $data['room_status'];
    
}
else{
    $roomStatus=$_POST['room_status'];
}
// Query to get all rooms
$query=$conn->prepare('select * from rooms where room_status=?');
$query->bind_param('s',$roomStatus);
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