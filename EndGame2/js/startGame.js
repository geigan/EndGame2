//sources mentioned on index.html
//all custom script is otherwise attributed to Evan Ashburn
window.onload = function() {

function loadImages(sources, callback) {
	var images = {};
	var loadedImages = 0;
	var numImages = 0;
	for(var src in sources) {
		numImages++;
	}
	for(var src in sources) {
		images[src] = new Image();
		images[src].onload = function() {
			if(++loadedImages >= numImages) {
				callback(images);
			}
		};
    images[src].src = sources[src];
	}
}

//necessary socket variables
var username = document.getElementById('screenname2');
var room = document.getElementById('room');
var username1 = $(username).val();
var room1 = $(room).val();
JSON.stringify(room1);
JSON.stringify(username1);

//basic global variables
var canvas = document.getElementById('canvasObject');
var context = canvas.getContext('2d');
var player = true;                     // Current player. If true it randomises the starting image for that player.
var peeking = true;				 	   // In the works; will be a "peeking" system for players.
var opponent_peeking = true;           // If the opponent is peeking, there model is shown. If not; default background.
var playerjoined = false;                  // Starts at false. Turns to true on 'gameStart'
var timer = 0;                         // Counts the seconds of the match. Every 1000 = 1 second.
var shotTimer= 0;
var baseNum = Math.floor(Math.random() * 10);
var boundingBox = 0;
var baseNumTest = 0;
var endGame = false;
var canShoot = true;
var died = false;

var socket = io.connect('http://104.130.213.149:8000');


socket.on('connect', function(){
	var testdata = {'username' : username1, "room" : room1};
    socket.emit('join',testdata);
});

socket.on('test', function(data){
	alert("testing received");
});

socket.on('gameStart', function (){
	playerjoined=true;
});

socket.on('peeking', function (peek){
	console.log("Testing peek: "+ peek);
	if(peek == true){
		opponent_peeking = true;
		console.log("peek assigned: "+opponent_peeking);
	} else if(peek == false) {
		opponent_peeking = false;
		console.log("peek assigned: "+opponent_peeking);
	}
});

socket.on('endGame', function (winner){	
	console.log("shots fired");
	if(winner == 'disconnected') {
		endGame = true;
		alert("Opponent disconnected.");
	} else if(winner!=username1){
		died = true;
		console.log("u ded");
	} else if(winner == username1){
		endGame = true;
		console.log("a winner is you");
	} else {
		endGame = true;
		alert("Game ended due to unforeseen error.");
	}
});

//arrays for click-able regions
var pos1 = {x:553, y:234, width:23, height:46};
var pos2 = {x:688, y:135, width:35, height:30};
var pos3 = {x:222, y:68, width:22, height:25};
var pos4 = {x:692, y:381, width:63, height:66};
var pos5 = {x:308, y:117, width:26, height:32};
var pos6 = {x:0, y:426, width:93, height:64};
var pos7 = {x:632, y:310, width:71, height:104};
var pos8 = {x:749, y:201, width:25, height:53};
var pos9 = {x:245, y:122, width:25, height:30};
var pos10 = {x:868, y:180, width:32, height:54};

//sound stuff
var soundtime = 0;
var Sound1 = new Audio();
var Sound2 = new Audio();
var Sound3 = new Audio();
var Sound4 = new Audio();

Sound1.src = "sounds/background.mp3"
Sound2.src = "sounds/endSound.mp3"
Sound3.src = "sounds/gunshot.mp3"
Sound4.src = "sounds/misfire.mp3"

Sound1.volume = "0.1"
Sound2.volume = "0.1"
Sound3.volume = "0.1"
Sound4.volume = "0.1"

Sound1.play()
Sound1.loop = "false";

//image sources
var sources = {
	background : "images/background.png",
	background_1 : "images/background_1.png",
	background_2 : "images/background_2.png",
	background_3 : "images/background_3.png",
	waiting_background : "images/waiting_background.png",
	shooter_pos1: "images/shooter_pos1.png",
	shooter_pos2: "images/shooter_pos2.png",
	shooter_pos3: "images/shooter_pos3.png",
	shooter_pos4: "images/shooter_pos4.png",
	shooter_pos5: "images/shooter_pos5.png",
	shooter_pos6: "images/shooter_pos6.png",
	shooter_pos7: "images/shooter_pos7.png",
	shooter_pos8: "images/shooter_pos8.png",
	shooter_pos9: "images/shooter_pos9.png",
	shooter_pos10: "images/shooter_pos10.png",
	notpeeking: "images/notpeeking.png",
	wongame: "images/win.png",
	lostgame: "images/lost.png"
};

function pauseSound() {
	Sound1.pause();
};
function playSound() {
	Sound1.play();
};
function restartGame() {
	window.location.reload();
};

//adds click-able bounding boxes to enemy player's current position
canvas.addEventListener('click', function(event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
	if(canShoot == true){
		Sound3.play();
		canShoot = false;
	if(boundingBox == 0){
		if (y > pos1.y && y < pos1.y + pos1.height && x > pos1.x && x < pos1.x + pos1.width)
			{socket.emit('shoot',username1);}
	}else if(boundingBox ==1){
		if (y > pos2.y && y < pos2.y + pos2.height && x > pos2.x && x < pos2.x + pos2.width)
			{socket.emit('shoot',username1);}
	}else if(boundingBox ==2){
		if (y > pos3.y && y < pos3.y + pos3.height && x > pos3.x && x < pos3.x + pos3.width)
			{socket.emit('shoot',username1);}
	}else if(boundingBox ==3){
		if (y > pos4.y && y < pos4.y + pos4.height && x > pos4.x && x < pos4.x + pos4.width)
			{socket.emit('shoot',username1);}
	}else if(boundingBox ==4){
		if (y > pos5.y && y < pos5.y + pos5.height && x > pos5.x && x < pos5.x + pos5.width)
			{socket.emit('shoot',username1);}
	}else if(boundingBox ==5){
		if (y > pos6.y && y < pos6.y + pos6.height && x > pos6.x && x < pos6.x + pos6.width)
			{socket.emit('shoot',username1);}
	}else if(boundingBox ==6){
		if (y > pos7.y && y < pos7.y + pos7.height && x > pos7.x && x < pos7.x + pos7.width)
			{socket.emit('shoot',username1);}
	}else if(boundingBox ==7){
		if (y > pos8.y && y < pos8.y + pos8.height && x > pos8.x && x < pos8.x + pos8.width)
			{socket.emit('shoot',username1);}
	}else if(boundingBox ==8){
		if (y > pos9.y && y < pos9.y + pos9.height && x > pos9.x && x < pos9.x + pos9.width)
			{socket.emit('shoot',username1);}
	}else if(boundingBox ==9){
		if (y > pos10.y && y < pos10.y + pos10.height && x > pos10.x && x < pos10.x + pos10.width)
			{socket.emit('shoot',username1);}
	}
	}else{
		Sound4.play();
	};
});

//determines whether player is peeking or not
window.addEventListener('keydown', function(e) {
	if(e.keyCode == "32") {
		peeking = false;
		JSON.stringify(peeking);
		var peekdata = {"username" : username1, "room": room1,"peeking" : peeking};
		socket.emit('peeking',peekdata);
		baseNum = Math.floor(Math.random() * 10); //randomises a position for the enemy player again (to mix it up)
		boundingBox = 10; //aka no click-able box when not peeking
	}
});

//determines whether player is peeking or not
window.addEventListener('keyup', function(e) {
	if(e.keyCode == "32") {
		peeking = true;
		JSON.stringify(peeking);
		var peekdata = {"username" : username1, "room":room1,"peeking" : peeking}; 
		socket.emit('peeking',peekdata);
		baseNum = Math.floor(Math.random() * 10); //randomises a position for the enemy player again (to mix it up)
	}
});

//updates the games images
window.setInterval(function(){
	loadImages(sources, function(images){
	
		context.clearRect ( 0 , 0 , canvas.width, canvas.height );
		
		if(playerjoined != true){
			context.drawImage(images.waiting_background, 0, 0);
		}else{
			timer += 50;
			if(timer <=1000){
				context.drawImage(images.background_3, 0, 0);
			}else{
				if(timer <=2000 && timer >= 1001){
					context.drawImage(images.background_2, 0, 0);
				}else{
					if(timer <=3000 && timer >= 2001){
						context.drawImage(images.background_1, 0, 0);
					}else{
						if(baseNum == 0 && opponent_peeking == true && peeking == true){
							boundingBox = 0;
							context.drawImage(images.shooter_pos1, 0, 0);
						}
						else if(baseNum == 0 && opponent_peeking == false && peeking == true){
							boundingBox = 0;
							context.drawImage(images.background, 0, 0);
						}
						else if(baseNum == 0 && peeking == false){
							context.drawImage(images.notpeeking, 0, 0);
						}
						else if(baseNum == 1 && opponent_peeking == true && peeking == true){
							boundingBox = 1;
							context.drawImage(images.shooter_pos2, 0, 0);
						}
						else if(baseNum == 1 && opponent_peeking == false && peeking == true){
							boundingBox = 1;
							context.drawImage(images.background, 0, 0);
						}
						else if(baseNum == 1 && peeking == false){
							context.drawImage(images.notpeeking, 0, 0);
						}
						else if(baseNum == 2 && opponent_peeking == true && peeking == true){
							boundingBox = 2;
							context.drawImage(images.shooter_pos3, 0, 0);
						}
						else if(baseNum == 2 && opponent_peeking == false && peeking == true){
							boundingBox = 2;
							context.drawImage(images.background, 0, 0);
						}
						else if(baseNum == 2 && peeking == false){
							context.drawImage(images.notpeeking, 0, 0);
						}
						else if(baseNum == 3 && opponent_peeking == true && peeking == true){
							boundingBox = 3;
							context.drawImage(images.shooter_pos4, 0, 0);
						}
						else if(baseNum == 3 && opponent_peeking == false && peeking == true){
							boundingBox = 3;
							context.drawImage(images.background, 0, 0);
						}
						else if(baseNum == 3 && peeking == false){
							context.drawImage(images.notpeeking, 0, 0);
						}
						else if(baseNum == 4 && opponent_peeking == true && peeking == true){
							boundingBox = 4;
							context.drawImage(images.shooter_pos5, 0, 0);
						}
						else if(baseNum == 4 && opponent_peeking == false && peeking == true){
							boundingBox = 4;
							context.drawImage(images.background, 0, 0);
						}
						else if(baseNum == 4 && peeking == false){
							context.drawImage(images.notpeeking, 0, 0);
						}
						else if(baseNum == 5 && opponent_peeking == true && peeking == true){
							boundingBox = 5;
							context.drawImage(images.shooter_pos6, 0, 0);
						}
						else if(baseNum == 5 && opponent_peeking == false && peeking == true){
							boundingBox = 5;
							context.drawImage(images.background, 0, 0);
						}
						else if(baseNum == 5 && peeking == false){
							context.drawImage(images.notpeeking, 0, 0);
						}
						else if(baseNum == 6 && opponent_peeking == true && peeking == true){
							boundingBox = 6;
							context.drawImage(images.shooter_pos7, 0, 0);
						}
						else if(baseNum == 6 && opponent_peeking == false && peeking == true){
							boundingBox = 6;
							context.drawImage(images.background, 0, 0);
						}
						else if(baseNum == 6 && peeking == false){
							context.drawImage(images.notpeeking, 0, 0);
						}
						else if(baseNum == 7 && opponent_peeking == true && peeking == true){
							boundingBox = 7;
							context.drawImage(images.shooter_pos8, 0, 0);
						}
						else if(baseNum == 7 && opponent_peeking == false && peeking == true){
							boundingBox = 7;
							context.drawImage(images.background, 0, 0);
						}
						else if(baseNum == 7 && peeking == false){
							context.drawImage(images.notpeeking, 0, 0);
						}
						else if(baseNum == 8 && opponent_peeking == true && peeking == true){
							boundingBox = 8;
							context.drawImage(images.shooter_pos9, 0, 0);
						}
						else if(baseNum == 8 && opponent_peeking == false && peeking == true){
							boundingBox = 8;
							context.drawImage(images.background, 0, 0);
						}
						else if(baseNum == 8 && peeking == false){
							context.drawImage(images.notpeeking, 0, 0);
						}
						else if(baseNum == 9 && opponent_peeking == true && peeking == true){
							boundingBox = 9;
							context.drawImage(images.shooter_pos10, 0, 0);
						}
						else if(baseNum == 9 && opponent_peeking == false && peeking == true){
							boundingBox = 9;
							context.drawImage(images.background, 0, 0);
						}
						else if(baseNum == 9 && peeking == false){
							context.drawImage(images.notpeeking, 0, 0);
						}if(endGame == true){
							context.drawImage(images.wongame, 0, 0);
							Sound1.pause();
							if(soundtime == 0){
								Sound2.play();
								soundtime = 1;
							};
						}
					};
				};
			};
		};
		if(died == true){
			context.drawImage(images.lostgame, 0, 0);
			Sound1.pause();
			if(soundtime == 0){
				Sound2.play();
				soundtime = 1;
			};
		};
		if(canShoot == true){
			shotTimer = timer;
		}else if(shotTimer <= timer-1500){   //this adds the 1.5 second delay between shots 1500 = 1.5 seconds
			canShoot = true;
		};

		//create border for main canvas
		context.lineWidth = 4;
		context.moveTo(0, 0)
		context.lineTo(900, 0);
		context.lineTo(900, 490);
		context.lineTo(0, 490);
		context.lineTo(0, 0);
		context.strokeStyle = "#080808";
		context.stroke();
		
	});
}, 50);

}

