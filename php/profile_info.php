<?php
    include "connect.php";
    session_start();

    $sql = mysqli_query( $dbhandle, "SELECT * FROM user WHERE id = '$_SESSION[user_id]'"); 

    $row = mysqli_fetch_array($sql);

    $_SESSION['username'] = $row['username'];

    if (isset($_POST['status'])) {
        include "newsGen.php";
    }
    /*

<script src="../javascript/prof.js"></script>
        <h2 class="section-header">Popular</h2>
        <div class="scrolling-wrapper">
            <?php include '../php/newsGen.php';?>
        </div>
        <h2 class="section-header">Sports</h2>
        <div class="scrolling-wrapper">
            <?php include '../php/newsGen.php';?>
        </div>
        <h2 class="section-header">Food</h2>
        <div class="scrolling-wrapper">
            <?php include '../php/newsGen.php';?>
        </div>

    */
?>