<?php
include("connection.php");
$data = json_decode(file_get_contents("php://input"), true);

// Check if data is received and set variables
if (isset($data['id'])) {
    $id = $data['id'];
      
}
else{
    $id=$_POST['id'];
       
}
// Query to get all users
$query = $conn->prepare('DELETE FROM users where id=?');
                      
$query->bind_param("i",$id);
$query->execute();
if ($query->execute()) {
    echo "User deleted successfully";
} else {
    echo "Error deleting user: " . $stmt->error;
}
$conn->close();
?>