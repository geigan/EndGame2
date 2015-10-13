<?php session_start();
session_destroy(); // Destroy session on logout
header("location:index.php"); // reroute to login page
?>