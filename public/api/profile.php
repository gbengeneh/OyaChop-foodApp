<?php
require "cors.php";
require "db_con.php";

$body = json_decode(file_get_contents('php://input'));
$user_id = $body->user_id;
$old_password = $body->old_password;
$new_password = $body->new_password;
$api = $_GET['api'];


// Function to view profile
function viewProfile($user_id) {
    global $db_con;

    $user_id = intval($user_id); // Convert to integer to prevent SQL injection
    $sql_get_user = "SELECT user_id, firstname, lastname, gender, phone_number, email, delivery_address, picture
                     FROM users WHERE user_id = ?";
    $stmt = $db_con->prepare($sql_get_user);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $user_result = $stmt->get_result();

    if ($user_result->num_rows > 0) {
        $user = $user_result->fetch_assoc();
        $response = ['status' => 'success', 'user' => $user];
    } else {
        $response = ['status' => 'error', 'code' => '404', 'message' => 'User Not Found'];
    }

    echo json_encode($response);
}

// Function to verify old password
function verifyPassword($user_id, $old_password) {
    global $db_con;

    $user_id = intval($user_id); // Convert to integer to prevent SQL injection
    $sql_get_password = "SELECT password FROM users WHERE user_id = ?";
    $stmt = $db_con->prepare($sql_get_password);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $password_result = $stmt->get_result();

    if ($password_result->num_rows > 0) {
        $user_data = $password_result->fetch_assoc();
        $hashed_password = $user_data['password'];

        // Compare the old password using md5
        if (md5($old_password) === $hashed_password) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

// Function to update password
function updatePassword($user_id, $new_password, $old_password) {
    global $db_con;

    if (!verifyPassword($user_id, $old_password)) {
        echo json_encode(['status' => 'error', 'message' => 'Old password is incorrect']);
        return;
    }

    $user_id = intval($user_id); // Convert to integer to prevent SQL injection
    $enc_new_password = md5($new_password);

    $sql_update_password = "UPDATE users SET password = ? WHERE user_id = ?";
    $stmt = $db_con->prepare($sql_update_password);
    $stmt->bind_param("si", $enc_new_password, $user_id);

    if ($stmt->execute()) {
        $response = ['status' => 'success', 'message' => 'Password updated successfully'];
    } else {
        $response = ['status' => 'error', 'code' => '500', 'message' => 'Error updating password'];
    }

    echo json_encode($response);
}

if (isset($api)) {
    switch ($api) {
        case 'view_profile':
            viewProfile($user_id);
            break;
        case 'verify_password':
            $password_verified = verifyPassword($user_id, $old_password);
            echo json_encode(['passwordVerified' => $password_verified]);
            break;
        case 'update_password':
            updatePassword($user_id, $new_password, $old_password);
            break;
        default:
            echo json_encode(['message' => 'Invalid API request']);
    }
} else {
    echo json_encode(['message' => 'Invalid API request']);
}
?>
