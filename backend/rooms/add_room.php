<?php
include("../connection.php"); // Include your database connection file

$data = json_decode(file_get_contents("php://input"), true);
// Retrieve room_id and room_status from your data source (replace these with your actual data source logic)
if (isset($data['room_name'], $data['room_status'])) {
    $room_name = $data['room_name'];
    $room_status = $data['room_status'];

    // Prepare the SQL statement to insert a new room
    $sql = "INSERT INTO rooms (room_name, room_status) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);

    // Bind parameters to the prepared statement
    $stmt->bind_param("ss", $room_name, $room_status);

    // Execute the query
    if ($stmt->execute()) {
        echo "Room created successfully";
    } else {
        echo "Error creating room: " . $stmt->error;
    }

    // Close the prepared statement and the database connection
    $stmt->close();
    $conn->close();
} else {
    echo "Incomplete data provided";
}
?>
