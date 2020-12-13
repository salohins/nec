<?php
    include_once "connect.php";
    session_start();

    $chat_id = $_POST['chat_id'];
    $self_id = $_SESSION['user_info'][0];
    $html = "";

    $sql = mysqli_query($dbhandle, "SELECT * FROM msg WHERE chat_id = '$chat_id' AND sender_id <> $self_id AND status = 'delivered'");
    while ($msg_info = mysqli_fetch_array($sql)) {
        $text = $msg_info['text'];
        $sender_id = $msg_info['sender_id'];
        $msg_id = $msg_info['msg_id'];
        
        $sql2 = mysqli_query($dbhandle, "SELECT * FROM user WHERE id = '$sender_id'");
        $sender_info = mysqli_fetch_array($sql2);

        $sender_name = $sender_info['username'];
        $sender_pic = $sender_info['prof_pic'];

        $html .= "<div class=\"speechbubble\">
            <img id=\"$sender_id\" onmousedown=\"profDown(this.id)\" src=\"$sender_pic\" class=\"prof-img-left\">
            <p id=\"text\">$text</p><br>
            <span class=\"username\">$sender_name</span>
            </div>";

        $sql3 = mysqli_query($dbhandle, "UPDATE msg SET status = 'read' WHERE msg_id = '$msg_id'");
    }
    echo $html;
?>