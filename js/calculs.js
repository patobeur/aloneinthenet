
function calculs() {	
	if (running && alive) {
		jours = msToTime(diffdate());
		
		//RECUP DE PTS
		if (vie<vie_max) {
			vie = vie + (fatigue/100)*ratio;
			//log_aff('calculs',' vie : +' + ((fatigue/1000)*ratio) + '/sec');
			}
		if (fatigue<fatigue_max) {
			fatigue = fatigue + ((vie/10)*ratio);
			//log_aff('calculs','fatigue : +' + ((vie/80)*ratio) + '/sec');
			}
			
		//PERTE DE PTS
		if (moral>=0) {
			moral = moral - ((1/100)*ratio);
			//log_aff('calculs',' moral : -' + (0.02*ratio) + '/sec');
			}
		if (soif>=0) {
			soif = soif - ((3/100)*ratio);
			//log_aff('calculs',' soif : -' + (0.05*ratio) + '/sec');
			}
		if (faim>=0) {
			faim = faim - ((2/100)*ratio);
			//log_aff('calculs',' faim : -' + (0.04*ratio) + '/sec');
			}
			
		check_stats();
		ifdeath();
		refresh_value();
	}
	//log_aff('calculs','');
}

function check_stats(){
	if (check_max(fatigue,fatigue_max)) fatigue=fatigue_max;
	if (check_max(vie,vie_max)) vie=vie_max;
	if (check_max(soif,soif_max)) soif=soif_max;
	if (check_max(moral,moral_max)) moral=moral_max;
	if (check_max(faim,faim_max)) faim=faim_max;
}
function check_max(stat,max){
	var test = true;
	if (stat>max == true) {test = true}
	else {test = false}
	return test;
}
function msToTime(duration) {
	duration = duration * ratio_time;
	var milliseconds = parseInt((duration%1000)/100)
	, seconds = parseInt((duration/1000)%60)
	, minutes = parseInt((duration/(1000*60))%60)
	, hours = parseInt((duration/(1000*60*60))%24);
	hours = (hours < 10) ? "0" + hours : hours;
	minutes = (minutes < 10) ? "0" + minutes : minutes;
	seconds = (seconds < 10) ? "0" + seconds : seconds;
	//return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
	return hours + ":" + minutes + ":" + seconds;
}
function diffdate(){
	var T2 = new Date();
	T2 = T2.getTime();
	var T3 = T2 - T1;
	//log_aff ('diffdate',console.log(msToTime(T3)));
	//return Math.ceil(WNbJours/(1000*60*60*24));
	return T3;
}
function ifdeath(){
	var etat = '';
	if (vie<=0){
		alive = false;
		etat = "Mort de faim. ";
		etat_vie = etat;
	}
	if (soif<=0){
		alive = false;
		etat = "Mort de soif. "
		etat_soif = etat;
	}
	if (faim<=0){
		alive = false;
		etat = "Mort de faim. "
		etat_faim = etat;
	}
	if (moral<=0){
		alive = false;
		etat = "Vous sombrez dans la folie"
		etat_moral = etat;
	}
	refresh_info(etat_vie,'inf_evie');
	refresh_info(etat_soif,'inf_esoif');
	refresh_info(etat_faim,'inf_efaim');
	refresh_info(etat_moral,'inf_emoral');
	
	if (!alive) console.log('Evenement. ' + etat );
}
function test_etat(){
	refresh_info(echelons('vie',vie),'inf_evie');
	refresh_info(echelons('soif',soif),'inf_esoif');
	refresh_info(echelons('faim',faim),'inf_efaim');
	refresh_info(echelons('moral',moral),'inf_emoral');	
}
function echelons(koi,value){
	return nombre_entier(value/10);
}