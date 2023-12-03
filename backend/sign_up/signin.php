<?php
include("../connection.php"); // Include your database connection file
// Receive JSON data from the request body
$data = json_decode(file_get_contents("php://input"), true);

// Check if data is received and set variables
if (isset($data['email'], $data['password'])) {
    $email = $data['email'];
    $password = $data['password'];
}
$query=$conn->prepare('select id,name,password,email,role,gender,phone from users where email=?');
$query->bind_param('s',$email);
$query->execute();
$query->store_result();
$num_rows=$query->num_rows;
$query->bind_result($id,$name,$hashed_password,$email,$userType,$gender,$phone);
$query->fetch();


$response=[];
if($num_rows== 0){
    $response['status']= 'user not found';
    echo json_encode($response);
} else {
    if(password_verify($password,$hashed_password)){
        $response['status']= 'logged in';
        $response['id']=$id;
        $response['name']=$name;
        $response['email']=$email;
        $response['userType']=$userType;
        $response['gender']=$gender;
        $response['phone']=$phone;
        echo json_encode($response);
    } else {
        $response['status']= 'wrong credentials';
        echo json_encode($response);
    }
};