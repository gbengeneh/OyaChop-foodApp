<?php
require "cors.php";
require "db_con.php";



if (!isset($_POST['firstname'], $_POST['lastname'], $_POST['gender'], $_POST['phone_number'] 
, $_POST['email'], $_POST['delivery_address'], $_POST['password'], $_FILES['picture']))
 {
    $response = json_encode(['status' => 'error','code'=>'400', 'message' => 'Missing Required Fields']);
    echo $response;
    exit;
  }

  
    // Sanitize form data
    $firstname = filter_var($_POST['firstname'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $lastname = filter_var($_POST['lastname'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $gender = filter_var($_POST['gender'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $phone_number = filter_var($_POST['phone_number'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $delivery_address = filter_var($_POST['delivery_address'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $password = filter_var($_POST['password'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
 
    $card_holder = $firstname . ' ' . $lastname;
    // $first_num = substr(str_shuffle('12345678901234567890'), 10);
    // $sec_num = substr(str_shuffle('098765432123'), 6);
    $card_number = strval(random_int(10000000000000000, 999999999999999999));
    $expire_month = rand(1,12);
    $expire_year = rand(date('Y'), 2028);
    $cvv = substr(str_shuffle(123456),3);
    $amount = random_int(50000, 500000);


//check if email already exist
    
$sqls = "SELECT * FROM users WHERE email = '$email' ";

  $getResult = $db_con->query($sqls);

if($getResult->num_rows > 0){

    $response = json_encode(['status'=>'error', 'code' => '450','message'=> 'User With This E-mail Exist!']);
    echo $response;
    return;

}

    // Validate file types and sizes, and move uploaded files to a permanent location
if(isset($_FILES['picture'])){

    $picture = $_FILES['picture'];
    $allowed_picture_types = array('image/jpeg', 'image/png', 'image/jpg');
    $max_file_size = 1000000; //  MB
 
if(in_array($picture['type'], $allowed_picture_types) && $picture['size'] <= $max_file_size)
{
    $picture_file_name = $picture['name'];
    $picture_file_path = 'images/' . $picture_file_name;
    move_uploaded_file($picture['tmp_name'], $picture_file_path);

}else {

    $response = json_encode(['status' => 'error','code'=>'420', 'message' => 'Invalid image, or image is > 3MB']);
    echo $response;
    exit;

}
}
   $enc_password = md5($password);

    $sql = "INSERT INTO users (firstname, lastname, email, gender, phone_number,  delivery_address, password, picture) 
    VALUES('$firstname', '$lastname','$email', '$gender', '$phone_number', '$delivery_address', '$enc_password', '$picture_file_path')";

    $result = $db_con->query($sql);

if($result){

    $user_id = $db_con->insert_id;
    $closest_landmark = 'Null';


    $sql1 = "INSERT INTO pay_gateway (user_id,card_holder, card_number, expire_month, expire_year, cvv, amount)
     VALUES('$user_id','$card_holder', '$card_number', '$expire_month', '$expire_year', '$cvv', '$amount')";
    $result1 = $db_con->query($sql1);

    $sql3 = "INSERT INTO delivery_details (user_id, firstname, lastname, phone_number, closest_landmark, delivery_address)
     VALUES('$user_id', '$firstname', '$lastname', '$phone_number', '$closest_landmark', '$delivery_address')";
     $result3 = $db_con->query($sql3);

    $response = json_encode(['status'=>'success', 'code' => '200','message'=> 'Signup Successful']);
    echo $response;
    return;
        
}else{
        
    $response = json_encode(['status'=>'error', 'code' => '440', 'message'=> 'Error Occured, Please Try Again!']);
    echo $response;
    return;

}

      
$db_con->close();

?>