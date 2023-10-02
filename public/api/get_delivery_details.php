<?php
require 'cors.php';
require "db_con.php";

$request_body = file_get_contents("php://input");

$data = json_encode($request_body);

$user_id = $_GET['user_id'];

$sql = "SELECT * FROM  delivery_details WHERE user_id = '$user_id'";

$query = $db_con->query($sql);

if($query->num_rows > 0){

while( $row = $query->fetch_assoc() ){

    $view_json["firstname"] = $row["firstname"];
    $view_json["lastname"] = $row["lastname"];
    $view_json["phone_number"] = $row["phone_number"];
    $view_json["closest_landmark"] = $row["closest_landmark"];
    $view_json["delivery_address"] = $row["delivery_address"];
    $delivery_details[] = $view_json;
}

    $response = json_encode([
        'status'=>'success',
        'code'=>'200',
        'delivery_details'=> $delivery_details
    ]);
    echo $response;
    return;

}else{

    $response = json_decode([
        'status'=>'error',
        'code'=>'420', 
        'message'=>'No Records Found!']);
    echo $response;
    return;
}




?>