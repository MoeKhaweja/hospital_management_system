<?php
include("../connection.php");
include("../auth/jwt_decode.php"); 

authenticateJWT();

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['patient_id'], $data['assigned_dr'])) {
    $patient_id = $data['patient_id'];
    $assigned_dr = $data['assigned_dr'];
      
}
else{
    $patient_id=$_POST['patient_id'];
    $assigned_dr=$_POST['assigned_dr'];
       }

$sql = "UPDATE patients SET assigned_dr = ? WHERE patient_id = ?";
$stmt = $conn->prepare($sql);


$stmt->bind_param("ii", $assigned_dr, $patient_id);


if ($stmt->execute()) {
    echo "dr. assigned successfully";
} else {
    echo "Error assigning dr.: " . $stmt->error;
}

$stmt->close();
$conn->close();

?>