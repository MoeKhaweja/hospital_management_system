<?php
include("../connection.php"); 
include("../auth/jwt_decode.php"); 

authenticateJWT();

$data = json_decode(file_get_contents("php://input"), true);
if (isset($data['room_name'], $data['room_status'])) {
    $room_name = $data['room_name'];
    $room_status = $data['room_status'];

    $sql = "INSERT INTO rooms (room_name, room_status) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);

    $stmt->bind_param("ss", $room_name, $room_status);

    if ($stmt->execute()) {
        echo "Room created successfully";
    } else {
        echo "Error creating room: " . $stmt->error;
    }
    $stmt->close();
    $conn->close();
} else {
    echo "Incomplete data provided";
}
?>
