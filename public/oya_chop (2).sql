-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 15, 2023 at 11:38 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `oya_chop`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `food_id` int(10) NOT NULL,
  `quantity` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `user_id`, `food_id`, `quantity`) VALUES
(1, 63, 17, 5),
(164, 78, 17, 2),
(165, 78, 18, 1),
(198, 80, 18, 1),
(199, 80, 19, 1),
(200, 80, 16, 1),
(211, 69, 38, 1),
(214, 69, 18, 1),
(216, 69, 16, 1),
(218, 1, 16, 2),
(219, 1, 17, 1),
(220, 1, 18, 1),
(221, 2, 16, 1),
(222, 2, 19, 1),
(223, 8, 16, 2),
(224, 8, 17, 1),
(225, 8, 18, 1);

-- --------------------------------------------------------

--
-- Table structure for table `delivery_details`
--

CREATE TABLE `delivery_details` (
  `id` int(11) UNSIGNED NOT NULL,
  `user_id` int(10) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `phone_number` varchar(15) NOT NULL,
  `closest_landmark` varchar(550) DEFAULT NULL,
  `delivery_address` varchar(550) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `delivery_details`
--

INSERT INTO `delivery_details` (`id`, `user_id`, `firstname`, `lastname`, `phone_number`, `closest_landmark`, `delivery_address`) VALUES
(6, 8, 'Young ', 'Blood', '11', 'BetBonaza', '090876'),
(7, 9, 'Tella Babajide', 'Papay', '08078765344', 'Null', '14, Adeola Street'),
(8, 10, 'young', 'alhaji', '908899876678', 'Null', 'lord lugard ave'),
(9, 11, 'Test', 'Account', '08089789687', 'Null', 'Hello World Street');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(10) UNSIGNED NOT NULL,
  `user_id` varchar(350) NOT NULL,
  `food_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `transaction_id` varchar(255) NOT NULL,
  `order_date` datetime NOT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `food_id`, `quantity`, `transaction_id`, `order_date`, `status`) VALUES
(1, '10', 16, 1, '5ge4f2c', '2023-09-24 00:00:00', 'Delivered '),
(2, '10', 17, 1, '5ge4f2c', '2023-09-24 00:00:00', 'Delivered'),
(3, '11', 16, 1, '76g3a9d', '2023-09-24 00:00:00', 'On Delivery'),
(4, '11', 17, 1, '76g3a9d', '2023-09-24 00:00:00', 'ordered'),
(5, '11', 18, 1, '76g3a9d', '2023-09-24 00:00:00', 'Delivered'),
(6, '11', 19, 1, '76g3a9d', '2023-09-24 00:00:00', 'Delivered'),
(7, '11', 16, 1, '0c526hb', '2023-09-26 00:00:00', 'Delivered'),
(8, '11', 17, 1, '0c526hb', '2023-09-26 00:00:00', 'Completed'),
(9, '11', 17, 1, '649g8fa', '2023-09-27 00:00:00', 'Delivered'),
(10, '11', 16, 1, '649g8fa', '2023-09-27 00:00:00', 'Pending'),
(11, '11', 16, 1, 'eb5dhf3', '2023-10-02 15:18:16', 'Pending'),
(12, '11', 17, 2, 'eb5dhf3', '2023-10-02 15:18:16', 'Pending'),
(13, '11', 18, 1, 'eb5dhf3', '2023-10-02 15:18:16', 'Pending'),
(14, '11', 19, 1, 'eb5dhf3', '2023-10-02 15:18:16', 'Pending'),
(15, '11', 17, 2, '0g7d183', '2023-10-15 20:42:46', 'Pending'),
(16, '11', 16, 1, '0g7d183', '2023-10-15 20:42:46', 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `pay_gateway`
--

CREATE TABLE `pay_gateway` (
  `id` int(10) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `card_holder` varchar(100) NOT NULL,
  `card_number` varchar(156) NOT NULL,
  `expire_month` int(15) NOT NULL,
  `expire_year` int(15) NOT NULL,
  `cvv` int(15) NOT NULL,
  `amount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pay_gateway`
--

INSERT INTO `pay_gateway` (`id`, `user_id`, `card_holder`, `card_number`, `expire_month`, `expire_year`, `cvv`, `amount`) VALUES
(1, '9', 'Tella Babajide Papay', '79395651835986110', 12, 2027, 154, 236255),
(2, '10', 'young alhaji', '955333103934554705', 1, 2028, 546, 58490),
(3, '11', 'Test Account', '306723599955648871', 11, 2027, 615, 334466);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_admin`
--

CREATE TABLE `tbl_admin` (
  `id` int(10) UNSIGNED NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tbl_admin`
--

INSERT INTO `tbl_admin` (`id`, `full_name`, `username`, `password`) VALUES
(12, 'Administrator', 'admin', '21232f297a57a5a743894a0e4a801fc3');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_category`
--

CREATE TABLE `tbl_category` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(100) NOT NULL,
  `image_name` varchar(255) NOT NULL,
  `featured` varchar(10) NOT NULL,
  `active` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tbl_category`
--

INSERT INTO `tbl_category` (`id`, `title`, `image_name`, `featured`, `active`) VALUES
(14, 'Local Dish', 'Food_Category_492.jpg', 'Yes', 'Yes'),
(15, 'Rice', 'Food_Category_778.jpg', 'Yes', 'Yes'),
(16, 'Snacks', 'Food_Category_51.jpg', 'Yes', 'Yes'),
(17, 'Drinks', 'Food_Category_394.jpg', 'Yes', 'Yes');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_food`
--

CREATE TABLE `tbl_food` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image_name` varchar(255) NOT NULL,
  `category_id` int(10) UNSIGNED NOT NULL,
  `featured` varchar(10) NOT NULL,
  `active` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tbl_food`
--

INSERT INTO `tbl_food` (`id`, `title`, `description`, `price`, `image_name`, `category_id`, `featured`, `active`) VALUES
(16, 'Eba with Efo riro', 'delicious and yummy', 1500.00, 'Food-Name-5776.jpg', 14, 'Yes', 'Yes'),
(17, 'Amala with Ewedu Soup', 'delicious and yummy', 1000.00, 'Food-Name-76.jpg', 14, 'Yes', 'Yes'),
(18, 'Cheese with Pupkin Soup', 'delicious and yummy', 1800.00, 'Food-Name-7752.jpg', 14, 'Yes', 'Yes'),
(19, 'White Rice with Beef', 'crispy and tasty', 2000.00, 'Food-Name-2512.jpg', 15, 'Yes', 'Yes'),
(21, 'Pounded Yam with Egusi Soup', 'delicious and yummy', 1800.00, 'Food-Name-3379.jpg', 14, 'Yes', 'Yes'),
(22, 'Fried Rice with Chicken', 'crispy and tasty', 2000.00, 'Food-Name-5064.jpg', 15, 'Yes', 'Yes'),
(23, 'Jollof Rice with Chicken', 'crispy and tasty', 1200.00, 'Food-Name-6579.jpg', 15, 'Yes', 'Yes'),
(24, 'Ofada Rice with Beef', 'delicious and yummy', 1400.00, 'Food-Name-196.jpg', 15, 'Yes', 'Yes'),
(25, 'Sweet Potatoes Chickpea', 'sweet and delicious', 1600.00, 'Food-Name-4463.jpg', 16, 'Yes', 'Yes'),
(26, 'Sorrel Soup', 'magnificent taste', 1500.00, 'Food-Name-5540.jpg', 14, 'Yes', 'Yes'),
(27, 'Eba with Edikang Ikong', 'tasty and delicious', 2000.00, 'Food-Name-4850.jpg', 14, 'Yes', 'Yes'),
(28, 'Porriage', 'sweet taste', 1800.00, 'Food-Name-1756.jpg', 14, 'Yes', 'Yes'),
(29, 'Vegetable Salad', 'natural tasty feeling', 1300.00, 'Food-Name-3593.jpg', 16, 'Yes', 'Yes'),
(30, 'White Rice and Stew', 'crispy and delicious', 1700.00, 'Food-Name-9258.jpg', 15, 'Yes', 'Yes'),
(31, 'Coca-cola 1', 'chilled drink', 200.00, 'Food-Name-486.jpg', 17, 'Yes', 'Yes'),
(32, 'Pepsi', 'cold and chilled drink', 200.00, 'Food-Name-9751.jpg', 17, 'Yes', 'Yes'),
(33, 'Maltina 1', 'chilled drink', 300.00, 'Food-Name-7094.jpg', 17, 'Yes', 'Yes'),
(34, 'Coca-cola Pack', 'A pack of coke for yourself, friends and family', 1900.00, 'Food-Name-7277.jpg', 17, 'Yes', 'Yes'),
(35, 'Meat Pie', 'delicious and yummy', 1200.00, 'Food-Name-105.jpg', 16, 'Yes', 'Yes'),
(38, 'Sausage', 'tasty and yummy', 400.00, 'Food-Name-5478.jpg', 16, 'Yes', 'Yes');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `firstname` varchar(250) NOT NULL,
  `lastname` varchar(250) NOT NULL,
  `email` varchar(50) NOT NULL,
  `gender` varchar(15) NOT NULL,
  `phone_number` varchar(11) NOT NULL,
  `delivery_address` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `picture` blob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `firstname`, `lastname`, `email`, `gender`, `phone_number`, `delivery_address`, `password`, `picture`) VALUES
(1, 'Tella', 'Babajide', 'jay@gmail.com', 'male', '07038231868', '10, Sholanke Street', 'fcea920f7412b5da7be0cf42b8c93759', 0x696d616765732f494d475f32303139303833305f3136313934355f3333332e6a7067),
(2, 'Young', 'Lord', 'lord@gmail.com', 'male', '09087675646', '12, Avenue Street, Island', 'e807f1fcf82d132f9bb018ca6738a19f', 0x696d616765732f494d475f32303139303732315f3136333135305f322e6a7067),
(8, 'Babajide', 'Iyiola', 'baba@gmail.com', 'male', '09089876564', '14, Adeola Street', '781e5e245d69b566979b86e28d23f2c7', 0x696d616765732f646f776e6c6f6164202831292e6a7067),
(9, 'Tella Babajide', 'Papay', 'jide@gmail.com', 'male', '08078765344', '14, Adeola Street', '5a8b4a0b6030a06557e7de82656a8b0c', 0x696d616765732f494d475f32303139313032325f3033353832345f3738382e6a7067),
(10, 'young', 'alhaji', 'babajay@gmail.com', 'male', '90889987667', 'lord lugard ave', '22975d8a5ed1b91445f6c55ac121505b', 0x696d616765732f626c616e6b2d70726f66696c652d706963747572652e706e672e6a7067),
(11, 'Test', 'Account', 'test@gmail.com', 'male', '08089789687', 'Hello World Street', 'e807f1fcf82d132f9bb018ca6738a19f', 0x696d616765732f494d475f32303139303732315f3136333135305f322e6a7067);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `delivery_details`
--
ALTER TABLE `delivery_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `pay_gateway`
--
ALTER TABLE `pay_gateway`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_admin`
--
ALTER TABLE `tbl_admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_category`
--
ALTER TABLE `tbl_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_food`
--
ALTER TABLE `tbl_food`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=248;

--
-- AUTO_INCREMENT for table `delivery_details`
--
ALTER TABLE `delivery_details`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `pay_gateway`
--
ALTER TABLE `pay_gateway`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_admin`
--
ALTER TABLE `tbl_admin`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `tbl_category`
--
ALTER TABLE `tbl_category`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `tbl_food`
--
ALTER TABLE `tbl_food`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
