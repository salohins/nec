<?php

    $interests = ["Business"];

    include_once "connect.php";
    session_start();

    $sql0 = mysqli_query($dbhandle, "SELECT * FROM uint WHERE user_id = '{$_SESSION['user_info'][0]}'");
    while ($row = mysqli_fetch_array($sql0)) {
        for ($i = 0; $i < sizeof($interests); $i++) {
            
            if (strcmp($interests[$i], $row['interest']) == 0) {
                unset($interests[$i]);
            }
        }
    }
    
    $html = "";
    foreach ($interests as $interest) {
        $html .= "<div id='interestSec'><p class='interest' onmousedown='insertSection(\"$interest\")'>$interest</p></div>";
    }
    echo $html;

?>