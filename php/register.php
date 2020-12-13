<?php
    include_once "connect.php";

    if (isset($_POST['submit'])) {
        $fname = $_POST['uname'];
        $sname = $_POST['sname'];
        
        $uname = $fname ." " .$sname;
        $email = $_POST['email'];
        $password = $_POST['pw'];

        $b_day = $_POST['day-s'];
        $b_month = $_POST['month-s'];
        $b_year = $_POST['year-s'];


        $errors = ($fname == "") || ($sname = "") || ($email == "") || ($password == "") || ($b_day == "") || ($b_month == "") || ($b_year == "");
        if ($errors == false) {
            if($sql = mysqli_query($dbhandle, "INSERT INTO user (username, email, password, prof_pic) 
                VALUES ('$uname', '$email', '$password', '../img/prof.jpg')")) 
                    echo "registration successfull!";
        }
            echo "you must fill all the fields";
    }

?>