<?php
include("../connection.php"); 
include("../auth/jwt_decode.php"); 

authenticateJWT();

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['doctor_id'], $data['appointment_date'], $data['appointment_start_time'], $data['appointment_end_time'])) {
    $doctor_id = $data['doctor_id'];
    $appointment_date = $data['appointment_date'];
    $appointment_start_time = $data['appointment_start_time']; 
    $appointment_end_time = $data['appointment_end_time'];

    
    $sql = "INSERT INTO appointments (doctor_id, appointment_date, appointment_start_time, appointment_end_time) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);

  
    $stmt->bind_param("isss", $doctor_id, $appointment_date, $appointment_start_time, $appointment_end_time);

 
    if ($stmt->execute()) {
        echo "Appointment created successfully";
    } else {
        echo "Error creating Appointment: " . $stmt->error;
    }


    $stmt->close();
    $conn->close();
} else {
    echo "Incomplete data provided";
}

?>
