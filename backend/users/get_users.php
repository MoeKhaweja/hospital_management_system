<?php
include("../connection.php"); // Include your database connection file
$data = json_decode(file_get_contents("php://input"), true);

// Check if data is received and set variables
if (isset($data['userType'])) {
    $userType = $data['userType'];
    
}
else{
    $userType=$_POST['userType'];
}
if($userType=="Patient"){
// Query to get all users
$query=$conn->prepare('SELECT u.id, u.name, u.email, u.gender, u.phone, p.room_number
FROM users u
INNER JOIN patients p ON u.id = p.patient_id
WHERE u.role = ?
'
);}
else{
    $query=$conn->prepare('SELECT u.id, u.name, u.email, u.gender, u.phone
FROM users u WHERE u.role = ?');
}
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