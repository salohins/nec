<?php
    include "connect.php";
    session_start();

    if (isset($_POST['submit'])) {
        $email = $_POST['email'];
        $password = $_POST['pw'];

        

        $sql = mysqli_query( $dbhandle, "SELECT * FROM user WHERE email = '$email' 
            and password = '$password'") or die("Failed to query database ");

        $row = mysqli_fetch_array($sql);

        if ($email != "" && $row['email'] == $email 
            && $row['password'] == $password) {
            
            session_start();
            $_SESSION['user_id'] = $row['id'];
            $_SESSION['user_info'] = $row;
            header("Location: ../html/profile.php");
        } else {
            header("Location: ../index.php", false);
            $_SESSION['login_status'] = "incorrect email or password";
        }
    }
?>