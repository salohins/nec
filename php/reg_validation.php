
<?php
    include_once "connect.php";

    /*if (isset($_POST['uname']) && !empty($_POST['uname'])) {

    $uname = $_POST['uname'];
    $sql = mysqli_query($dbhandle, "SELECT * FROM user WHERE username = '$uname' LIMIT 1");
    $row = mysqli_fetch_array($sql);

    if ($row['username'] == $uname) {
        echo "*name is already taken";
    }
    else 
        echo "";
    }

    if (isset($_POST['email']) && !empty($_POST['email'])) {

    $email = $_POST['email'];
    $sql = mysqli_query($dbhandle, "SELECT * FROM user WHERE email = '$email' LIMIT 1");
    $row = mysqli_fetch_array($sql);

    if ($row['email'] == $email) {
        echo "*email is already taken";
    }
    else 
        if (strpos($email, "@") == true && strlen(explode("@", $email)[1]) > 0) 
            echo "";       
        else                
            echo "*email is incorrect";
    }

    if (isset($_POST['rpw']) && !empty($_POST['rpw'])) {

        $rpw = $_POST['rpw'];
        $pw = $_POST['pw'];

        if ($pw != $rpw) {
            echo "*passwords don't match";
            $error = true;
        }
        else {
            if (strlen($rpw) < 6) //Password length check
                echo "*password is too short";
            else 
                echo "";
        }
    }*/
?>