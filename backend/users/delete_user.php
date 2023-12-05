<?php
include("../connection.php"); 
include("../auth/jwt_decode.php"); 

authenticateJWT();

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['id'])) {
    $id = $data['id'];
      
}
else{
    $id=$_POST['id'];
       
}

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