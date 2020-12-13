<?php
    include_once "connect.php";
    session_start();

    $sql = mysqli_query($dbhandle, "INSERT INTO `uint` (`user_id`, `interest`) VALUES ('{$_SESSION['user_info'][0]}', '{$_POST['name']}')");


?>