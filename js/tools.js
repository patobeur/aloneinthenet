function tools(num){
	if (num == 1) runrefresh('T_console');
	if (num == 2) re_start();
	if (num == 3) runpause('T_pause');
	if (num == 4) ratio_change(1);
	if (num == 5) ratio_change(0);
	if (num == 6) on_off_rapide_barre('inventaire',0);
	if (num == 7) on_off_aide('inf_aide',0);
	
	if (num == 10) log_aff('Arbre','pas encore');
	if (num == 11) log_aff('fruitier','pas encore');
	if (num == 12) log_aff('rocher','pas encore');
	if (num == 13) log_aff('baie','pas encore');
	if (num == 14) log_aff('coffre','pas encore');
}
function langue(lang){
	choixlangue = lang;
}
function runrefresh(vall){
	if (consoling == true){consoling = false;}
	else{consoling = true;}
	on_off_bouton(vall,consoling);
}
function runpause(vall){
	if (running == true){running = false;}
	else{running = true;}
	on_off_bouton(vall,running);
}
function on_off_bouton(divid,val){
	if (val == true) {document.getElementById(divid).style.background = 'rgba(0,255,0,1)';}
	else {document.getElementById(divid).style.background = 'rgba(255,0,0,1)';}
}
function on_off_rapide_barre(divid,forcing){
	if (forcing==0){
		if (rapide_barre == true){
			rapide_barre = false;
			document.getElementById(divid).style.display = 'none';
		}
		else{
			rapide_barre = true;
			document.getElementById(divid).style.display = '';
		}
	}
	else if (forcing==1){
		rapide_barre = true;
		document.getElementById(divid).style.display = '';
	}
	else if (forcing==2){
		rapide_barre = false;
		document.getElementById(divid).style.display = 'none';
	}
	on_off_bouton('T_rapide',rapide_barre);
}
function on_off(){
	console.log('yes');
		if (document.getElementById('g_0').style.display == 'none'){
			document.getElementById('g_0').style.display = '';
			document.getElementById('g_1').style.display = '';
			document.getElementById('g_2').style.display = '';
			document.getElementById('g_3').style.display = '';
			document.getElementById('g_4').style.display = '';
		}
		else{
			document.getElementById('g_0').style.display = 'none';
			document.getElementById('g_1').style.display = 'none';
			document.getElementById('g_2').style.display = 'none';
			document.getElementById('g_3').style.display = 'none';
			document.getElementById('g_4').style.display = 'none';
		}
}
function on_off_aide(divid,forcing){
	if (forcing==0){
		if (aide == true){
			aide = false;
			document.getElementById(divid).style.display = 'none';
		}
		else{
			aide = true;
			document.getElementById(divid).style.display = '';
		}
	}
	else if (forcing==1){
		aide = true;
		document.getElementById(divid).style.display = '';
	}
	else if (forcing==2){
		aide = false;
		document.getElementById(divid).style.display = 'none';
	}
	on_off_bouton('T_aide',aide);
	
	refresh_chat(info_aide);
	}
function init_tools(){
	on_off_bouton('T_console',consoling);
	on_off_bouton('T_pause',running);
}
function ratio_change(val) {
	if (val==0) {ratio=ratio-10;ratio_time = ratio_time - 10;}
	else {ratio=ratio+10;ratio_time = ratio_time + 10}
	
	if (ratio<1) ratio=1;
	if (ratio>300) ratio=300;
	if (ratio_time<1) ratio_time=1;
	if (ratio_time>300) ratio_time=300;
	if (consoling) console.log('[ratio:' + ratio + ' et ratio_time:' + ratio_time + ']');
}