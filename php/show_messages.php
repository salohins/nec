<?php
    showMessages($_POST['amount']);

    function showMessages($amount) {
        include_once "connect.php";
        session_start();
        $user_id = $_SESSION['user_info'][0];

        if ($amount == "all")
            $sql = mysqli_query($dbhandle, "SELECT * FROM msg WHERE chat_id = '{$_POST['chat_id']}'");
        else
            $sql = mysqli_query($dbhandle, "SELECT * FROM msg WHERE chat_id = '{$_POST['chat_id']}' ORDER BY msg_id DESC");

        while($row = mysqli_fetch_array($sql)) {
            $msg_text = $row['text'];
            $msg_status = $row['status'];
            $sender_id = $row['sender_id'];
            $sql2 = mysqli_query($dbhandle, "SELECT * FROM user WHERE id = '$sender_id'");
            $row2 = mysqli_fetch_array($sql2);
            $sender_name = $row2['username'];
            $sender_pic = $row2['prof_pic'];

            if (strcmp($sender_id, $user_id) != 0) {
                $sql3 = mysqli_query($dbhandle, "UPDATE msg SET status = 'read' WHERE msg_id = {$row['msg_id']}");
            }

            if ($sender_id == $_SESSION['user_info'][0])
                echo 
                    "<div class=\"speechbubble-right\">
                        <img src=\"$sender_pic\" class=\"prof-img-right\">
                        <p id=\"text\">$msg_text</p>
                    </div>";
            else    
                echo 
                    "<div class=\"speechbubble\">
                        <img id=\"{$row['sender_id']}\" onmousedown=\"profDown(this.id)\" src=\"$sender_pic\" class=\"prof-img-left\">
                        <p id=\"text\">$msg_text</p><br>
                        <span class=\"username\">$sender_name</span>
                    </div>";
        }   
    }
?>