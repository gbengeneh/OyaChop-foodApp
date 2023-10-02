<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Request-With, Authorization");
header("Access-Control-Allow-Credentials: true");

// Check if it's an OPTIONS request and return immediately
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  exit;
}
?>

