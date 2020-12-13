<?php
    include_once "connect.php";
    session_start();

    $user_id = $_SESSION['user_info'][0];
    $notifications = 0;

    $sql0 = mysqli_query($dbhandle, "SELECT * FROM chat WHERE post_id = '{$_POST['group_id']}'");
    $row0 = mysqli_fetch_array($sql0);

    $sql = mysqli_query($dbhandle, "SELECT * FROM msg WHERE chat_id = '{$row0['id']}' AND status = 'delivered' AND sender_id <> '$user_id'");
    while ($row = mysqli_fetch_array($sql)) {
        $notifications++;
    }

    echo $notifications;
?>