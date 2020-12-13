<?php
    include "connect.php";
    session_start();

    $html = "";
    echo "<h2 id='fr-request'>Friends</h2>";

    $user_id = $_SESSION['user_info'][0];
    
    $i = 0;
    $sql = mysqli_query($dbhandle, "SELECT * FROM friend WHERE status = 'friend' AND (user1 = '$user_id' OR user2 = '$user_id')");
    while($row = mysqli_fetch_array($sql)) {
        $i++;
        if ($row['user1'] == $_SESSION['user_info'][0]) {
            $sql2 = mysqli_query($dbhandle, "SELECT * FROM user WHERE id = '{$row['user2']}'"); 
            $sender = $row['user2']; 
        }
        else {
            $sql2 = mysqli_query($dbhandle, "SELECT * FROM user WHERE id = '{$row['user1']}'");
            $sender = $row['user1'];
        }
        $row2 = mysqli_fetch_array($sql2);
        $sender_name = $row2['username'];
        $sender_bg = $row2['prof_pic'];
        $html .= "<div class='fContrainter'>
            <img src='{$row2['prof_pic']}'>
            <h3>{$row2['username']}<h3/>
            <input type='button' onclick='fclick(\"$sender\", \"$sender_name\", \"$sender_bg\")'></input>
        </div>";
    }
    echo $html;

    $header = false;

    $sql = mysqli_query($dbhandle, "SELECT * FROM friend WHERE status = 'pending' AND user2 = '{$_SESSION['user_info'][0]}'");
    while($row = mysqli_fetch_array($sql)) {
        $header = true;
        if ($header)
            echo "<h2 id='fr-request'>Friend requests</h2>";
        if ($row['user1'] != $_SESSION['user_info'][0]) {
            $sql = mysqli_query($dbhandle, "SELECT * FROM user WHERE id = '{$row['user1']}'"); 
            $sender = $row['user1']; 
        }
        else {
            $sql = mysqli_query($dbhandle, "SELECT * FROM user WHERE id = '{$row['user2']}'");
            $sender = $row['user2'];
        }
        $row2 = mysqli_fetch_array($sql);
        $sender_name = $row2['username'];
        $sender_bg = $row2['prof_pic'];
        echo "<div class='fContrainter2'>
                <img src='{$row2['prof_pic']}'>
                <h3>{$row2['username']}<h3>
                <input type='button' onclick='addFriend({$row2['id']});' id='add' class='cButton' value='add'></input>
                <input type='button' onclick='declineFriend({$row2['id']})' id='decline' class='cButton' value='decline'></input>
            </div>";
    }
?>