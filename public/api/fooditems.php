<?php
require 'cors.php';
require 'db_con.php';

// Start or resume the PHP session
session_start();

$request_body = file_get_contents("php://input");

$sql = "SELECT * FROM tbl_food";


$query = $db_con->query($sql);

if ($query === false) {
    $response = ['status' => 'error', 'code' => '500', 'message' => 'Database query error: ' . $db_con->error];
    echo json_encode($response);
    return;
}

if ($query->num_rows > 0) {
    // Rest of the code...
    $food_items = array(); // Initialize the $food_items array

    while ($row = $query->fetch_assoc()) {
        $view_json = array();

        $view_json["id"] = $row["id"];
        $view_json["title"] = $row["title"];
        $view_json["price"] = $row["price"];
        $view_json["image_name"] = $row["image_name"];
        $view_json["category_id"] = $row["category_id"];
        $view_json["featured"] = $row["featured"];
        $view_json["description"] = $row["description"];

        $food_items["all_foods"][] = $view_json;
    }

    $response = json_encode([$food_items]);
    echo $response;
    return;
} else {
    $response = ['status' => 'error', 'code' => '420', 'message' => 'No Records Found!'];
    echo json_encode($response);
    return;
}

?>
