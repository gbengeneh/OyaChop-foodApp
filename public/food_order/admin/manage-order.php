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
                <th>Email</th>
                <th>Address</th>
                <th>Actions</th>
            </tr>

            <?php
            // Get all the orders from the database
            $sql = "SELECT * FROM orders, delivery_details WHERE orders.user_id = delivery_details.user_id ORDER BY id DESC";

            // Execute Query
            $res = mysqli_query($conn, $sql);

            // Count the Rows
            $count = mysqli_num_rows($res);

            $sn = 1; // Create a Serial Number and set its initial value as 1

            if ($count > 0) {
                // Order Available
                while ($row = mysqli_fetch_assoc($res)) {
                    $user_id = $row['user_id'];

                    // Get all the order details
                    $food_id = $row['id'];
                    $food_qty = $row['quantity'];
                    $food_order_date = $row['order_date'];
                    $food_status = $row['status'];

                    // Fetch food details from the food table
                    $food_query = "SELECT * FROM tbl_food, users WHERE food_id = $food_id and user_id=$user_id";
                    $food_result = mysqli_query($conn, $food_query);
                    $food_row = mysqli_fetch_assoc($food_result);

                    $food_name = $food_row['title'];
                    $food_price = $food_row['price'];

                    ?>
                    <tr>
                        <td><?php echo $sn++; ?>. </td>
                        <td><?php echo $food_name; ?></td>
                        <td><?php echo $food_price; ?></td>
                        <td><?php echo $food_qty; ?></td>
                        <td><?php echo $food_price * $food_qty; ?></td>
                        <td><?php echo $food_order_date; ?></td>
                        <td><?php echo $food_status; ?></td>
                        <td><?php echo $row['fullname']; ?></td>
                        <td><?php echo $row['phone_number']; ?></td>
                        <td><?php echo $row['email']; ?></td>
                        <td><?php echo $row['delivery_address']; ?></td>
                        <td>
                            <a href="<?php echo SITEURL; ?>admin/update-order.php?id=<?php echo $food_id; ?>" class="btn-secondary">Update Order</a>
                        </td>
                    </tr>
            <?php
                }
            } else {
                // Order not Available
                echo "<tr><td colspan='12' class='error'>Orders not Available</td></tr>";
            }
            ?>
        </table>
    </div>
</div>

<?php include('partials/footer.php'); ?>
