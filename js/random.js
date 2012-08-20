var nameList = new Array();
var buchstaben = new Array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z');
var counter = 0;

for (var l0 = 0; l0 < buchstaben.length; l0++) {
	nameList[counter] = buchstaben[l0];
	counter++;
}


for (var l1 = 0; l1 < buchstaben.length; l1++) {
	for (var l2 = 0; l2 < buchstaben.length; l2++) {
		nameList[counter] = buchstaben[l1] + buchstaben[l2];
		counter++;
	}
}

nameList.push("youtube", "karl", "fun", "ice", "summer", "lady gaga", "justin", "football", "usa", "germany", "facebook", "boring", "lang", "fire", "party", "event", "fest");