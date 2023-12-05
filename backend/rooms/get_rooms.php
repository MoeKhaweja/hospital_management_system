<?php
include("../connection.php");
include("../auth/jwt_decode.php"); 

authenticateJWT();

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['room_status'])) {
    $roomStatus = $data['room_status'];
    
}
else{
    $roomStatus=$_POST['room_status'];
}

$query=$conn->prepare('select * from rooms where room_status=?');
$query->bind_param('s',$roomStatus);
$query->execute();
$array=$query->get_result();
$response=[];

while($rooms=$array->fetch_assoc()){
    $response[]=$rooms;
}
echo json_encode($response);

$conn->close();
?>