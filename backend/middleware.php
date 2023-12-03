<?php


include("connection.php");
require_once('vendor/autoload.php'); // Include the JWT library

use Firebase\JWT\JWT;

// Your secret key (should be the same as used for token generation)

// Function to validate JWT token
function validateToken($token) {
    global $key;
    try {
        $decoded = JWT::decode($token, $key, array('HS256')); // Decode the token using the key
        return $decoded->data; // Return decoded data from the token
    } catch (Exception $e) {
        return null; // Return null if the token is invalid or expired
    }
}

// Check if the Authorization header exists and extract the token
$headers = apache_request_headers();
$authHeader = isset($headers['Authorization']) ? $headers['Authorization'] : null;

if ($authHeader) {
    $token = str_replace('Bearer ', '', $authHeader); // Extract the token part from the header
    $userData = validateToken($token); // Validate the token

    if ($userData) {
        // Token is valid, you can access $userData['email'] or other user data here
        // Proceed with the protected route logic or allow access to the resource
    } else {
        // Token is invalid or expired
        http_response_code(401); // Unauthorized status code
        echo json_encode(array("message" => "Unauthorized access"));
        exit(); // Stop further execution
    }
} else {
    // Authorization header is missing
    http_response_code(401); // Unauthorized status code
    echo json_encode(array("message" => "Unauthorized access"));
    exit(); // Stop further execution
}
?>