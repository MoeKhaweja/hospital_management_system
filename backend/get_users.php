<?php
include("connection.php");
$data = json_decode(file_get_contents("php://input"), true);

// Check if data is received and set variables
if (isset($data['userType'])) {
    $userType = $data['userType'];
    
}
else{
    $userType=$_POST['userType'];
}
// Query to get all users
$query=$conn->prepare('select id,name,email,gender,phone from users where role=?');
$query->bind_param('s',$userType);
$query->execute();
$array=$query->get_result();
$response=[];

while($users=$array->fetch_assoc()){
    $response[]=$users;
}
echo json_encode($response);
// Close the database connection
$conn->close();
?>