window.onload = function() {
	var des_init = [0,0,0,0,0];
	affichageDes(des_init);
	populateSelect('PutIt');
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


var selectmenu=document.getElementById("mymenu")
selectmenu.onchange=function(){ //run some code when "onchange" event fires
 var chosenoption=this.options[this.selectedIndex] //this refers to "selectmenu"
 if (chosenoption.value!="nothing"){
  window.open(chosenoption.value, "", "") //open target site (based on option's value attr) in new window
 }
}

function submitScore() {
	var score = 0;
	var des=document.getElementById("des_a_lancer").innerHTML;
	des = JSON.parse("[" + des + "]").sort();
	var choice = document.getElementById("PutIt").value;
	console.log(choice);
	if (choice == "brelan") {
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
	affichageScore(score, choice);
	unpopulateSelect('PutIt');
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
    		opt.onselect = console.log("click sur"+opt.value.toString());
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

function is_empty(cat) {
	var case_grille = document.getElementById(cat);
	var is_empty = true;
	if (case_grille == ""){
		is_empty = false;
	}
	return is_empty;
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
