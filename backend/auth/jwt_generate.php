<?php

require('../vendor/autoload.php'); 



use Firebase\JWT\JWT;


function generateToken($userID,$hashed_password) {
    // Validate user ID and password (this is a basic example, you should use proper validation and hashing)
        $issuedAt = time();
        $expirationTime = $issuedAt + 3600; // Token expiration time (1 hour)
        $secret_key = 'secret_key'; 
        // Create the token payload
        $payload = array(
            'user_id' => $userID,
            'password' => $hashed_password,
            'iat' => $issuedAt,
            'exp' => $expirationTime
        );

        // Generate the token
        $token = JWT::encode($payload, $secret_key, 'HS256');

        return $token;

}
?>
