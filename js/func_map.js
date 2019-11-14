"use strict";

//MAP
//STATS
var map_size_x = 50;
var map_size_y= 30;
var map_size_z= 0;
var map_json = '';
var map_arr = '';
var case_border = 0;
var cases_border = 1;
var map_pos_x = 0;
var map_pos_y = 0;
var map_pos_z = 0;
var map_zoom = 0;
var start_player0_x = nombre_entier(map_size_x/2);
var start_player0_y = nombre_entier(map_size_y/2);
var player0_x = start_player0_x;
var player0_y = start_player0_y;
var map_w = 0;
var map_h = 0;
var cout_deplacement = 4;

function creat_map() {
	var i = 0;
	map_w = ratio_pixel*map_size_x;
	map_h = ratio_pixel*map_size_y;
	
	if (document.getElementById('map').style) {document.getElementById('map').innerHTML = creat_cases();}
	refresh_map();
	
	if (document.getElementById('map').style) {document.getElementById('map').style.width = map_w + 'px';}
	if (document.getElementById('map').style) {document.getElementById('map').style.height = map_h + 'px';}
	var x = 1;
	var y = 1;
	for (i=0;i<(map_size_x*map_size_y);i++){
		document.getElementById('case_' + ( i )).style.width = (ratio_pixel - case_border) + 'px';
		document.getElementById('case_' + ( i )).style.height = (ratio_pixel - case_border) + 'px';
		if (x==map_size_x) {x=0;y++;}
		x++;
	}
}
function creat_cases() {
	//CASES CREATOR
	generate_map();
	var i = 0;
	var x = 1;
	var y = 1;
	var content = '';
	var sol_nom = '';
	var sol_id = 0;
	var sol_id_item = 0;
	var sol_nom_item = '';
	var item_stock = 0;
	for (i=0;i<(map_size_x*map_size_y);i++){
		
			sol_id = map_arr.cases[0]['content'][i].type_sol_id;
			sol_nom = map_arr.cases[0]['content'][i].nom;
			sol_id_item = map_arr.cases[0]['content'][i].type_sol_id;
			sol_nom_item = map_arr.cases[0]['content'][i].nomitem;
			item_stock = map_arr.cases[0]['content'][i].stock;
			
		content = content + '<div id="case_' + ( i  ) +'" class="cases '+sol_nom+' '+sol_nom_item+'" ';
		content = content + 'title="case_'+x+'_'+y+' \n de type '+sol_nom;
		if (item_stock>0) content = content + '\n présence de : '+sol_nom_item+'/'+item_stock;
		content = content + '"';
		content = content + '></div>';
		if (x==map_size_x) {x=0;y++;}
		x++;
	} 
	content = content +'<div id="'+players[kel_players]+'" class="players '+players_css[kel_players]+'" title="Moi"></div>';
	return content;
}
function refresh_map(){
	map_pos_x = (window.innerWidth/2)-(map_w/2) + ((start_player0_x - player0_x) * ratio_pixel);
	map_pos_y = (window.innerHeight/2)-(map_h/2) + ((start_player0_y - player0_y) * ratio_pixel);
	if (document.getElementById('map').style) {document.getElementById('map').style.top = map_pos_y + 'px';}
	if (document.getElementById('map').style) {document.getElementById('map').style.left = map_pos_x + 'px';}
} 
function generate_map(){
	// MAP GENERATOR
	var i = 0;
	var virgule = ',';
	var mapA='';
	var mapB='';
	
var map1=''+
'{\n'+
'	"cases":\n'+
'	[\n'+
'		{\n'+
'			"content":\n'+
'				[';
var map2='\n'+
'				]\n'+
'		},\n'+
'		{\n'+
'			"content":\n'+
'				[';
var map3='\n'+
'				]\n'+
'		}\n'+
'	]\n'+
'}\n';

// generation du json de la map 
	for (i=0;i<(map_size_x*map_size_y);i++){
		if (i==0) {virgule = '';} else {virgule = ',';}
		var letype = Math.floor((Math.random() * 80) + 1)
		var letype2 = Math.floor((Math.random() * 65) + 1)
		var lestock = Math.floor((Math.random() * 10) + 5)
		//niveau 0 au sol
		mapA = mapA + virgule + '\n				{"id" : '+i+',';
		mapA = mapA + ' "oqp" : 0,';
		mapA = mapA + ' "type_sol_id" : '+(letype-1)+',';
		mapA = mapA + ' "mur" : '+type_de_sol_arr.cases[0]['content'][(letype-1)].mur+',';
		mapA = mapA + ' "nom" : "'+type_de_sol_arr.cases[0]['content'][(letype-1)].nom+'"';		
		//niveau 1 en l'air
		mapB = mapB + virgule + '\n				{"id" : '+i+',';
		mapB = mapB + ' "oqp" : 0,';
		mapB = mapB + ' "type_sol_id" : '+(letype-1)+',';
		mapB = mapB + ' "mur" : '+type_de_sol_arr.cases[0]['content'][(letype-1)].mur+',';
		mapB = mapB + ' "nom" : "'+type_de_sol_arr.cases[0]['content'][(letype-1)].nom+'"';	
		
		if (type_de_sol_arr.cases[1]['content'][(letype2-1)].nom) {
			mapA = mapA + ', "itemid" : '+(letype2-1)+',';
			mapA = mapA + ' "mur_item" : '+type_de_sol_arr.cases[1]['content'][(letype2-1)].mur+',';
			mapA = mapA + ' "nomitem" : "'+type_de_sol_arr.cases[1]['content'][(letype2-1)].nom+'",';
			mapA = mapA + ' "stock" : '+lestock;
			mapB = mapB + ', "itemid" : '+(letype2-1)+',';
			mapB = mapB + ' "nomitem" : "'+type_de_sol_arr.cases[1]['content'][(letype2-1)].nom+'",';
			mapB = mapB + ' "stock" : '+lestock+'';
		}
		
		mapA = mapA + '}';
		mapB = mapB + '}';
	}
	
	map_json = map1+mapA+map2+mapB+map3;
	//console.log(map_json);
	map_arr = JSON.parse(map_json);
	//map_arr = JSON.parse(mamap);

	// console.log('---');
	// console.log(map_json);
	// console.log('---');

}
