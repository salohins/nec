<?php
    include_once "connect.php";
    session_start();

    $user_id = $_SESSION['user_info'][0];
    $sql = mysqli_query($dbhandle, "DELETE FROM uchat WHERE user_id='$user_id' AND chat_id='{$_POST['id']}'");

?>