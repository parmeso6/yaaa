	var des_init = [0,0,0,0,0];
	window.onload = affichageDes(des_init);

	function play() {
		var des = lancerDes();
		affichageDes(des);
	}

	function lancerDes() {
		var des = [];
		for (var i=0; i<5; i++) {
			des = des.concat(Math.floor((Math.random() * 6)) + 1); 
		};
		return des;
	}

	function affichageDes(des) {
		document.getElementById("des_a_lancer").innerHTML = des;
	}

	function submitScore() {
		var score = 0;
		var id_score = "";
		var des=document.getElementById("des_a_lancer").innerHTML;
		des = JSON.parse("[" + des + "]");
		var choice = document.getElementById("PutIt").selectedIndex;
		var id_score = idResult(choice);
		if (choice == 0) {
			alert("Beh, vous n'avez rien choisi");
		} else if (choice < 7) {
			score = scorePartieHaute(choice, des);
		} else {
			if (choice == 7){score = brelan(des);}
			else if (choice == 8){score = 30;}
			else if (choice == 9){score = 40;}
			else if (choice == 10){score = 25;}
			else if (choice == 11){score = brelan(des);}
			else if (choice == 12){score = brelan(des);}
			else { score = 50;}
		}
		affichageScore(score, id_score);
	}

	function scorePartieHaute(number, des) {
		var score = 0;
		des.forEach(function(de){
			if (de == number) {
				score = score + de;
			}
		});
		return score;
	}

	function idResult(number) {
		return "nb"+number.toString();
	}

	function affichageScore(score, id_score) {
		document.getElementById(id_score).innerHTML = score;
	}

	function brelan(des){
		var score = 0;
		des.forEach(function(de){
			score = score + de;
		})
		return score;
	}