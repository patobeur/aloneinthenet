
function refresh_value() {
	if (running) {
		refresh_info(vie,'inf_vie');
		refresh_info(soif,'inf_soif');
		refresh_info(faim,'inf_faim');
		refresh_info(moral,'inf_moral');
		refresh_info(fatigue,'inf_fatigue');
		refresh_time(jours,'inf_jours');
		// -----------------------		
		// -----------------------
		refresh_stat(nombre_entier(fatigue),'fatigue');
		refresh_stat(nombre_entier(vie),'vie');
		refresh_stat(nombre_entier(soif),'soif');
		refresh_stat(nombre_entier(moral),'moral');
		refresh_stat(nombre_entier(faim),'faim');
		// -----------------------		
		refresh_info(players_names[kel_players],'inf_nom');
		// -----------------------
		refresh_gauge(vie,'gauge_vie');
		refresh_gauge(soif,'gauge_soif');
		refresh_gauge(faim,'gauge_faim');
		refresh_gauge(moral,'gauge_moral');
		refresh_gauge(fatigue,'gauge_fatigue');
	}
	//log_aff('refresh_value',' running=' + running);
}

function refresh_time(stat,styleid){
	//if (document.getElementById(styleid).style) {document.getElementById(styleid).innerHTML = styleid + " : " + stat.getHours() + ":" + stat.getMinutes() + ":" + stat.getSeconds();}
	if (document.getElementById(styleid).style) {document.getElementById(styleid).innerHTML = styleid + " : " + jours}
}
function refresh_info(stat,styleid){
	if (document.getElementById(styleid).style) {document.getElementById(styleid).innerHTML = styleid + " : " + stat;}
}
function refresh_stat(stat,styleid){
	if (document.getElementById(styleid).style) {document.getElementById(styleid).innerHTML = stat;}
}
function refresh_info2(stat,styleid){
	if (document.getElementById(styleid).style) {document.getElementById(styleid).innerHTML = obj_soif.soif[1].firstName + " " + obj_soif.soif[1].lastName;}
}
function refresh_gauge(stat,styleid){
	document.getElementById(styleid).style.top = 100 - stat + "%";
}