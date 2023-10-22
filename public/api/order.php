
<?php
require 'cors.php';
require 'db_con.php';

$body = json_decode(file_get_contents('php://input'));
// $user_id = $body->user_id;

$user_id = 10; // Assuming a user ID, replace this with your desired user ID handling logic
$user_id = intval($user_id);

$query = "SELECT tbl_food.id, tbl_food.title, tbl_food.image_name,tbl_food.price, status,quantity, order_date
          FROM orders
          INNER JOIN tbl_food ON orders.food_id = tbl_food.id
          INNER JOIN delivery_details ON orders.user_id = delivery_details.user_id
          INNER JOIN users ON orders.user_id = users.user_id
          WHERE  $user_id = '$user_id'";

$result = mysqli_query($db_con, $query);


$tbl_order_items = array();
while ($row = mysqli_fetch_assoc($result)) {
    
    // Convert the order date to a human-readable format
    $order_date = $row['order_date'];
    $timestamp = strtotime(substr($order_date, 0, 10) . ' ' . substr($order_date, 11));
    $diff = time() - $timestamp;

    $intervals = array(
        31536000 => 'year',
        2592000 => 'month',
        604800 => 'week',
        86400 => 'day',
        3600 => 'hour',
        60 => 'minute'
    );

    $time_diff = '';
    foreach ($intervals as $seconds => $unit) {
        $interval = floor($diff / $seconds);

        if ($interval > 1) {
            $time_diff = $interval . ' ' . $unit . 's ago';
            break;
        } elseif ($interval == 1) {
            $time_diff = $interval . ' ' . $unit . ' ago';
            break;
        }
    }
            $status=$row['status'];
            $price=$row['price'];
            $quantity=$row['quantity'];
            $total= ($price * $quantity);

    $item = array(
        "food_id" => $row['id'],
        "title" => $row['title'],
        "total" => $total,
        "image_name" => $row['image_name'],
        "status" => $row['status'],
        "time_diff" => $time_diff // Include the time difference
        

    );
    $tbl_order_items[] = $item;
}

echo json_encode($tbl_order_items);

// Close the database connection
$db_con->close();
?>
