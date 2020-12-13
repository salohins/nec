<?php
    include_once "connect.php";
    session_start();
    $user_id = $_SESSION['user_info'][0];

    $sql = mysqli_query($dbhandle, "DELETE FROM friend WHERE user2='$user_id' AND user1='{$_POST['id']}'");

?>