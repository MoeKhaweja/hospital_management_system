<?php
include("../connection.php"); 
include("../auth/jwt_decode.php"); 

authenticateJWT();

$sql = "SELECT * FROM appointments";

$result = $conn->query($sql);

$appointmentsData = []; 

if ($result->num_rows > 0) {
 
    while ($row = $result->fetch_assoc()) {
       
        $appointment = [
            'id' => $row['id'],
            'doctor_id' => $row['doctor_id'],
            'patient_id' => $row['patient_id'], 
            'date' => $row['appointment_date'],
            'time_start' => $row['appointment_start_time'],
            'time_end' => $row['appointment_end_time'],
            'status' => $row['appointment_status']
        ];
      
        $appointmentsData[] = $appointment;
    }
} else {
    echo "No appointments found";
}

$appointmentsJSON = json_encode($appointmentsData, JSON_PRETTY_PRINT);

echo $appointmentsJSON;
$conn->close();
?>