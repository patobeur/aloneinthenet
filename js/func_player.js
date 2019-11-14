"use strict";
var action_1;
var action_2;
var action_3;
var action_4;
var action_5;
// PLAYER
var players = ["player0", "player1"];
var players_css = ["player0", "player1"];
var players_names = ["player0", "player1"];
var kel_players = 0;
var alive = true;
var pos_y = (window.innerHeight/2)-20;
var pos_x = (window.innerWidth/2)-20;

var stats = ["vie", "soif", "faim", "moral", "fatigue"];
var sols = ["eau", "feu", "terre", "glace", "herbe"];
var items = ["arbre", "arbre_fruitier", "rocher", "baie", "coffre"];
var stocks = [5,2,1,0,0];
var stockspossible = [0,0,0,0,0];

var vie_max = 100;
var soif_max = 100;
var faim_max = 100;
var moral_max = 100;
var fatigue_max = 100;
var vie = vie_max;
var soif = soif_max;
var faim = faim_max;
var moral = moral_max;
var fatigue = fatigue_max;
//
var regen_vie = 0;
var regen_soif = 0;
var regen_faim = 0;
var regen_moral = 0;
var regen_fatigue = 0;
//
var etat_vie = 0;
var etat_soif = 0;
var etat_moral = 0;
var etat_faim = 0;
var etat_fatigue = 0;
var jours_depart = new Date();
var jours = new Date();
var T1 = jours_depart.getTime();


function refresh_pos_player(){
	//log_aff('refresh_pos_player','move to x:'+inf_pos_x+" y:"+inf_pos_y);
	refresh_info(player0_x,'inf_pos_x');
	refresh_info(player0_y,'inf_pos_y');
	if (document.getElementById(players[kel_players]).style) {
		document.getElementById(players[kel_players]).title = players_names[kel_players] +' sur la case '+player0_x+'x'+player0_y;
		document.getElementById(players[kel_players]).style.left = (player0_x-1)*ratio_pixel + 'px';
		document.getElementById(players[kel_players]).style.top = (player0_y-1)*ratio_pixel + 'px';
		document.getElementById(players[kel_players]).style.width = ratio_pixel + 'px';
		document.getElementById(players[kel_players]).style.height = ratio_pixel + 'px';
	}
}

