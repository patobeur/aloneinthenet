"use strict";
var todo='todo list :\n'+
'phrase des items à mettre dans le map_json dans un "item_phrase" par ex.  \n'+
'tester les cases environantes par l\'id_tem et par le nom\n';
	 console.log(todo);
var info_aide='Aides : <br/>'+
'i pour l\'inventaire.<br/>'+
'g pour afficher les gauges.<br/>'+
'h pour l\'aide.<br/>'+
'Les flêches pour se déplacer.';
//CALCULS
var ratio = 1;
var ratio_time = 1; // vitesse du temps
var ratio_nourriture = 10; //ration gain/perte cossomable
var consoling = true; // affichage dans la console
var running = true;	// marche arret de routine() 
var rapide_barre = true;
var aide = false;
//running = false;
var iteration = 0; // nb de fois ou la boucle est jouée
var ratio_pixel = 50; // nb pixel de deplacement/taille player/repair map

//LANGUE
var choixlangue = 0; //0=fr 1=us





//barre rapide

//CHAT
var horloge = 0;

window.onload = function() {
	//zooming = detectZoom.zoom();
	demande_nom();
	nom_alea();
	on_off_rapide_barre('inventaire',1);
	on_off_aide('inf_aide',2);
	refresh_chat('onload...');
	
}



function re_start(){
	
	
	start_player0_x = nombre_entier(map_size_x/2);
	start_player0_y = nombre_entier(map_size_y/2);
	player0_x = start_player0_x;
	player0_y = start_player0_y;
				


	//CHAT
	chat_content='';
	//refresh_chat('restarted...');
	refresh_chat(textes_arr.phrases[choixlangue]['content'][0]['phrase'],players_names[kel_players]);
	running = true;
	alive = true;
	iteration = 0;

	vie = 100;
	soif = 100;
	moral = 100;
	faim = 100;
	fatigue = 0;
	etat_vie = 0;
	etat_soif = 0;
	etat_moral = 0;
	etat_faim = 0;
	etat_fatigue = 0;
	jours_depart = new Date();
	T1 = jours_depart.getTime();
	pos_x = nombre_entier((window.innerWidth/2)-20,0);
	pos_y = nombre_entier((window.innerHeight/2)-20,0);
	if (running) look_invent(0);
	if (running) refresh_value();
	init_tools();
	
	if (running) creat_map();
	if (running) actions_possible(cases_proches());
	if (running) refresh_pos_player();
	
	
	//sera executée toute les 1s (1000ms)
	horloge = window.setInterval('routine();' , 1000);
}
function start() {
	//running = false;
	start_player0_x = nombre_entier(map_size_x/2);
	start_player0_y = nombre_entier(map_size_y/2);
	player0_x = start_player0_x;
	player0_y = start_player0_y;
				//console.log(player0_x+' '+player0_y);
	//CHAT
	chat_content='';
	refresh_chat(textes_arr.phrases[choixlangue]['content'][0]['phrase'],players_names[kel_players]);
	running = true;
	alive = true;
	iteration = 0;
	vie = 100;
	soif = 100;
	moral = 100;
	faim = 100;
	fatigue = 0;
	etat_vie = 0;
	etat_soif = 0;
	etat_moral = 0;
	etat_faim = 0;
	etat_fatigue = 0;
	jours_depart = new Date();
	T1 = jours_depart.getTime();
	pos_x = nombre_entier((window.innerWidth/2)-20,0);
	pos_y = nombre_entier((window.innerHeight/2)-20,0);
	if (running) look_invent(0);
	if (running) refresh_value();
	init_tools();
	
	creat_map();
	actions_possible(cases_proches());
	refresh_pos_player();
	
	//sera executée toute les 1s (1000ms)
	horloge = window.setInterval('routine();' , 1000);
}
function nombre_virgule(value,virgule) {
	value = parseFloat(value).toFixed(2);
	return value;
}
function nombre_entier(value) {
	return value | 0;
}
function log_aff(func_from,txt){
	if (consoling) console.log('[from:' + func_from + '] ' + txt);
}
function routine() {
	iteration++;
	if (running) calculs();
	if (running) test_etat();
	//log_aff('routine','(' + iteration + '------------------)');
	//log_aff('routine','(running:' + running + ')');
	//log_aff('routine','(consoling:' + consoling + ')');
}