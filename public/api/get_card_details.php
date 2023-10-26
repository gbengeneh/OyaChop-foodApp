<?php
require 'cors.php';
require "db_con.php";

$request_body = file_get_contents("php://input");

$data = json_encode($request_body);

$user_id = $_GET['user_id'];

$sql = "SELECT * FROM  pay_gateway WHERE user_id = '$user_id'";

$query = $db_con->query($sql);

if($query->num_rows > 0){

while( $row = $query->fetch_assoc() ){

    $view_json["card_holder"] = $row["card_holder"];
    $view_json["card_number"] = $row["card_number"];
    $view_json["expire_month"] = $row["expire_month"];
    $view_json["expire_year"] = $row["expire_year"];
    $view_json["cvv"] = $row["cvv"];
    $view_json["amount"] = $row["amount"];
    $delivery_details[] = $view_json;
}

    $response = json_encode([
        'status'=>'success',
        'code'=>'200',
        'card_details'=> $delivery_details
    ]);
    echo $response;
    return;

}else{

    $response = json_decode([
        'status'=>'error',
        'code'=>'420', 
        'message'=>'Details Not Found!']);
    echo $response;
    return;
}




?>