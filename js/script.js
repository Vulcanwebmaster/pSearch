window.onerror = stopError;
console.log("FACEBOOK POST SEARCH Version 1.0.1.2 ALPHA");
console.log("use 'data' for the console: data.data[0].name");
console.log("*********************************************************************");


var eingabe;
var randomklick = "unpress";
var suchen = _.debounce(ausgabe, 500);

function start() {
	$('.text').hide();
	$('.spinner').show();
	suchen();
}

function ausgabe() {
	i = document.form1.eingabe.value;
	$.ajax({
		url: "http://graph.facebook.com/search",
		context: document.body,
		data: {
			q: i,
			limit: 40
		},
		dataType: "json",
		success: function(data, textStatus, jqXHR) {
			$('.spinner').hide();
			$('.text').show();
			window.data = data;
			tohtml(data);
		}
	});
}



function tohtml(data) {
	laenge = data.data.length;
	var zahl = 0;
	var text = "";
	if (randomklick == "press") {
		zahl = Math.round(Math.random() * (laenge - 1));
		laenge = (zahl + 1);
	}
	for (var i = zahl; i < laenge; i++) {
		username = data.data[i].from.name
		profillink = "http://facebook.com/" + data.data[i].from.id;
		thumbnail = "http://graph.facebook.com/" + data.data[i].from.id + "/picture";
		message = data.data[i].message;
		story = data.data[i].story;
		bild = data.data[i].picture;
		titel = data.data[i].name;
		beschreibung = data.data[i].description;
		link = data.data[i].link;
		erstellungszeit = data.data[i].created_time;
		erstellungszeit = formate(erstellungszeit);
		likes = data.data[i].likes;
		if (likes != undefined) {
			likes = likes.count;
		}

		if (message == undefined) {
			message = story;
		}
		if (titel == undefined) {
			titel = beschreibung;
			if (titel == undefined) {
				titel = message.substring(0, 20) + "...";
			}
		}
		if (link == undefined) {
			link = false;
		}
		if (bild == undefined) {
			bild = false;
		}
		youtubetest = "";
		if (link != false) {
			youtubetest = link.substring(0, 31);
			if (youtubetest == "http://www.youtube.com/watch?v=") {
				linkyou = link.slice(31, 42);
				linkyou = "<iframe width='300' height='169' src='http://www.youtube.com/embed/" + linkyou + "' style='float:left;' frameborder='0' allowfullscreen></iframe>
";
				youtubetest = "wahr";
			} else {
				youtubetest = link.substring(0, 29);
				if (youtubetest == "http://m.youtube.com/watch?v=") {
					linkyou = link.replace("m.youtube", "www.youtube");
					linkyou = link.slice(29, 40);
					linkyou = "
<iframe width='300' height='169' src='http://www.youtube.com/embed/" + linkyou + "' style='float:left;' frameborder='0' allowfullscreen></iframe>
";
					youtubetest = "wahr";
				}
			}
		}


		text += "
<div class='well'>
	";
		text += "
	<div class='search_top'>
		<a href='" + profillink + "' target='_blank'>
			<img src='" + thumbnail + "' border='0'></a>
		<a class='btn btn-primary' href='" + profillink + "' target='_blank'>" + username + "</a>
	</div>
	";
		text += "
	<div class='search_title'>" + erstellungszeit + " - " + titel + "</div>
	";
		text += "
	<div id='search_content'>
		";
		if (link != false) {
			text += "
		<a href='" + link + "' target='_blank'>" + link + "</a>
		<br>
		";
		}
		if (bild != false || youtubetest == "wahr") {
			if (youtubetest == "wahr") {
				text += "
		<p>
			" + linkyou;
			} else {
				text += "
			<p>
				<a href='" + link + "' target='_blank'>
					<img style='float: left;' src='" + bild + "' width='150px'/>
				</a>
				";
			}
		}
		text += message;
		if (bild != false || youtubetest == "wahr") {
			text += "
			</p>
			<div style='clear:both;'></div>
			";
		}
		if (likes != 0 && likes != undefined) {
			text += "
			<br>
			<br>
			<img src='img/like_hand.gif' height='20px'>
			" + likes;
		}
		text += "
		</div>
	</div>
	";

	}

	document.getElementById('content').innerHTML = text;
	randomklick = "unpress";
}


function randomname() {
	nameIndex = Math.round(Math.random() * (nameList.length - 1));
	document.form1.eingabe.value = nameList[nameIndex];
	randomklick = "press";
	start();
}

function example(eingabe) {
	document.form1.eingabe.value = eingabe;
	start();
}

function formate(time) {
	var newtime = "10:00"
	var minute, hour, day, month, year;
	year = time.substring(0, 4);
	month = time.substring(5, 7);
	day = time.substring(8, 10);
	hour = time.substring(11, 13);
	minute = time.substring(14, 16);
	newtime = hour + ":" + minute + " " + day + "." + month + "." + year;
	return newtime;
}


function stopError() {
	return true;
}


function handleKeyPress(evt) {
	if (evt.keyCode == 39) {
		randomname();
	}
}
document.onkeydown = handleKeyPress;