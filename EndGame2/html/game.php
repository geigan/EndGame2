<!--
Sources:
http://www.html5canvastutorials.com/tutorials/html5-canvas-image-loader/
http://www.acclaimimages.com/_gallery/_images_n300/0517-0911-2300-4848_cowboy_aiming.jpg
-->
<?php
session_start();
if(!$_SESSION['username']){
    header("location:index.php");
}
$username = $_SESSION['username'];

$gameName = $_POST['screenname2'];
$game = $_POST['formOption'];
?>


<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Bang! | Matchmaking Lobby</title>
		<!-- Latest compiled and minified CSS -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
		<!-- Optional theme -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css">
		<!-- Latest compiled and minified JavaScript -->
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
		<link href="../css/EndGame.css" rel="stylesheet" />
		<!-- external css-->
		<link href="../css/simple-sidebar.css" rel="stylesheet">
		<!-- Bootstrap Core CSS -->
		<link href="../css/bootstrap.min.css" rel="stylesheet">
		<script src="http://code.jquery.com/jquery-2.1.0.min.js" type="text/javascript"></script>
		<script src = "../js/EndGame.js"></script>
		<link href="../css/custom.css" rel="stylesheet">
<script src="../node_modules/socket.io/node_modules/socket.io-client/socket.io.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js"></script>
                <script src="../js/startGame.js" type="text/javascript"></script>
		<link href = "../css/game.css" rel="stylesheet">

	</head>

	<body>	
		<center>
<div class='container'>
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">Bang! - Matchmaking Lobby</a>
            </div>
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li id = "screenname" class="gn-icon gn-icon-gear"> value = <?php echo $username; ?>><?php echo $username; ?></li>
                	<li><a href="mainLobby.php" class="gn-icon gn-icon-gear">Return to Lobby</a></li>
			<li><a href="logout.php" class="gn-icon gn-icon-gear">Logout</a></li>
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container -->
    </nav>

</div>
<input id = "screenname2" value = <?php echo $gameName; ?> type = "hidden"> 
<input id = "room" value = <?php echo $game; ?> type = "hidden"> 

<br> <br> <br> 

		<canvas id="canvasObject" width="900" height="490">Your browser doesn't support Canvas</canvas>
		<br>
		<br>
</html>
