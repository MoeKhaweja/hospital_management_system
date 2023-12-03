<?php
include("../connection.php"); // Include your database connection file
$data = json_decode(file_get_contents("php://input"), true);

// Check if data is received and set variables
if (isset($data['id'],$data['email'], $data['name'], $data['gender'], $data['phoneNumber'])) {
    $id = $data['id'];
    $email = $data['email'];
    $name = $data['name'];
    $gender = $data['gender'];
    $phoneNumber = $data['phoneNumber'];

    
}
else{
    $id=$_POST['id'];
    $email=$_POST['email'];
    $name=$_POST['name'];
    $gender=$_POST['gender'];
    $phoneNumber=$_POST['phoneNumber'];
    
}
// Query to get all users
$query = $conn->prepare('UPDATE users
                         SET email = ?, name = ?, gender = ?, phone = ?
                         WHERE id = ?');
$query->bind_param("ssssi", $email, $name, $gender, $phoneNumber,$id);
$query->execute();
if ($query->execute()) {
    echo "User updated successfully";
} else {
    echo "Error updating user: " . $stmt->error;
}
$conn->close();
?>