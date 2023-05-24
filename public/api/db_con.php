<?php
try{

$db_con = mysqli_connect("localhost","root","","oya_chop");

if($db_con->connect_error){

   throw new Exception("Connection Error") ;
	
}

}catch (Exception $e){

echo "Cannot connect to the Database", $e->getMessage(), " ";

} 


?>