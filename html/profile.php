<?php
    include "../php/profile_info.php";
?>

<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
    <meta charset="utf-8">
    <title>nec</title>
    <link rel="stylesheet" href="../styles/style.css">
    
</head>

<body>
    <header>
        <div id="profile-header">
        <input type="button" id="sett-button" class="prof-icon" onclick="btnClick(this.id)"></input>
            <div id="profile-info">
                <div <?php
                    if ($_SESSION['user_info'][4] == "")
                        echo "style='background: url(\"../img/prof.jpg\") center'";
                    else 
                        echo "style='background: url(\"{$_SESSION['user_info'][4]}\") center;
                        background-size: cover;'";
                        
                ?> id="prof-img" onmousedown="imgDown(this.id)"></div>
                <input type="button" onclick="btnClick(this.id)" id="fr-button" class="prof-icon"></input>
                <h3 id="uname"><?php 
                    if ($_SESSION['username'] == null) {
                        header("Location: ../index.php");
                    }
                    else
                        echo $_SESSION['username'];
                ?></h3>
            </div>
            
            <img src="../img/logo.PNG" draggable="false" id="logo">
        </div>

        <div>
        </div>
    </header>
    <main id="main">
        <script src="../javascript/jquery-3.5.0.js"></script>
        <?php
            include "../php/profile_gen.php";
        ?>
    </main>
    <footer>
        <p class="noselect">&copy; <script>document.write(new Date().getFullYear())</script>, CC BY-NC</p>
    </footer>
    <script src="../javascript/profileInput.js"></script>
</body>