"use strict";

function demande_nom(){
	var lediv = '<div id="nom_ask">'+
		'<div id="form">'+
			'<form id="myForm" name="myForm">'+
				'<h1>Alone...</h1>'+
				'<h2>Indiquez un autre nom ?</h2>'+
				'<input id="monnom" "title="Choissisez un autre nom ?" class="inputname" type="text" name="fname" value="">'+
				'<span class="span" onclick="nom_alea();">R</span>'+
				'<h3 onclick="validateForm()">Jouer</h3>'+
			'</form>'+
		'</div>'+
	'</div>';
	document.getElementById('nom').innerHTML = lediv;
}
function nom_alea(){	
	var prenom_hazar = Math.floor((Math.random() * 10) + 1)
	var prenom = ['Jean','Pierre','Marie','Sophie','Robert','Ygor','Bob','Jules','Annette','Omar','Fernando',]
	var nom_hazar = Math.floor((Math.random() * 10) + 1)
	var nom = ['Latouffe','Lamoote','Pompette','BrootBoot','De la Véga','Montoya','Bras d\'acier','Dubar','Gortuk','Yvanovapolys','Radja',]
	var nom_alea = prenom[prenom_hazar]+' '+nom[nom_hazar]
	document.getElementById('monnom').value = nom_alea;
	return nom_alea;
}
function demande_nom_clear(){
	document.getElementById('nom').innerHTML = '';
	document.getElementById('nom').style.display = 'none';
}

function validateForm() {
	refresh_chat('form ',nom);
    var x = document.forms["myForm"]["fname"].value;
    if (x == null || x == "") {
        alert("vous n'avez pas de nom ?");
        return false;
    }
	else {
		players_names[kel_players] = x;
		demande_nom_clear();
		start();
	}
}