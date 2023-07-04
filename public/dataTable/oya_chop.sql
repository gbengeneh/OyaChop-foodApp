-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 03, 2023 at 03:45 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

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
  `id` int(10) UNSIGNED NOT NULL,
  `food_id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `quantity` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(36, 'Sausage Rolls', 'yummy and tasty', 500.00, 'Food-Name-8829.jpg', 16, 'Yes', 'Yes'),
(37, 'Coca-cola 2', 'A can of chilled coke', 300.00, 'Food-Name-6655.jpg', 17, 'Yes', 'Yes');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_order`
--

CREATE TABLE `tbl_order` (
  `id` int(10) UNSIGNED NOT NULL,
  `food` varchar(150) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `qty` int(11) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `order_date` datetime NOT NULL,
  `status` varchar(50) NOT NULL,
  `customer_name` varchar(150) NOT NULL,
  `customer_contact` varchar(20) NOT NULL,
  `customer_email` varchar(150) NOT NULL,
  `customer_address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tbl_order`
--

INSERT INTO `tbl_order` (`id`, `food`, `price`, `qty`, `total`, `order_date`, `status`, `customer_name`, `customer_contact`, `customer_email`, `customer_address`) VALUES
(1, 'Sadeko Momo', 6.00, 3, 18.00, '2020-11-30 03:49:48', 'Delivered', 'Bradley Farrell', '+1 (576) 504-4657', 'zuhafiq@mailinator.com', 'Duis aliqua Qui lor'),
(2, 'Best Burger', 4.00, 4, 16.00, '2020-11-30 03:52:43', 'Cancelled', 'Kelly Dillard', '+1 (908) 914-3106', 'fexekihor@mailinator.com', 'Incidunt ipsum ad d'),
(3, 'Mixed Pizza', 10.00, 2, 20.00, '2020-11-30 04:07:17', 'Delivered', 'Jana Bush', '+1 (562) 101-2028', 'tydujy@mailinator.com', 'Minima iure ducimus'),
(4, 'Eforiro with Fufu', 13.00, 13, 169.00, '2023-06-09 11:30:55', 'Ordered', 'john Bassey', '6278637594', 'ljze9@nsln.com', '1 ore street Lagos');

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
(1, 'Mark', 'Jason', 'jason@gmail.com', 'male', '09067565656', 'lekki epe', '827ccb0eea8a706c4c34a16891f84e7b', 0x696d616765732f66616c6c6261636b5f706167652e504e47),
(4, 'Tunde', 'Jason', 'babatunde@hotmail.com', 'male', '09067565656', 'lekki epe', '79b7cdcd14db14e9cb498f1793817d69', 0x696d616765732f494d475f32303232313030395f3137333732382e6a7067),
(5, 'ddd', 'dd', 'dd@gmail.com', 'male', 'sss', 'dd', '21ad0bd836b90d08f4cf640b4c298e7c', 0x696d616765732f494d475f32303232313031345f3131323632352e6a7067),
(52, 'Babajide', 'Tella', 'j.telher@gmail.com', 'male', '07038231868', '14, Igun street', '76679c6b97757bc3b2af3b100ee88227', 0x696d616765732f494d475f32303139303230365f3233343433355f3630362e6a7067),
(63, 'Baba', 'Tella', 'j.tel@gmail.com', 'male', '09087675645', '12, solanke street', 'e807f1fcf82d132f9bb018ca6738a19f', 0x696d616765732f494d475f32303139303230365f3233343433355f3630362e6a7067),
(65, 'Babaj', 'Tella', 'j.tello@gmail.com', 'male', '09087675654', '12, Forbes Street', 'e807f1fcf82d132f9bb018ca6738a19f', 0x696d616765732f494d475f32303139303230365f3233343433355f3630362e6a7067),
(66, 'babad', 'teller', 'j.tellerh@gmail.com', 'male', '09089786545', '12, goddsport', '6fb42da0e32e07b61c9f0251fe627a9c', 0x696d616765732f494d475f32303139303230365f3233343433355f3630362e6a7067),
(67, 'Taiwo', 'Collins', 'kenneth@gmail.com', 'male', '09087675645', '12, Forbes street', 'e807f1fcf82d132f9bb018ca6738a19f', 0x696d616765732f494d475f32303139303230365f3233343433355f3630362e6a7067);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
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
-- Indexes for table `tbl_order`
--
ALTER TABLE `tbl_order`
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
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

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
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `tbl_order`
--
ALTER TABLE `tbl_order`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
