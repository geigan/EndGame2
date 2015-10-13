<?php
session_start();
$username = $_POST['mainusername']; //collect form data from post
$password = $_POST['mainpassword'];

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
$finduser = "select * from users where username='$username' and password='$encpassword';"; //create string = query
$results = mysql_query($finduser); //executes query and returns mysql result set object
$count = mysql_num_rows($results); //returns number of rows from result set

mysql_close($con);
if ($count == 1)
{
	$_SESSION['username'] = $username;
	header("location:mainLobby.php");
}
else
{
	$_SESSION['account'] = '';
	$_SESSION['error'] = "Error! Wrong username and password combination!";
	header("location:index.php");
}
?>
