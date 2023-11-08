<?php include('partials/menu.php'); ?>

<div class="main-content">
    <div class="wrapper">
        <h1>Manage Order</h1>

        <br /><br /><br />

        <?php
        if (isset($_SESSION['update'])) {
            echo $_SESSION['update'];
            unset($_SESSION['update']);
        }
        ?>
        <br><br>

        <table class="tbl-full">
            <tr>
                <th>S.N.</th>
                <th>Food</th>
                <th>Price</th>
                <th>Qty.</th>
                <th>Total</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Customer Name</th>
                <th>Contact</th>
                <th>Nearest Landmark</th>
                <th>Address</th>
                <th>Actions</th>
            </tr>

            <?php
            // Modify your SQL query to join the orders, users, and tbl_food tables
            $sql = "SELECT *  FROM orders
                   INNER JOIN tbl_food ON orders.food_id = tbl_food.id
                   INNER JOIN delivery_details ON orders.user_id = delivery_details.user_id
                   INNER JOIN users ON orders.user_id = users.user_id
                  
                   ORDER BY orders.order_id DESC";
/* tbl_food.title AS food_title, 
tbl_food.price AS food_price,
users.firstname AS firstname,
users.lastname AS lastname,
users.phone_number AS customer_contact,
users.delivery_address AS customer_address*/
            // Execute Query
            $res = mysqli_query($conn, $sql);

            // Check if the query executed successfully
            if ($res) {
                $count = mysqli_num_rows($res);
                $sn = 1; // Create a Serial Number and set its initial value as 1

                if ($count > 0) {
                    // Orders Available
                    while ($row = mysqli_fetch_assoc($res)) {
                        // Fetch data from the result set
                        $id=$row['order_id'];
                        $food_name = $row['title'];
                        $food_price = $row['price'];
                        $food_qty = $row['quantity'];
                        $food_order_date = $row['order_date'];
                        $food_status = $row['status'];
                        $fullname = $row['firstname']. " ". $row['lastname'];
                        $contact = $row['phone_number'];
                        $nearest_landmark = $row['closest_landmark'];
                        $delivery_address = $row['delivery_address'];

                        // Display the data in the table
                        ?>
                        <tr>
                            <td><?php echo $sn++; ?>. </td>
                            <td><?php echo $food_name; ?></td>
                            <td><?php echo $food_price; ?></td>
                            <td><?php echo $food_qty; ?></td>
                            <td><?php echo $food_price * $food_qty; ?></td>
                            <td><?php echo $food_order_date; ?></td>
                            <td><?php echo $food_status; ?></td>
                            <td><?php echo $fullname; ?></td>
                            <td><?php echo $contact; ?></td>
                            <td><?php echo $nearest_landmark; ?></td>
                            <td><?php echo $delivery_address; ?></td>
                            <td>
                                <a href="<?php echo SITEURL; ?>admin/update-order.php?id=<?php echo $id; ?>"class="btn-secondary">Update Order</a>
                               
                            </td>
                        </tr>
                        <?php
                    }
                } else {
                    // No Orders Available
                    echo "<tr><td colspan='12' class='error'>No orders available.</td></tr>";
                }
            } else {
                // Query execution failed, handle the error
                echo "Query execution failed: " . mysqli_error($conn);
            }
            ?>
        </table>
    </div>
</div>

<?php include('partials/footer.php'); ?>
