<?php
    include "connect.php";
    session_start();

    $post_id = $_POST['post_id'];
    $post_id2 = "";
    if (strlen($post_id) == 1) {
        $post_id .= $_SESSION['user_info'][0];
        $post_id2 = $_SESSION['user_info'][0] .$_POST['post_id'];
    }
    $sql = mysqli_query( $dbhandle, "SELECT * FROM chat WHERE post_id = '$post_id' OR post_id = '$post_id2'");
    $row = mysqli_fetch_array($sql);
    echo $row['id'];
?>