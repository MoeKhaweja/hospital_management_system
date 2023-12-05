<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require('../vendor/autoload.php');  
require('../auth/header_reader.php');

use \Firebase\JWT\JWT;
use Firebase\JWT\Key;
 
function authenticateJWT() {
    $secret_key = 'secret_key'; 
    $jwt = getBearerToken();

try {
    $decoded = JWT::decode($jwt, new Key($secret_key, 'HS256'));
    
    // Access the decoded data
    return($decoded);
    
} catch (Throwable $e) {
    // $conn->close();
    echo json_encode ($e->getMessage());
}

}



?>
