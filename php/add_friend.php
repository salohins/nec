<?php
    include_once "connect.php";
    session_start();

    $status = $_POST['status'];

    if ($status == "pending") {
        $sql = "INSERT INTO friend (user1, user2, status) VALUES ('{$_SESSION['user_info'][0]}', '{$_POST['user_id']}', 'pending')";
        $dbhandle->query($sql);
    }
    else if ($status == "friend") {
        $sql = "UPDATE friend SET status = 'friend' WHERE user1='{$_POST['user_id']}' AND user2='{$_SESSION['user_info'][0]}'";
        $dbhandle->query($sql);
    }  
?>