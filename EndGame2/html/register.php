<?php
session_start();
$username = $_POST['username'];
$password = $_POST['password'];

if (!get_magic_quotes_gpc())
  {
    $username = addslashes($username);
    $password = addslashes($password);
  }

$encpassword = md5($password); //create md5 hash of password
$con = mysql_connect('localhost', 'root', 'littlepizza'); //establish connection
if(!$con) //if connection not established
{
	die('Could not connect: '.mysql_error());
}
mysql_select_db('EndGame2')or die('cannot select db'); //submit mysql use db query
$newuser = "insert into users(username,password) values('$username','$encpassword');";
mysql_query($newuser)or die('error submitting to database: '.mysql_error());
mysql_close($con);
$_SESSION['error'] = '';
$_SESSION['account'] = 'Your account has been created!';
header("location:index.php");
?>
