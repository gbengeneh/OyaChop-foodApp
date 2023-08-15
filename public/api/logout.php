<?php
// Start or resume the PHP session
session_start();

// Clear all session variables
$_SESSION = array();

// Destroy the session
session_destroy();

// Redirect the user to the login page or landing page after logout
header("Location: landing.html"); // Change this to your login page or desired page
exit();
?>
