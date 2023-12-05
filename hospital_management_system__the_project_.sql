-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 05, 2023 at 11:40 PM
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
-- Database: `hospital management system (the project)`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `patient_id` int(11) DEFAULT NULL,
  `appointment_date` date NOT NULL,
  `appointment_start_time` datetime NOT NULL,
  `appointment_end_time` datetime NOT NULL,
  `appointment_status` enum('Booked','Available','Pending','Canceled') NOT NULL DEFAULT 'Available'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`id`, `doctor_id`, `patient_id`, `appointment_date`, `appointment_start_time`, `appointment_end_time`, `appointment_status`) VALUES
(8, 53, NULL, '2023-12-13', '2023-12-13 01:00:00', '2023-12-13 02:00:00', 'Available'),
(9, 53, 1, '2023-12-07', '2023-12-07 03:00:00', '2023-12-07 04:00:00', 'Pending'),
(10, 53, NULL, '2023-12-11', '2023-12-11 01:00:00', '2023-12-11 05:00:00', 'Available'),
(11, 54, 1, '2023-12-15', '2023-12-15 01:03:00', '2023-12-15 04:03:00', 'Booked'),
(12, 54, 1, '2023-12-19', '2023-12-19 02:03:00', '2023-12-19 04:03:00', 'Booked'),
(13, 54, NULL, '2023-12-13', '2023-12-13 01:03:00', '2023-12-13 03:03:00', 'Available');

-- --------------------------------------------------------

--
-- Table structure for table `doctors`
--

CREATE TABLE `doctors` (
  `doctor_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctors`
--

INSERT INTO `doctors` (`doctor_id`) VALUES
(53),
(54),
(55),
(56);

-- --------------------------------------------------------

--
-- Table structure for table `medical_history`
--

CREATE TABLE `medical_history` (
  `id` int(255) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `diagnosis` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `medical_history`
--

INSERT INTO `medical_history` (`id`, `patient_id`, `date`, `diagnosis`) VALUES
(15, 57, '2023-12-06 00:01:33', 'drink 2 water cups'),
(16, 57, '2023-12-06 00:01:45', 'drink 3 water cups'),
(17, 57, '2023-12-06 00:01:51', 'drink 4 water cups'),
(18, 59, '2023-12-06 00:02:09', 'drink 2 water cups');

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE `patients` (
  `patient_id` int(11) NOT NULL,
  `room_number` int(10) DEFAULT NULL,
  `assigned_dr` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`patient_id`, `room_number`, `assigned_dr`) VALUES
(57, 53, 53),
(58, NULL, 54),
(59, NULL, NULL),
(60, 54, 53);

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `room_id` int(10) NOT NULL,
  `room_name` varchar(255) NOT NULL,
  `room_status` enum('Free','Used') NOT NULL DEFAULT 'Free',
  `room_patient` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`room_id`, `room_name`, `room_status`, `room_patient`) VALUES
(51, 'Emergency Room', 'Free', NULL),
(52, 'Room 1', 'Free', NULL),
(53, 'Room 2', 'Used', 57),
(54, 'Room 3', 'Used', 60),
(55, 'Room 4', 'Free', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('Admin','Doctor','Patient') NOT NULL,
  `name` varchar(255) NOT NULL,
  `gender` enum('Male','Female') NOT NULL,
  `phone` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `role`, `name`, `gender`, `phone`) VALUES
(52, 'admin', '$2y$10$Mz55f5lIpGtOF4NkyLpEDu.yJgX3M5bQgNGn1256p6AOjjY5ctHyC', 'Admin', 'admin khaweja', 'Male', '000000000'),
(53, 'doctor1', '$2y$10$dF3Xr.gCLsuhY2GfucyNOeFKHab7qBjkrkGvv8ZJMvWnXizA8Dsj2', 'Doctor', 'doctor1', 'Female', '111111'),
(54, 'doctor2', '$2y$10$jYUXyQO32vinE4Q37RT7buamSsX9sTzpkKOGjEjnGoF4Oc6F6F0zW', 'Doctor', 'doctor2', 'Male', '2222222'),
(55, 'doctor3', '$2y$10$JXAVwV8bZLwr0mbTtS8TQuEu8reSM4eQqdmBgiCn1rjXnkqFRu.5K', 'Doctor', 'doctor3', 'Male', '3333333'),
(56, 'doctor4', '$2y$10$mBRRrZqTjp3Fi9y9JQAA7.VzT7n4zKd2LoPLbWjXwfnEkJU1EKas.', 'Doctor', 'doctor4', 'Female', '444444'),
(57, 'patient1', '$2y$10$y9oCqXsP8.cDB4s3rRd7kOuaxZpimKTIeUtce8zyScokiYzvqodZC', 'Patient', 'patient1', 'Male', '555555'),
(58, 'patient2', '$2y$10$UJVMQgylSGMXzGxZOiiMOepJLPIJVoHHaeiiefOxojGH566BbWAR6', 'Patient', 'patient2', 'Female', '666666'),
(59, 'patient3', '$2y$10$kG37h14mdkAsxNP7IJvyyOUs0PFtjua9kZXT6r8ZL8eQqFf1ydC52', 'Patient', 'patient3', 'Male', '777777'),
(60, 'patient4', '$2y$10$NfY.uWArNxBZCFSsgeTgh.OAxScJWMQ0SgwUeCT4yMtAEEHEje0yi', 'Patient', 'patient4', 'Female', '888888');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `appointments_ibfk_1` (`doctor_id`),
  ADD KEY `appointments_ibfk_2` (`patient_id`);

--
-- Indexes for table `doctors`
--
ALTER TABLE `doctors`
  ADD KEY `doctors_ibfk_1` (`doctor_id`);

--
-- Indexes for table `medical_history`
--
ALTER TABLE `medical_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `medical_history_ibfk_1` (`patient_id`);

--
-- Indexes for table `patients`
--
ALTER TABLE `patients`
  ADD KEY `patients_ibfk_1` (`patient_id`),
  ADD KEY `assigned_dr` (`assigned_dr`),
  ADD KEY `patients_ibfk_4` (`room_number`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`room_id`),
  ADD UNIQUE KEY `room_name` (`room_name`),
  ADD KEY `room_patient` (`room_patient`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `medical_history`
--
ALTER TABLE `medical_history`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `room_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`doctor_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `doctors`
--
ALTER TABLE `doctors`
  ADD CONSTRAINT `doctors_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `medical_history`
--
ALTER TABLE `medical_history`
  ADD CONSTRAINT `medical_history_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`patient_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `patients`
--
ALTER TABLE `patients`
  ADD CONSTRAINT `patients_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `patients_ibfk_3` FOREIGN KEY (`assigned_dr`) REFERENCES `doctors` (`doctor_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `patients_ibfk_4` FOREIGN KEY (`room_number`) REFERENCES `rooms` (`room_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`room_patient`) REFERENCES `patients` (`patient_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
