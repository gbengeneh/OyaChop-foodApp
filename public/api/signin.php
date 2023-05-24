<?php

require 'db_con.php';

$data = json_decode(file_get_contents('php://input'));


if($_SERVER['REQUEST_METHOD' === 'POST']){

    if(!empty($data->email) && !empty($data->password)){

        $email = filter_var($data->email, FILTER_SANITIZE_EMAIL);
    
        $password = filter_var($data->password, FILTER_SANITIZE_FULL_SPECIAL_CHARS);

        $sql = 'SELECT * FROM users WHERE email = `$email`';

        $result = $db_con->query($ql);

    if($result->num_rows > 0){

            $row = $result->fetch_array();

            $user_id = $row['id'];

            $user_email = $row['email'];

            $user_password = $row['password'];

    if($email === $user_email && md5($password) === $user_password ){

        setcookie('id', $user_id, time() + 86400 * 2 );

        $response = json_encode(['status'=>'success','code'=>'200','message'=>'signed in.']);
        echo $response;

    }

    }else{

        $response = json_encode(['status'=>'error','code'=>'420', 'message'=>'Invalid  Details.']);
        echo $response;

    }

    }else{

        $response = json_encode(['status'=>'error','code'=>'400','message'=>'Please Complete All Fields.']);
        echo $response;

    }


}else{

    $response = json_encode(['status'=>'error','code'=>'402','message'=>'Invalid Request Type.']);
   
    echo $response;
   
   }
   
$db_con->close();

?>