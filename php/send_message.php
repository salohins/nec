<?php
    include_once "connect.php";
    session_start();

    $text = $_POST['text_msg'];
    $sender_id = $_SESSION['user_info'][0];
    $chat_id = $_POST['chat_id'];
    $sender_pic = $_SESSION['user_info'][4];

    mysqli_query($dbhandle, "INSERT INTO `msg` 
        (`msg_id`, `sender_id`, `text`, `media`, `time`, `chat_id`, `status`) VALUES 
            (NULL, '$sender_id', '$text', NULL, '', '$chat_id', 'delivered')"); 

    echo "<div class=\"speechbubble-right\"><img src=\"$sender_pic\" class=\"prof-img-right\"><p id=\"text\">$text</p></div>";
?>