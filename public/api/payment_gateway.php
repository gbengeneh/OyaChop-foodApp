<?php
require "cors.php";
require "db_con.php";

$data = json_decode(file_get_contents("php://input"));

    $user_id = $_GET['user_id'];

if(empty($data->card_number)){

	echo json_encode(['status'=>'error','code'=>'400','message'=>'Please Input Card Number.']);
    exit;

}elseif(empty($data->card_month)){

	echo json_encode(['status'=>'error','code'=>'400','message'=>'Please Input Card Expiry Month.']);
    exit;

}elseif(empty($data->card_year)){

	echo json_encode(['status'=>'error','code'=>'400','message'=>'Please Input Card Expiry Year.']);
    exit;

}elseif(empty($data->card_cvv)){

	echo json_encode(['status'=>'error','code'=>'400','message'=>'Please Input CVV Number.']);
    exit;

}else{

    $user_id = filter_var($data->user_id, FILTER_SANITIZE_NUMBER_INT);
	// Filter card details


	//$email = filter_var($data->email, FILTER_SANITIZE_EMAIL);

	$card_number = filter_var($data->card_number, FILTER_SANITIZE_NUMBER_INT);

	$card_month =  filter_var($data->card_month, FILTER_SANITIZE_NUMBER_INT);

	$card_year = filter_var($data->card_year, FILTER_SANITIZE_NUMBER_INT);

	$card_cvv  = filter_var($data->card_cvv, FILTER_SANITIZE_NUMBER_INT);

	// Total amount of Order

	$order_total = filter_var($data->order_total, FILTER_SANITIZE_NUMBER_INT);

	// Retrieve card details of users for payment 

	$p_gateway = " SELECT * FROM pay_gateway WHERE user_id = '$user_id' ";

    $qwerty = $db_con->query($p_gateway);

    $p_row = $qwerty->fetch_assoc();

    $g_card_number = $p_row['card_number'];

    $g_expire_month = $p_row['expire_month'];

    $g_expire_year= $p_row['expire_year'];

    $g_cvv= $p_row['cvv'];

    $get_bal = $p_row['amount'];

   	// compare receive card details with data from the payment database

   	if($card_number !== $g_card_number){

   	echo json_encode(['status'=>'error','code'=>'412','message'=>'Invalid Card Number.']);
    exit; 
  
   }elseif($card_month !== $g_expire_month){

   	echo json_encode(['status'=>'error','code'=>'412','message'=>'Invalid Card Month.']);
    exit; 

   }elseif($card_year !== $g_expire_year){

   	echo json_encode(['status'=>'error','code'=>'412','message'=>'Invalid Card Year.']);
    exit; 

   }elseif($card_cvv !== $g_cvv){

   	echo json_encode(['status'=>'error','code'=>'412','message'=>'Invalid Card CVV.']); 
    exit;

   }elseif($order_total > $get_bal){

    echo json_encode(['status'=>'error','code'=>'412','message'=>'Opps!!, Insufient Funds.']); 
    exit;

   }else{

   $trans_id = substr(str_shuffle('abcdefgh1234567890'), 11);

   $trans_status = 'Ordered';

   $order_date = date('Y-m-d H:i:s');

   $balance =  $get_bal - $order_total ;

  $seq = "UPDATE pay_gateway SET amount = '$balance' WHERE user_id='$user_id'";

  $query_seq = $db_con->query($seq);

  $sql = "SELECT food_id, quantity FROM cart WHERE user_id = '$user_id'";

  $query = $db_con->query($sql);

  if ($query->num_rows > 0) {

  while ($row= $query->fetch_assoc()) {

  $food_id[] = $row["food_id"];

  $quantity[] = $row["quantity"];

  }


for ($i=0; $i < count($food_id); $i++) { 

$ship_details = "SELECT * FROM delivery_details WHERE user_id = '$user_id'";

$ship_query = $db_con->query($ship_details);

$ship_result = $ship_query->fetch_assoc();

// $fullname = $ship_result['firstname'] .' '. $ship_result['lastname'];

// $phone_number = $ship_result['phone_number'];

// $closest_landmark = $ship_result['closest_landmark'];

// $delivery_address = $ship_result['delivery_address']; 

// $sql_price = "SELECT * FROM tbl_food WHERE id = '$food_id[$i]'";

// $query_price = $db_con->query($sql_price);

// $row_price = $query_price->fetch_assoc();

// $food_price = $row_price["price"];

// // Calculate the delivery time (for example, adding 30 minutes to the current time)
// $estimated_delivery_time = date('Y-m-d H:i:s', strtotime('+30 minutes'));

$sql = "INSERT INTO orders (user_id, food_id, quantity, transaction_id, order_date, status)
        VALUES ('$user_id', '".$food_id[$i]."', '".$quantity[$i]."', '$trans_id', '$order_date', '$trans_status')";

$query = $db_con->query($sql);


 }

 $sql = "DELETE FROM cart WHERE user_id = '$user_id'";

 $querys = $db_con->query($sql);

  echo json_encode(['status'=>'success','code'=>'200','message'=>'Payment success.']); 
    exit;

}
}
}

$db_con->close();

?>