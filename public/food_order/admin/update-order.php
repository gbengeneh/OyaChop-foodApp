<?php include('partials/menu.php'); ?>

<div class="main-content">
    <div class="wrapper">
        <h1>Update Order</h1><br><br>
        <h2 style="color: green;">You can only update the <i style="color: red;"> Status</i> from Here</i></h2>
        <br><br>


        <?php 
        
            //CHeck whether id is set or not
            if(isset($_GET['order_id']))
            {
                //GEt the Order Details
                $id=$_GET['order_id'];

                //Get all other details based on this id
                //SQL Query to get the order details
                $sql = "SELECT * FROM orders
                INNER JOIN tbl_food ON orders.food_id = tbl_food.id
                INNER JOIN delivery_details ON orders.user_id = delivery_details.user_id
                INNER JOIN users ON orders.user_id = users.user_id
                 WHERE order_id='$id'";
                //Execute Query
                // tbl_food.id, tbl_food.title, tbl_food.image_name,tbl_food.price, status,quantity, order_date
                $res = mysqli_query($conn, $sql);
                //Count Rows
                $count = mysqli_num_rows($res);

                if($count==1)
                {
                    //Detail Availble
                    $row=mysqli_fetch_assoc($res);

                    $food = $row['title'];
                    $price = $row['price'];
                    $qty = $row['quantity'];
                    $status = $row['status'];
                    $customer_name = $row['firstname']. " ". $row['lastname'];
                    $customer_contact = $row['phone_number'];
                    $customer_email = $row['email'];
                    $customer_address= $row['delivery_address'];
                }
                else
                {
                    //DEtail not Available/
                    //Redirect to Manage Order
                    header('location:'.SITEURL.'admin/manage-order.php');
                }
            }
            else
            {
                //REdirect to Manage ORder PAge
                header('location:'.SITEURL.'admin/manage-order.php');
            }
        
        ?>

        <form action="" method="POST">
        
            <table class="tbl-30">
                <tr>
                    <td>Food Name</td>
                    <td><b> <?php echo $food; ?> </b></td>
                </tr>

                <tr>
                    <td>Price</td>
                    <td>
                        <b> $ <?php echo $price; ?></b>
                    </td>
                </tr>

                <tr>
                    <td>Qty</td>
                    <td>
                        <input type="number" name="qty" value="<?php echo $qty; ?>" >
                    </td>
                </tr>

                <tr>
                    <td>Status</td>
                    <td>
                        <select name="status" style="background-color: green; color:white ">
                            <option <?php if($status=="Ordered"){echo "selected";} ?> value="Ordered">Ordered</option>
                            <option <?php if($status=="On Delivery"){echo "selected";} ?> value="On Delivery">On Delivery</option>
                            <option <?php if($status=="Delivered"){echo "selected";} ?> value="Delivered">Delivered</option>
                            <option <?php if($status=="Cancelled"){echo "selected";} ?> value="Cancelled">Cancelled</option>
                        </select>
                    </td>
                </tr>

                <tr>
                    <td>Customer Name: </td>
                    <td>
                        <input type="text" name="customer_name" value="<?php echo $customer_name; ?>">
                    </td>
                </tr>

                <tr>
                    <td>Customer Contact: </td>
                    <td>
                        <input type="text" name="customer_contact" value="<?php echo $customer_contact; ?>">
                    </td>
                </tr>

                <tr>
                    <td>Customer Email: </td>
                    <td>
                        <input type="text" name="customer_email" value="<?php echo $customer_email; ?>">
                    </td>
                </tr>

                <tr>
                    <td>Customer Address: </td>
                    <td>
                        <textarea name="customer_address" cols="30" rows="5"><?php echo $customer_address; ?></textarea>
                    </td>
                </tr>

                <tr>
                    <td clospan="2">
                        <input type="hidden" name="id" value="<?php echo $id; ?>">
                        <input type="hidden" name="price" value="<?php echo $price; ?>">

                        <input type="submit" name="submit" value="Update Order" class="btn-secondary">
                    </td>
                </tr>
            </table>
        
        </form>


        <?php 
            //CHeck whether Update Button is Clicked or Not
            if(isset($_POST['submit']))
            {
           

                $status = $_POST['status'];

               

                //Update the Values
                $sql2 = "UPDATE orders SET  status = '$status' WHERE order_id=$id ";

                //Execute the Query
                $res2 = mysqli_query($conn, $sql2);

                //CHeck whether update or not
                //And REdirect to Manage Order with Message
                if($res2==true)
                {
                    //Updated
                    $_SESSION['update'] = "<div class='success'>Order Updated Successfully.</div>";
                    header('location:'.SITEURL.'admin/manage-order.php');
                }
                else
                {
                    //Failed to Update
                    $_SESSION['update'] = "<div class='error'>Failed to Update Order.</div>";
                    header('location:'.SITEURL.'admin/manage-order.php');
                }
            }
            // -- qty = $qty,
            //-- total = $total,
           // status = '$status'
           // -- firstname = '$firstname',
            //--  lastname= '$lastname',                   
            //-- customer_contact = '$phone_number',
            //-- customer_email = '$email',
            //-- customer_address = '$delivery_address'
            // WHERE order_id=$order_id
        
        ?>


    </div>
</div>

<?php include('partials/footer.php'); ?>
