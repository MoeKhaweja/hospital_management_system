<?php
include("../connection.php");

$data = json_decode(file_get_contents("php://input"), true);

// Check if data is received and set variables
if (isset($data['patient_id'])) {
    $patient_id = $data['patient_id'];

      
}
else{
    $patient_id=$_POST['patient_id'];

       
}

$sql = "UPDATE patients SET assigned_dr = null WHERE patient_id = ?";
$stmt = $conn->prepare($sql);

// Bind parameters to the prepared statement
$stmt->bind_param("i", $patient_id);

// Execute the query
if ($stmt->execute()) {
    echo "dr. assigned successfully";
} else {
    echo "Error assigning dr.: " . $stmt->error;
}

// Close the prepared statement and the database connection
$stmt->close();
$conn->close();

?>