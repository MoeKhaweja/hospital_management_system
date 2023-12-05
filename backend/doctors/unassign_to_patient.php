<?php
include("../connection.php");
include("../auth/jwt_decode.php"); 

authenticateJWT();

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['patient_id'])) {
    $patient_id = $data['patient_id'];

      
}
else{
    $patient_id=$_POST['patient_id'];

       
}

$sql = "UPDATE patients SET assigned_dr = null WHERE patient_id = ?";
$stmt = $conn->prepare($sql);

$stmt->bind_param("i", $patient_id);

if ($stmt->execute()) {
    echo "dr. assigned successfully";
} else {
    echo "Error assigning dr.: " . $stmt->error;
}

$stmt->close();
$conn->close();

?>