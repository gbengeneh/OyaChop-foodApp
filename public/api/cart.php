<?php
require 'cors.php';
require 'db_con.php';

// Function to add an item to the cart
function addToCart() {
    global $db_con;

    if (isset($_POST['food_id'])) {
        $user_id = getLoggedInUserId(); // Function to get the logged-in user's ID
        $food_id = $_POST['food_id'];

        $check_query = "SELECT * FROM cart WHERE user_id='$user_id' AND food_id='$food_id'";
        $check_result = mysqli_query($db_con, $check_query);

        if (mysqli_num_rows($check_result) > 0) {
            echo json_encode(array("message" => "Item already in cart"));
        } else {
            $insert_query = "INSERT INTO cart (user_id, food_id, quantity) VALUES ('$user_id', '$food_id', 1)";
            $insert_result = mysqli_query($db_con, $insert_query);

            if ($insert_result) {
                echo json_encode(array("message" => "Item added to cart successfully"));
            } else {
                echo json_encode(array("message" => "Failed to add item to cart"));
            }
        }
    } else {
        echo json_encode(array("message" => "Invalid request"));
    }
}

// Function to get the total number of items in the cart
function getTotalItems() {
    global $db_con;
    $user_id = getLoggedInUserId(); // Function to get the logged-in user's ID

    $get_items_query = "SELECT COUNT(*) AS total_items FROM cart WHERE user_id='$user_id'";
    $get_items_result = mysqli_query($db_con, $get_items_query);
    $row = mysqli_fetch_assoc($get_items_result);
    $count_items = $row['total_items'];

    echo json_encode(array("total_items" => $count_items));
}

// Function to get the total price of the cart
function getTotalPrice() {
    global $db_con;
    $user_id = getLoggedInUserId(); // Function to get the logged-in user's ID

    $get_price_query = "SELECT SUM(food.price * cart.quantity) AS total_price 
    FROM cart INNER JOIN food ON cart.food_id = food.id WHERE cart.user_id='$user_id'";
    $get_price_result = mysqli_query($db_con, $get_price_query);
    $row = mysqli_fetch_assoc($get_price_result);
    $total_price = $row['total_price'];

    echo json_encode(array("total_price" => $total_price));
}

// Function to view the cart items
function viewCart() {
    global $db_con;
    $user_id = getLoggedInUserId(); // Function to get the logged-in user's ID

    $query = "SELECT cart.food_id, food.name, food.price, food.image_name, cart.quantity FROM cart INNER JOIN food ON cart.food_id = food.id WHERE cart.user_id = '$user_id'";
    $result = mysqli_query($db_con, $query);

    $cart_items = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $item = array(
            "food_id" => $row['food_id'],
            "name" => $row['name'],
            "price" => $row['price'],
            "image_name" => $row['image_name'],
            "quantity" => $row['quantity']
        );
        $cart_items[] = $item;
    }

    echo json_encode($cart_items);
}

// Function to delete an item from the cart
function deleteFromCart() {
    global $db_con;

    if (isset($_POST['food_id'])) {
        $user_id = getLoggedInUserId(); // Function to get the logged-in user's ID
        $food_id = $_POST['food_id'];

        $delete_query = "DELETE FROM cart WHERE user_id='$user_id' AND food_id='$food_id'";
        $delete_result = mysqli_query($db_con, $delete_query);

        if ($delete_result) {
            echo json_encode(array("message" => "Item deleted from cart successfully"));
        } else {
            echo json_encode(array("message" => "Failed to delete item from cart"));
        }
    } else {
        echo json_encode(array("message" => "Invalid request"));
    }
}

// Function to update the quantity of an item in the cart
function updateCart() {
    global $db_con;

    if (isset($_POST['food_id']) && isset($_POST['quantity'])) {
        $user_id = getLoggedInUserId(); // Function to get the logged-in user's ID
        $food_id = $_POST['food_id'];
        $quantity = $_POST['quantity'];

        $update_query = "UPDATE cart SET quantity='$quantity' WHERE user_id='$user_id' AND food_id='$food_id'";
        $update_result = mysqli_query($db_con, $update_query);

        if ($update_result) {
            echo json_encode(array("message" => "Cart item updated successfully"));
        } else {
            echo json_encode(array("message" => "Failed to update cart item"));
        }
    } else {
        echo json_encode(array("message" => "Invalid request"));
    }
}

// Handle API requests
if (isset($_GET['api'])) {
    $api = $_GET['api'];

    switch ($api) {
        case 'add_to_cart':
            addToCart();
            break;
        case 'total_items':
            getTotalItems();
            break;
        case 'total_price':
            getTotalPrice();
            break;
        case 'view_cart':
            viewCart();
            break;
        case 'delete_from_cart':
            deleteFromCart();
            break;
        case 'update_cart':
            updateCart();
            break;
        default:
            echo json_encode(array("message" => "Invalid API request"));
    }
} else {
    echo json_encode(array("message" => "Invalid API request"));
}
?>
