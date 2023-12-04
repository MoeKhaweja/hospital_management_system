<?php
include("../connection.php");

$sql = "
    SELECT 
        p.*, 
        CONCAT(
            '[',
            GROUP_CONCAT(
                CONCAT('{\"medication_id\": ', m.id, ', \"date\": \"', m.date, '\", \"diagnosis\": \"', m.diagnosis, '\"}')
            ),
            ']'
        ) AS medications
    FROM 
        patients p
    LEFT JOIN 
        medical_history m ON p.patient_id = m.patient_id
    GROUP BY 
        p.patient_id;
";

// Execute the query
$query = $conn->prepare($sql);
$query->execute();
$array = $query->get_result();
$response = [];

while ($rooms = $array->fetch_assoc()) {
    $response[] = $rooms;
}

// Decode the medications string to an array
foreach ($response as &$row) {
    $row['medications'] = json_decode($row['medications'], true);
}

echo json_encode($response);

// Close the database connection
$conn->close();
?>
