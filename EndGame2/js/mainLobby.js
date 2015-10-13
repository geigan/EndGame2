window.onload = function(){

var screenname = document.getElementById('screenname2');
var gameForm = document.getElementById('gameForm');
var createOption = document.getElementById('createOption');
var gameList = document.getElementById('gameList');
var createButton = document.getElementById('create');
var joinButton = document.getElementById('join');




var socket = io.connect('http://104.130.213.149:8000');

socket.on('connect', function(){
    socket.emit('adduser', screenname.value);
});

socket.on('updateRooms', function (rooms){
	while(gameList.hasChildNodes()){
		var nextChild = gameList.childNodes[0];
		while(nextChild.hasChildNodes()){
			nextChild.removeChild(nextChild.childNodes[0]);
		}
		gameList.removeChild(gameList.childNodes[0]);
	}
	$.each(rooms, function (key, value) {
		var node = document.createElement("LI");
		var inputNode = document.createElement("INPUT");
		inputNode.type = "radio";
		inputNode.name = "formOption";
		inputNode.value = value;
		var valueName = document.createTextNode(value);
		gameList.appendChild(node);
	        node.appendChild(inputNode);
		node.appendChild(valueName);
   		
	});
});


$(function(){
	$(createButton).click( function() {
        	createOption.checked = true;
        	socket.emit('create', createOption.value);
	        gameForm.submit();
	});

	$(joinButton).click( function(event) {
		event.preventDefault();
        	if(createOption.checked == true){
                	alert('No game selected to join.');
        	} else {
                	socket.emit('leave',screenname.value);
                	gameForm.submit();
        	}
	});

});

}
