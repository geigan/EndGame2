
var clients = [];
var app = require('http').createServer()
, fs = require('fs')
, io = require('socket.io').listen(app);

var usernames = [{}];
var rooms = [{'room':'Lobby',"pop":0,"clients":[]}];
var roomsavailable = [];

app.listen(8000);
io.sockets.on('connection', function(socket) {
	console.log("socket connected");	

  socket.on('adduser', function (username){
        socket.username = username;
        socket.room = 'Lobby';   
        var newJSON  = {"username":username, "socketID" : socket.id,"peeking":"true"};      
        console.log(newJSON);
	usernames.push(newJSON);
        socket.join('Lobby'); 
        socket.emit('updateRooms',roomsavailable);         
  	console.log("Added User: "+username);  
  });

  socket.on('create', function (username){
		socket.leave(socket.room);
		var newJSON  = {"room":username, "pop" : 0,"clients": []};
  		rooms.push(newJSON);
  		roomsavailable.push(username);
  		socket.broadcast.to('Lobby').emit('updateRooms', roomsavailable);
		socket.disconnect();
		console.log("Created Room: "+username);
  });

/* proof of concept for emitting to specific user via socketID
  socket.on('test',function (data) {
	console.log(data['username'] + " : " + data['room']);
	for(var i = 0;i<usernames.length;i++){
		if(usernames[i]['username']==data['username']){
			var receiver = usernames[i]['socketID'];
			console.log(socket);
		}
	}
	if(io.sockets.connected[receiver]){
		io.sockets.connected[receiver].emit('test', 'testing');
	}
  }); */

  socket.on('leave',function (username){
		console.log(username+" left the Lobby");
		socket.leave(socket.room);
		socket.disconnect();
  });

  socket.on('join', function (data){
		console.log(data['username']+ " joining room...");
  		socket.username = data['username'];
		socket.room = data['room'];
		socket.join(data['room']);
		for(var i = 0;i<rooms.length;i++){
                	if(rooms[i]['room']==data['room']){
				rooms[i]['pop']++;
				rooms[i]['clients'].push(data['username']);
                		var numClients = rooms[i]['pop'];
			}
        	}
	
  		if(numClients>1){
  			roomsavailable.splice(roomsavailable.indexOf(data['room']),1);
			console.log(roomsavailable);
  			socket.broadcast.to('Lobby').emit('updateRooms', roomsavailable);
  			socket.in(data['room']).emit('gameStart');
			socket.emit('gameStart');
  		}
		console.log(data['username']+ " joined " + data['room']);
  });

//may need to reconfigure peeking and shoot for socket.io 1.0
  socket.on('peeking', function (data){
	console.log(data['username'] + " peeking...")
        for(var i = 0; i<usernames.length;i++){
          if(usernames[i]['username']==data['username']){
		usernames[i]['peeking'] = data['peeking'];
          }
        }
	for(var i = 0; i<rooms.length;i++){
		//console.log("pass 1");
		if(rooms[i]['room'] == data['room']){
			//console.log("pass 2");
			for(var j = 0; j<2;j++){
				//console.log("pass 3");
				if(rooms[i]['clients'][j]!=data['username']){
					//console.log("pass 4");
					var otherUser = rooms[i]['clients'][j];
				}
			} 
		}
	}
	//console.log("passed for loop");	
	

	for(var i = 0; i< usernames.length;i++)	{
		if(usernames[i]['username'] == otherUser){
			var receiver = usernames[i]['socketID'];	
			console.log("receiver ID: "+receiver);
		}
	}

	socket.to(data["room"]).emit('peeking',data["peeking"]);
	//io.to(receiver).emit('peeking',data["peeking"]);

	console.log(data['username'] + " peeking changed to "+data['peeking']);
  });

  socket.on('shoot', function (username){
	console.log(username+ "firing...");
	var sGallery = socket.room;
        for(var i = 0; i<rooms.length;i++){
                console.log("pass 1");
                if(rooms[i]['room'] == sGallery){
                        console.log("pass 2");
                        for(var j = 0; j<2;j++){
                                console.log("pass 3");
                                if(rooms[i]['clients'][j]!=username){
                                        console.log("pass 4");
                                        var otherUser = rooms[i]['clients'][j];
                                	console.log(otherUser);
				}
                        }
                }
        }

        for(var i = 0; i< usernames.length;i++) {
		console.log(usernames[i]['username']+ " peeking = "+usernames[i]["peeking"] );
                if(usernames[i]['username'] == otherUser && usernames[i]['peeking']==true){

                        var receiver = usernames[i]['socketID'];
                        console.log("receiver ID: "+receiver);
			socket.in(sGallery).emit("endGame",username);
			socket.emit("endGame",username);
                }
        }	
	
	
	console.log(username + " fired.");
  });

  socket.on('disconnect', function (){
  console.log("user disconnected from room");  
  if(socket.room!='Lobby'){
      socket.broadcast.to(socket.room).emit('endGame', 'disconnected');
    }
  });


 });
