var xmlhttp;


//drag and drop from w3schools
function getTitle(s) {
    var incre = "myForm"+s;
    document.getElementById(incre).submit();
}

//jquery from onextrapixel.com
$(document).ready(function(){
	//fade in from http://www.onextrapixel.com/2010/02/23/how-to-use-jquery-to-make-slick-page-transitions/
	$("body").css("display", "none");
	$("body").fadeIn(500);
});

function getXMLHttpObject()
{
	if (window.XMLHttpRequest)
	{
		xmlHttp = new XMLHttpRequest(); //good browsers
	}
	else 
	{
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP"); // IE
	}
	return xmlHttp;
}

function addto(isbn, user, title)
{
	xmlhttp = getXMLHttpObject(); //create
	var params = "isbn="+isbn+"&user="+user+"&sid="+Math.random();
	xmlhttp.open('POST',"bookstoreadd.php",true);
	xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlhttp.send(params);
	alert('Added to wishlist!');
	var newbook = document.createElement('label');
	newbook.setAttribute('name',title);
	newbook.innerHTML = title;
	document.getElementById('wishlistbar').appendChild(newbook);
}

function removefrom(isbn, user, title)
{
	xmlhttp = getXMLHttpObject(); //create
	var params = "isbn="+isbn+"&user="+user+"&sid="+Math.random();
	xmlhttp.open('POST',"bookstoreadd.php",true);
	xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlhttp.send(params);
	alert('Removed from wishlist.');
	document.getElementById('wishlistbar').appendChild(newbook);
}

function allowDrop(ev) {
	ev.preventDefault();
}

function drag(ev) {
	ev.dataTransfer.setData("text", ev.target.id);
	//ev.dataTransfer.setData('name', ev.target.name);
}

function drop(ev) {
	ev.preventDefault();
	var data = ev.dataTransfer.getData("text");
	ev.target.appendChild(document.getElementById(data).cloneNode(true));
	updoot(data);
}

function updoot(cart){
	xmlhttp = getXMLHttpObject();
	var params = "cart="+cart+"&sid="+Math.random();
	xmlhttp.open('POST',"cartadd.php",true);
	xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlhttp.send(params);
	alert('Added to shopping cart!');
}
