<?php
require 'cors.php';
require 'db_con.php';

$body = json_decode(file_get_contents('php://input'));
$user_id = $body->user_id;
$food_id = $body->food_id;
$quantity = $body->quantity;
// $user_id = 63;
// $food_id = 17;
// $quantity = 5;
$api=$_GET['api'];
// Function to add an item to the cart
function addToCart($user_id,$food_id,$quantity) {
    global $db_con;
        
        $check_query = "SELECT * FROM cart WHERE user_id='$user_id' AND food_id='$food_id'";
        $check_result = mysqli_query($db_con, $check_query);

        if (mysqli_num_rows($check_result) > 0) {
            echo json_encode(array("message" => "Item already in cart"));
        } else {
            $insert_query = "INSERT INTO cart (user_id, food_id, quantity) VALUES ('$user_id', '$food_id', $quantity)";
            $insert_result = mysqli_query($db_con, $insert_query);

            if ($insert_result) {
                echo json_encode(array("message" => "Item added to cart successfully"));
            } else {
                echo json_encode(array("message" => "Failed to add item to cart"));
            }
        }
    }

    // Function to view the cart items
function viewCart($user_id) {
    global $db_con;

    $query = "SELECT tbl_food.id, tbl_food.title, tbl_food.price, tbl_food.image_name,
     cart.quantity FROM cart INNER JOIN tbl_food ON cart.food_id = tbl_food.id 
     WHERE cart.user_id = '$user_id'";
    $result = mysqli_query($db_con, $query);

    if (!$result) {
        echo json_encode(array("error" => "Database error: " . mysqli_error($db_con)));
        return;
    }

    $cart_items = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $item = array(
            "id" => $row['id'],
            "title" => $row['title'],
            "price" => $row['price'],
            "image_name" => $row['image_name'],
            "quantity" => $row['quantity']
        );
        $cart_items[] = $item;
    }

    echo json_encode($cart_items);
}
 
// Function to delete an item from the cart
function deleteFromCart($user_id,$food_id) {
    global $db_con;

        $delete_query = "DELETE FROM cart WHERE user_id='$user_id' AND food_id='$food_id'";
        $delete_result = mysqli_query($db_con, $delete_query);

        if ($delete_result) {
            echo json_encode(array("message" => "Item deleted from cart successfully"));
        } else {
            echo json_encode(array("message" => "Failed to delete item from cart"));
        }
    
}


// Function to get the total number of items in the cart
function getTotalItems($user_id,$food_id,$quantity) {
    global $db_con;

    $get_items_query = "SELECT SUM(quantity) AS total_items FROM cart WHERE user_id='$user_id'";

    $get_items_result = mysqli_query($db_con, $get_items_query);
    $row = mysqli_fetch_assoc($get_items_result);
    $count_items = $row['total_items'];

    echo json_encode(array("total_items" => $count_items));
}

// Function to get the subtotal amount of items in the cart
function getSubtotal($user_id, $food_id, $quantity) {
    global $db_con;

    $get_price_query = "SELECT tbl_food.price * $quantity AS subtotal 
                        FROM tbl_food WHERE tbl_food.food_id = '$food_id'";
    $get_price_result = mysqli_query($db_con, $get_price_query);
    $row = mysqli_fetch_assoc($get_price_result);
    $subtotal = $row['subtotal'];

    echo json_encode(array("subtotal" => $subtotal));
}

// Function to get the total price of the cart
function getTotalPrice($user_id,$food_id,$quantity) {
    global $db_con;

    $get_price_query = "SELECT SUM(tbl_food.price * cart.quantity) AS total_price 
    FROM cart INNER JOIN tbl_food ON cart.food_id = tbl_food.food_id WHERE cart.user_id='$user_id'";
    $get_price_result = mysqli_query($db_con, $get_price_query);
    $row = mysqli_fetch_assoc($get_price_result);
    $total_price = $row['total_price'];

    echo json_encode(array("total_price" => $total_price));
}

// Function to update the quantity of an item in the cart
function updateCart($user_id,$food_id,$quantity) {
    global $db_con;

        $update_query = "UPDATE cart SET quantity='$quantity' WHERE user_id='$user_id' AND food_id='$food_id'";
        $update_result = mysqli_query($db_con, $update_query);

        if ($update_result) {
            echo json_encode(array("message" => "Cart item updated successfully"));
        } else {
            echo json_encode(array("message" => "Failed to update cart item"));
        }
    }

function resetCart($user_id) {
    global $db_con;

    $delete_query = "DELETE FROM cart WHERE user_id='$user_id'";
    $delete_result = mysqli_query($db_con, $delete_query);

    if ($delete_result) {
        echo json_encode(array("message" => "Cart reset successfully"));
    } else {
        echo json_encode(array("message" => "Failed to reset cart"));
    }
}



// Handle API requests
// $api = $_GET['api'];
if (isset($api)) {
      switch ($api) {
        case 'add_to_cart':
            addToCart($user_id,$food_id,$quantity);
            break;
        case 'total_items':
            getTotalItems($user_id,$food_id,$quantity);
            break;

        case 'subtotal':
            getSubtotal($user_id,$food_id,$quantity);  
            break;
        case 'total_price':
            getTotalPrice($user_id,$food_id,$quantity);
            break;
        case 'view_cart':
            viewCart($user_id);
            break;
        case 'delete_from_cart':
            deleteFromCart($user_id,$food_id);
            break;
        case 'update_cart':
            updateCart($user_id,$food_id,$quantity);
            break;
        case 'reset_cart':
            resetCart($user_id);
            break;
        default:
            echo json_encode(array("message" => "Invalid API request"));
    }
} else {
    echo json_encode(array("message" => "Invalid API request"));
}
?>
