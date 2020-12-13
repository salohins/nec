<?php
    include_once "connect.php";
    session_start();

    if ($_POST['type'] == "article")
        $post_id = $_POST['post_id'];
    else {
        $post_id = $_SESSION['user_info'][0] .$_POST['sender'];
        $sec_id = $_POST['sender'] .$_SESSION['user_info'][0];
    }

    $sql = mysqli_query( $dbhandle, "SELECT * FROM chat WHERE post_id = '$post_id' OR post_id = '$sec_id'");
    $row = mysqli_fetch_array($sql);

    if ($row == false) {
        
        if ($_POST['type'] == "article") {
        $sql = mysqli_query($dbhandle,"INSERT INTO chat (status, name, post_id, bg) 
            VALUES ('new', '', '$post_id', '{$_POST['bg']}')") or
                die(mysqli_error($dbhandle));
        }
        else {
            $sql = mysqli_query($dbhandle,"INSERT INTO chat (status, name, post_id, bg) 
            VALUES ('new', '', '$post_id', '')") or
                die(mysqli_error($dbhandle));
        }
    
        $last_id = $dbhandle->insert_id; 
        $sql = mysqli_query($dbhandle, "INSERT INTO uchat (user_id, chat_id) 
            VALUES ('{$_SESSION['user_info'][0]}', $last_id)"); 

        if ($_POST['type'] == "chat") {
            $sql = mysqli_query($dbhandle, "INSERT INTO uchat (user_id, chat_id) 
                VALUES ('{$_POST['sender']}', $last_id)"); 
        }
    }
    else {
        if ($_POST['type'] != "chat") {
            $last_id = $row['id'];
            $sql = "INSERT INTO uchat (user_id, chat_id) VALUES ('{$_SESSION['user_info'][0]}', '$last_id')";
            $dbhandle->query($sql);
        }
    }
    
    if ($_POST['msg_text'] != "")
    mysqli_query($dbhandle, "INSERT INTO msg (sender_id, text, time, chat_id, status) 
        VALUES ('{$_SESSION['user_info'][0]}', '{$_POST['msg_text']}', '', '$last_id', 'delivered')") or die(mysqli_error($dbhandle)); 
    echo $last_id;

?>