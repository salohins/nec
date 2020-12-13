<?php
    $username = "root";
    $password = "";
    $database = "nec";
    $server = "localhost";

    $dbhandle = mysqli_connect($server, $username, $password)  
        or die("Unable to connect to MySQL");

    $selected = mysqli_select_db($dbhandle, $database)  
        or die("Could not select examples");
?>