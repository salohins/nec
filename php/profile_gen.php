<?php
    require_once "connect.php";

    $user_id = $_SESSION['user_info'][0];

    $sql = mysqli_query($dbhandle, "SELECT * FROM uchat WHERE user_id = '$user_id'");
    if ($row = mysqli_fetch_array($sql)) {
        echo "<h5 class=section-header id=mygroups>chats</h5><div class='groupWrap'>";

        $sql = mysqli_query($dbhandle, "SELECT * FROM uchat WHERE user_id = '$user_id'");
        while($row = mysqli_fetch_array($sql)) {
            $notifications = 0;
            $sql0 = mysqli_query($dbhandle, "SELECT * FROM msg WHERE chat_id = '{$row['chat_id']}' AND status = 'delivered' AND sender_id <> '$user_id'");
            while ($row0 = mysqli_fetch_array($sql0))
                $notifications++;
            $sql2 = mysqli_query($dbhandle, "SELECT * FROM chat WHERE id = '{$row['chat_id']}'");
            $row2 = mysqli_fetch_array($sql2);
            $usern = "";
            if ($row2['bg'] != "")
                $bg = $row2['bg'];
            else {
                $sql3 = mysqli_query($dbhandle, "SELECT * FROM uchat WHERE user_id <> '$user_id' AND chat_id = '{$row2['id']}'");
                $row3 = mysqli_fetch_array($sql3);
                $sql4 =  mysqli_query($dbhandle, "SELECT * FROM user WHERE id = '{$row3['user_id']}'");
                $row4 = mysqli_fetch_array($sql4);
                $usern = $row4['username'];
                $bg = $row4['prof_pic'];
            }
            echo "<div class=group_card id='{$row2['post_id']}' style='background: url($bg) center center;
            background-size: cover'
            onmousedown=\"groupClick(this.id)\"
            data-backurl=\"$bg\"
            data-name=\"$usern\"><div style='display: inner-block; 
            background-color: orange; 
            border-radius:50%; 
            text-align:center;  
            line-height: 20px; 
            width: 20px; 
            position: absolute' 
            id='{$row2['post_id']}_notif'>"; 
            
            if ($notifications > 0)
                echo $notifications;
            
            echo "</div></div>";
        }

        echo "</div>";
    }
    
    
    printSection("world", "https://rss.app/feeds/WGnZ5NdXi46itN5V.xml", "worldWrapp");
    
    $sql = mysqli_query($dbhandle, "SELECT * FROM uint WHERE user_id = '$user_id'");
    while($row = mysqli_fetch_array($sql)) {
        switch ($row['interest']) {
            case "Sports":
                printSection("sports", "https://rss.app/feeds/rnt9AfZoZHLquQnb.xml");
            break;

            case "Business":
                printSection("business", "https://rss.app/feeds/XPL91gXRRt4uaaU7.xml", "businessWrap");
            break;

            case "Health":
                printSection("health", "https://rss.app/feeds/GrphQaUFC2L7azoY.xml");
            break;
        }
    }


    $interests = ["Business"];
        $sql0 = mysqli_query($dbhandle, "SELECT * FROM uint WHERE user_id = '{$_SESSION['user_info'][0]}'");
        while ($row = mysqli_fetch_array($sql0)) {
        for ($i = 0; $i < sizeof($interests); $i++) {
            
            if (strcmp($interests[$i], $row['interest']) == 0) {
                unset($interests[$i]);
            }
        }
    }

    if (sizeof($interests) > 0)
        echo "<input type='button' value='+' id='add-section' onclick='addSection()'></input>";

    

    function printSection($header, $url, $wrappId) {
        $titles[] = null;
        $html = '';
        $xml = simplexml_load_file($url);
        $i = 0;
        while ($i < 5) {
            $title = $xml->channel->item[$i]->title;
            $img_url = $xml->channel->item[$i]->description;
            $descr = $xml->channel->item[$i]->description;
            $date = $xml->channel->item[$i]->pubDate;
            $post_id = $xml->channel->item[$i]->guid;
    
            $start = 0;
            for ($j = 0; $j < strlen($img_url); $j++) {
                if (substr($img_url, $j, 1) == "\"") 
                    $start = $j + 1;
                
                if (substr($img_url, $j, 4) == ".png" ||
                    substr($img_url, $j, 4) == ".jpg") {
                        $img_url = substr($img_url, $start, $j + 4 - $start);
                        break;
                }
            }
            $descr =  substr($descr, strpos($descr, "><div>") + 6, strpos($descr, "</div>"));
            $descr = substr($descr, 0, strlen($descr) - 12);
            $i++;
            $dupl = false;
            for ($j = 0; $j < sizeof($titles); $j++) {
                if (strcmp($titles[$j], $title) == 0) {
                    $dupl = true;
                }
            }
            
            if ($dupl == true)
                continue;

            echo file_exists($img_url);

            $titles[sizeof($titles)] = $title;


            if ($img_url != null && strpos($img_url, ".jpg") > 0 || strpos($img_url, ".png") > 0) {
                $id = $header .$i;

                $html .= "<div id=\"$id\" style='
                    background: linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4)), url($img_url) center; 
                    background-size: cover;'; 
                class='card'
                onmousedown=\"articleClick(this.id)\"
                onmouseover=\"articleOver(this.id)\"
                onmouseleave=\"articleOut(this.id)\"
                data-description=\"$descr\"
                data-date=\"$date\"
                data-title=\"$title\"
                data-post-id=\"$post_id\"
                data-backurl=\"$img_url\">
                <h2 id='title'>$title</h2></div></br>";
            }
            
        }
    
        echo "<h2 class=" ."section-header" .">" .$header ."</h2>"  
            ."<div class='scrolling-wrapper' id='$wrappId' onmouseleave=\"wrappperOut(this.id)\">" .$html ."</div>";
    }
?>