-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 25, 2020 at 11:32 AM
-- Server version: 5.7.30-0ubuntu0.18.04.1
-- PHP Version: 7.2.24-0ubuntu0.18.04.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `DB3`
--

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE `chat` (
  `id` int(11) NOT NULL,
  `status` varchar(30) NOT NULL,
  `name` varchar(30) NOT NULL,
  `post_id` varchar(32) NOT NULL,
  `bg` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `friend`
--

CREATE TABLE `friend` (
  `user1` int(11) NOT NULL,
  `user2` int(11) NOT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `msg`
--

CREATE TABLE `msg` (
  `msg_id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `text` varchar(100) NOT NULL,
  `media` longblob,
  `time` varchar(30) NOT NULL,
  `chat_id` int(11) NOT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `uchat`
--

CREATE TABLE `uchat` (
  `user_id` varchar(11) NOT NULL,
  `chat_id` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `uint`
--

CREATE TABLE `uint` (
  `user_id` int(11) NOT NULL,
  `interest` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `uint`
--

INSERT INTO `uint` (`user_id`, `interest`) VALUES
(1, 'Business');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `prof_pic` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `prof_pic`) VALUES
(1, 'Sergejs Alohins', 'salohins@gmail.com', 'samsung0952', '../uploads/maxresdefault.jpg'),
(2, 'test1', 'test1', '1', '../uploads/random-dice.jpg'),
(3, 'test2', 'test2', '1', '../uploads/OIPO46F5Y3G.jpg'),
(4, 'test3', 'test3', '1', '../uploads/images.jpg'),
(5, 'celine', 'celine', 'celine', '../img/prof.jpg'),
(6, 'stig', 'stig', 'stig', '../img/prof.jpg'),
(7, 'corina', 'corina', 'corina', '../img/prof.jpg'),
(8, 'ahmet', 'ahmet', 'ahmet', '../img/prof.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `post_id` (`post_id`);

--
-- Indexes for table `friend`
--
ALTER TABLE `friend`
  ADD UNIQUE KEY `user1` (`user1`,`user2`),
  ADD UNIQUE KEY `user1_2` (`user1`,`user2`);

--
-- Indexes for table `msg`
--
ALTER TABLE `msg`
  ADD PRIMARY KEY (`msg_id`);

--
-- Indexes for table `uchat`
--
ALTER TABLE `uchat`
  ADD UNIQUE KEY `user_id` (`user_id`,`chat_id`);

--
-- Indexes for table `uint`
--
ALTER TABLE `uint`
  ADD UNIQUE KEY `user_id` (`user_id`,`interest`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;
--
-- AUTO_INCREMENT for table `msg`
--
ALTER TABLE `msg`
  MODIFY `msg_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=867;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
