<?php

require 'cors.php';
require "db_con.php";

$data = json_decode(file_get_contents("php://input"));

// Check if 'user_id' exists in the $_GET array
if (!isset($_GET['user_id'])) {
    echo json_encode(['status' => 'error', 'code' => '400', 'message' => 'Missing user_id']);
    exit;
}

$user_id = $_GET['user_id'];

if(empty($data->firstname) && empty($data->lastname) && empty($data->phone_number) && empty($data->closest_landmark)
 && empty($data->delivery_address)){

	echo $response = json_encode(['status' => 'error','code'=>'400', 'message' => 'Missing Required Fields']); 
    exit;
}

 //Sanitize form data
    $firstname = filter_var($data->firstname, FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $lastname = filter_var($data->lastname, FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $phone_number = filter_var($data->phone_number, FILTER_SANITIZE_NUMBER_INT);
    $closest_landmark = filter_var($data->closest_landmark , FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $delivery_address = filter_var($data->delivery_address, FILTER_SANITIZE_FULL_SPECIAL_CHARS);

    $sql = "UPDATE delivery_details  SET firstname = '$firstname', lastname= '$lastname',phone_number = '$phone_number', closest_landmark = '$closest_landmark', delivery_address = '$delivery_address' WHERE user_id = '$user_id' ";

    $query = $db_con->query($sql);
    
    if($query){

    echo	$response = json_encode(['status'=>'success', 'code' => '200','message'=> 'Delivery Address Updated']);
    exit;

    }else{

    	echo $response = json_encode(['status'=>'error', 'code' => '500', 'message'=> 'Error Occured, Please Try Again!']);
        exit;
    }

    $db_con->close();


?> 