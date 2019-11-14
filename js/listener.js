"use strict";

document.addEventListener("wheel", function(event) {
      //console.log('zooming = '+ zooming);
      //zoom = detectZoom.zoom();
      // device = detectZoom.device();
		// if (zooming<device) console.log('zoom in to ' + zooming);
		// if (zooming>device) console.log('zoom out to ' + zooming);
	  // zooming = device;
      //console.log(zoom, device);

});

window.addEventListener('resize', function(event){
	refresh_map();
});
// - KEYDOWN -----------------------------------------------------------------------
// deplacements keydown
document.addEventListener('keydown', function(event) {
	if (running){
		var zecode = event.keyCode;                // Get the Unicode value
		var zecar = String.fromCharCode(event.keyCode); 
			log_aff('addEventListener','clavier :\'' + event.keyCode + ' = ' + zecar + '\'');
		if (alive){
			if(event.keyCode > 36 && event.keyCode < 41 ) {		

			//console.log('moove ----- ');			
				// DEPLACEMENT
				if(event.keyCode == 38) {//UP
					UP();
					 //&& player0_y > (0-(map_size_x/2))
				}
				else if(event.keyCode == 39) {//RIGHT
					RIGHT();
				}
				else if(event.keyCode == 40) {//DOWN
					DOWN();
				}
				else if(event.keyCode == 37) {//LEFT
					LEFT();
				}
			}
			else if(event.keyCode > 64 && event.keyCode < 80 ) {//UP)		
				// Inventaire
				if(event.keyCode == 65) {//a
					on_off_rapide_barre('inventaire',0);
				}
				else if(event.keyCode == 72) {//i
					on_off_aide('T_aide',0);
				}
				else if(event.keyCode == 73) {//i
					on_off_rapide_barre('inventaire',0);
				}
				else if(event.keyCode == 71) {//g
					on_off('gauges');
				}
			}
		}
	}
});
// - KEYUP -----------------------------------------------------------------------
// boutton change color deplacements keyup
document.addEventListener('keyup', function(event) {
if (running){
		if (alive){
			if(event.keyCode == 38) {//UP
				document.getElementById('n').style.backgroundColor = 'rgba(0,0,0,.1)';
			}
			else if(event.keyCode == 40) {//DOWN
				document.getElementById('s').style.backgroundColor = 'rgba(0,0,0,.1)';
			}
			if(event.keyCode == 37) {//LEFT
				document.getElementById('e').style.backgroundColor = 'rgba(0,0,0,.2)';
			}
			else if(event.keyCode == 39) {//RIGHT
				document.getElementById('o').style.backgroundColor = 'rgba(0,0,0,.2)';
			}
		}
}
});
// ------------------------------------------------------------------------
function UP(){
	if (fatigue>cout_deplacement && player0_y>1) {
			document.getElementById('n').style.backgroundColor = 'rgba(0,0,0,1)';
			//pos_y = nombre_entier(pos_y - (1*ratio_pixel));
			//console.log(calcul_pos_player(player0_x,(player0_y-1)));
			if (possible_moov(calcul_pos_player(player0_x,(player0_y-1)))) {
				//if (type_de_sol_arr.cases[0]['content'][map_arr.cases[0]['content'][calcul_pos_player(player0_x,(player0_y-1))].type_sol_id].mur == 0){			
				player_rotate(0);
				if (fatigue>=1) {fatigue = fatigue - cout_deplacement;}
				player0_y--;
				refresh_value();
				refresh_map();
				refresh_pos_player();
				actions_possible(cases_proches());
				//}
			}
	document.getElementById('n').style.backgroundColor = 'rgba(0,0,0,.1)';
	}
}
function DOWN(){
	if (fatigue>cout_deplacement && player0_y<map_size_y) {
		document.getElementById('s').style.backgroundColor = 'rgba(0,0,0,1)';
		//pos_y = nombre_entier(pos_y + (1*ratio_pixel));
			//calcul_pos_player(player0_x,player0_y+1);
			if (possible_moov(calcul_pos_player(player0_x,player0_y+1))) {
				player_rotate(180);	
				if (fatigue>=1) {fatigue = fatigue - cout_deplacement;}
					player0_y++;
				refresh_value();
				refresh_map();
				refresh_pos_player();
				actions_possible(cases_proches());
			}
	}
			else {
			refresh_chat('vous allez dans le vide');
			}
	document.getElementById('s').style.backgroundColor = 'rgba(0,0,0,.1)';
}
function LEFT(){
	if (fatigue>cout_deplacement && player0_x>1) {
		document.getElementById('e').style.backgroundColor = 'rgba(0,0,0,1)';
		//pos_x = nombre_entier(pos_x - (1*ratio_pixel));
			//calcul_pos_player(player0_x-1,player0_y);
			if (possible_moov(calcul_pos_player(player0_x-1,player0_y))) {
				player_rotate(-90);	
				//refresh_pos_player(pos_x,pos_y);	
				if (fatigue>=1) {fatigue = fatigue - cout_deplacement;}
				player0_x--;
				refresh_value();
				refresh_map();
				refresh_pos_player();
				actions_possible(cases_proches());
			}
	}
			else {
			refresh_chat('vous allez dans le vide');
			}
	document.getElementById('e').style.backgroundColor = 'rgba(0,0,0,.1)';
}
function RIGHT(){
	if (fatigue>cout_deplacement && player0_x<map_size_x) {
		document.getElementById('o').style.backgroundColor = 'rgba(0,0,0,1)';
			//calcul_pos_player(player0_x+1,player0_y);
			if (possible_moov(calcul_pos_player(player0_x+1,player0_y))) {
				//pos_x = nombre_entier(pos_x + (1*ratio_pixel));
				player_rotate(90);	
				//refresh_pos_player(pos_x,pos_y);	
				if (fatigue>=1) {fatigue = fatigue - cout_deplacement;}
				player0_x++;
				refresh_value();
				refresh_map();
				refresh_pos_player();
				actions_possible(cases_proches());
			}
	}
			else {
			refresh_chat('vous allez dans le vide');
			}
	document.getElementById('o').style.backgroundColor = 'rgba(0,0,0,.1)';
}


