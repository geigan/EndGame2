<?php session_start();

// Check if the user has logged in
if( !empty($_SESSION['username']) ){
  header("location:mainLobby.php");
}
?>
<html>
<head>
<meta charset='utf-8'>
<title>Bang!: Login or Signup!</title>
<!-- Latest compiled and minified CSS -->
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
<!-- Optional theme -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css">
<!-- Latest compiled and minified JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
<link href="../css/EndGame.css" rel="stylesheet" />
<!-- external css-->
<link href="../css/simple-sidebar.css" rel="stylesheet">
<!-- Bootstrap Core CSS -->
<link href="../css/bootstrap.min.css" rel="stylesheet">
<script src="../js/EndGame.js"></script>
<link rel = "stylesheet" href = "../css/sign-in.css">
</head>

<body>
<!--login format courtesy of getbootstrap.com-->
<center>
<div class='container'>
<h1>BANG!</h1>
<br> <br> <br>

<div>
<?php
if (!empty($_SESSION['error']))
{
        echo "<div class='container error'><div class='alert alert-danger'>".$_SESSION['error']."</div></div><br>";
        $_SESSION['error'] = '';
}
if (!empty($_SESSION['account']))
{
        echo "<div class='container error'><div class='alert alert-success'>".$_SESSION['account']."</div></div><br>";
        $_SESSION['account'] = '';
}
?>

<div>
<div class='panel panel-default'>
<div class='panel-heading'><h3 class='panel-title'><strong>Log In</strong></h3></div>
<form role='form' class='form-signin' name='login' id='login' method='post' action='verify.php'>
<div class='panel-body'>
<div class='form-group'><input type='text' class='form-control input-sm chat-input' id='mainusername' placeholder='Username' name='mainusername'></div>
<div class='form-group'><input type='password' class='form-control input-sm chat-input' id='mainpassword' placeholder='Password' name='mainpassword'></div>
<button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
</form>
</div>
</div>
</div>

<br>

<div>
<div class='panel panel-default'>
<div class='panel-heading'><h3 class='panel-title'><strong>Sign Up</strong></h3></div>
<form class='form-signin' name='register' id='register' method='post' action='register.php'>
<div class='panel-body'>
<div class='form-group'><input type='text' class='form-control input-sm chat-input' id='username' placeholder='Username' name='username'></div>
<div class='form-group'><input type='password' class='form-control input-sm chat-input' id='password' placeholder='Password' name='password'></div>
<div class='form-group'><input type='password' class='form-control input-sm chat-input' id='checkpassword' placeholder='Confirm Password' name='checkpassword'></div>
<button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
</form>
</div>
</div>
</div>

</div>
</center>
</div>
</body>
</html>

