
<?php include('partials/menu.php'); ?>

        <!-- Main Content Section Starts -->
        <div class="main-content">
            <div class="wrapper">
                <h1>Dashboard</h1>
                <br><br>
                <?php 
                    if(isset($_SESSION['login']))
                    {
                        echo $_SESSION['login'];
                        unset($_SESSION['login']);
                    }
                ?>
                <br><br>

                <div class="col-4 text-center">

                    <?php 
                        //Sql Query 
                        $sql = "SELECT * FROM tbl_category";
                        //Execute Query
                        $res = mysqli_query($conn, $sql);
                        //Count Rows
                        $count = mysqli_num_rows($res);
                    ?>

                    <h1><?php echo $count; ?></h1>
                    <br />
                    Categories
                </div>

                <div class="col-4 text-center">

                    <?php 
                        //Sql Query 
                        $sql2 = "SELECT * FROM tbl_food";
                        //Execute Query
                        $res2 = mysqli_query($conn, $sql2);
                        //Count Rows
                        $count2 = mysqli_num_rows($res2);
                    ?>

                    <h1><?php echo $count2; ?></h1>
                    <br />
                    Foods
                </div>

                <div class="col-4 text-center">
                    
                    <?php 
                        //Sql Query 
                        $sql3 = "SELECT * FROM orders";
                        //Execute Query
                        $res3 = mysqli_query($conn, $sql3);
                        //Count Rows
                        $count3 = mysqli_num_rows($res3);
                    ?>

                    <h1><?php echo $count3; ?></h1>
                    <br />
                    Total Orders
                </div>

                <div class="col-4 text-center">
                    
                    <?php 
                           
                           // Create SQL Query to Get Total Revenue Generated
                           $sql4 = "SELECT tbl_food.price, SUM(price * quantity) AS total_revenue FROM orders
                           INNER JOIN tbl_food ON orders.food_id = tbl_food.id
                           WHERE status='Delivered'";
                           
                           // Execute the Query
                           $res4 = mysqli_query($conn, $sql4);
                           
                           if ($res4) {
                               $row4 = mysqli_fetch_assoc($res4);
                               $total_revenue = $row4['total_revenue'];
                           } else {
                               // Query execution failed, handle the error
                               echo "Query execution failed: " . mysqli_error($conn);
                             
                           }
                           ?>
                           
                           <h1>N<?php echo isset($total_revenue) ? $total_revenue : 0; ?></h1>
                           <br />
                           


                    

                    Revenue Generated
                </div>

                <div class="clearfix"></div>

            </div>
        </div>
        <!-- Main Content Setion Ends -->

<?php include('partials/footer.php') ?>