function player_rotate(deg){
	document.getElementById(players[kel_players]).style.webkitTransform  = 'rotate('+deg+'deg)'; 
    document.getElementById(players[kel_players]).style.mozTransform    = 'rotate('+deg+'deg)'; 
    document.getElementById(players[kel_players]).style.msTransform     = 'rotate('+deg+'deg)'; 
    document.getElementById(players[kel_players]).style.oTransform      = 'rotate('+deg+'deg)'; 
    document.getElementById(players[kel_players]).style.transform       = 'rotate('+deg+'deg)'; 
}
// ------------------------------------------------------------------------
function calcul_pos_player(x,y){
	var id_poss = (x+(map_size_x*(y-1)))-1;
	//var id_poss2 = (player0_x+(player0_y*(y-1)))-1;
	//console.log('x:' + x+' y:' + y + ' id_poss:' + id_poss);
	//console.log('x:' + player0_x+' y:' + player0_y +' id_poss:' + id_poss);
	return id_poss;
}
//--------------------------------------------------------
function cases_proches(){
	var hg = calcul_pos_player((player0_x-1),(player0_y-1));
	var hm = calcul_pos_player((player0_x),(player0_y-1));
	var hd = calcul_pos_player((player0_x+1),(player0_y-1));
	var mg = calcul_pos_player((player0_x-1),(player0_y));
	var moi = calcul_pos_player((player0_x),(player0_y));
	var md = calcul_pos_player((player0_x+1),(player0_y));
	var bg = calcul_pos_player((player0_x-1),(player0_y+1));
	var bm = calcul_pos_player((player0_x),(player0_y+1));
	var bd = calcul_pos_player((player0_x+1),(player0_y+1));	
	var cases = [hg,hm,hd,mg,moi,md,bg,bm,bd];
	//console.log(hg+' '+hm+' '+hd+' '+mg+' '+moi+' '+md+' '+bg+' '+bm+' '+bd);
	return cases;
}
//--------------------------------------------------------
function actions_possible(cases){
	//console.log(cases)
	//{"id" : 168, "oqp" : 0, "type_sol_id" : 1, "mur" : 0,
	// "nom" : "herbe", "itemid" : 7, "nomitem" : "arbre", "stock" : 11},
	var oui = false;
	var i = 0;
	var nom_item = '';
	var item_stock = '';
	var item_id = '';
					clear_all_actions();
	for (i=0;i<9;i++){;
		if (cases[i]>=0){
			if (cases[i]<(map_size_x*map_size_y) ){
				if (map_arr.cases[0]['content'][cases[i]]['itemid'] && cases[i]>=0 && cases[i]<=(map_size_x*map_size_y) ){
					item_id = map_arr.cases[0]['content'][cases[i]].itemid;
					nom_item = map_arr.cases[0]['content'][cases[i]].nomitem;
					item_stock = map_arr.cases[0]['content'][cases[i]].stock;
					stock_possible(nom_item,item_stock);
					oui = true;
					//console.log(oui + '  id:'+cases[i]+' item_id:'+item_id+'  type:'+nom_item+' stock:'+item_stock);
					document.getElementById('case_'+cases[i]).opacity = 1;
				}
			}
		}
	}
	console.log(stockspossible);
}
function clear_all_actions(){
	var i = 0;
	for (i=0;i<5;i++){
		var nomtempo ='action_'+(i+1);
		stockspossible[i] = 0;
		document.getElementById(nomtempo).innerHTML = '';	
	}
}
function stock_possible(nom_item,item_stock){
	var i = 0;
	for (i=0;i<5;i++){
		if (nom_item==items[i]) {
			stockspossible[i] = stockspossible[i] + item_stock;
			update_actions(i);
		}
	}
	mes_stock();
}
function stock_possible(nom_item,item_stock){
	var i = 0;
	for (i=0;i<5;i++){
		if (nom_item==items[i]) {
			stockspossible[i] = stockspossible[i] + item_stock;
			update_actions(i);
		}
	}
	mes_stock();
}
function update_actions(i){
		var nomtempo ='action_'+(i+1);
		document.getElementById(nomtempo).innerHTML = items[i];	
}
function mes_stock(){
	// var items = ["arbre", "arbre_fruitier", "rocher", "baie", "coffre"];
	// var stocks = [5,2,1,0,0];
		if (stock_possible[0]>0) console.log(items[0] + ' x '+stocks[0]);
		if (stock_possible[1]>0) console.log(items[1] + ' x '+stocks[1]);
		if (stock_possible[2]>0) console.log(items[2] + ' x '+stocks[2]);
		if (stock_possible[3]>0) console.log(items[3] + ' x '+stocks[3]);
		if (stock_possible[4]>0) console.log(items[4] + ' x '+stocks[4]);
}
function possible_moov(id_poss){
	var ismoov = true;
	var typesolid = 0;
	var mur = 0;
	if (map_arr.cases[0]['content'][id_poss].mur == 1){ismoov = false;
		refresh_chat('Vous êtes bloqué par : ' + map_arr.cases[0]['content'][id_poss].nom);}
	if (map_arr.cases[0]['content'][id_poss].mur_item == 1){ismoov = false;
		refresh_chat('Vous êtes bloqué par un : ' + map_arr.cases[0]['content'][id_poss].nomitem);}
	//console.log(map_arr.cases[0]['content'][id_poss].mur+'- - - - - '+id_poss);
	//console.log(map_arr.cases[0]['content'][id_poss].mur_item+'- - - - - '+id_poss);
	return ismoov;
}