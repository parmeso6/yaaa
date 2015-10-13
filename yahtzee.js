window.onload = function() {
	new_tour(14);
	populateSelect('PutIt');
}

function new_tour(tour) {
	var des_init = [" - "," - "," - "," - "," - "];
	affichageDes(des_init);
	if (tour == 1) {
		alert("finito");
	} 
}

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
	var des=document.getElementById("des_a_lancer").innerHTML;
	des = JSON.parse("[" + des + "]").sort();
	var choice = document.getElementById("PutIt").value;
	var score = calculateScore(des, choice);
	affichageScore(score, choice);
	unpopulateSelect('PutIt');
	var tour = document.getElementById("PutIt").options.length;
	new_tour(tour);
}

function calculateScore(des, cat) {
	var score = 0
	if (cat.indexOf("nb") > -1) {
		var number = cat.replace("nb", "");
		var score = scorePartieHaute(number, des);
	} else if (cat == "chance") {
		score = sommeDes(des);
	} else if (cat == "yatz" && is_yatz(des)) {
		score = 50;
	} else if (cat == "full" && is_full(des)) {
		score = 25;
	} else if (cat == "gsuite" && is_gsuite(des)) {
		score = 40;
	} else if (cat == "psuite" && is_psuite(des)) {
		score = 30;
	} else if (cat == "carre" && is_carre(des)) {
		score = sommeDes(des);
	} else if (cat == "brelan" && (is_brelan(des) != 0)) {
		console.log('est un brelan');
		score = sommeDes(des);
	}
	return score;
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

function sommeDes(des) {
	var score = 0;
	des.forEach(function(de){
		score = score + de;
	})
	return score;
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
function createSelect(value, texte) {
	var opt = document.createElement('option');
		opt.value = value;
		opt.innerHTML = texte;
		select.appendChild(opt);
}

function populateSelect(target) {
	var categories = {"nb1" : "1",
						"nb2": "2",
						"nb3": "3",
						"nb4": "4",
						"nb5": "5",
						"nb6": "6",
						"brelan": "Brelan",
						"psuite": "Petite suite",
						"gsuite": "Grande suite",
						"full": "Full",
						"carre": "Carré",
						"chance": "Chance",
						"yatz": "Yaaaaahtzee"
						}
	if (!target){
        return false;
    }
    else {
        select = document.getElementById(target);
    	for (var key in categories) {
    		var opt = document.createElement('option');
    		opt.value = key;
    		opt.innerHTML = categories[key];
    		select.appendChild(opt);
    	}
    }
}
function unpopulateSelect(target) {
	if (!target){
        return false;
    }
    else {
    	var select = document.getElementById(target);
    	var chosenoption = select.options[select.selectedIndex];
    	select.removeChild(chosenoption);
    }
}

function is_brelan(des) {
	var response = 0;
	for (var i=0; i<3; i++) {
		if (des[i] == des[i+1] && des[i+1] == des[i+2]) {
			response = des[i];
		}
	}
	return response;
}

function is_psuite(des) {
	var response = false;
	for (var i=0; i<2; i++) {
		if ((des[i] == des[i+1] - 1) && (des[i+1] == des[i+2] - 1) && (des[i+2] == des[i+3] - 1)) {
			response = true;
		}
	}
	return response;
}

function is_gsuite(des) {
	var response = false;
	if ((des[0] == des[1] - 1) && (des[1] == des[2] - 1) && (des[2] == des[3] - 1) + (des[3] == des[4] - 1)) {
		response = true;
	}
	return response;
}

function is_full(des) {
	var response = false;
	if (is_brelan(des) != 0){
		for (var i=0; i<4; i++){
			if (des[i] != is_brelan(des) && des[i] == des[i+1]){
				response = true;
			}
		}
	}
	return response;
}

function is_carre(des){
	var response = false;
	for (var i=0; i<2; i++) {
		if (des[i] == des[i+1] && des[i+1] == des[i+2] && des[i+2] == des[i+3]) {
			response = true;
		}
	}
	return response;
}

function is_yatz(des) {
	var response = false;
	if (des[0] == des[4]) {
		response = true;
	}
	return response;
}
