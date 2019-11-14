"use strict";
var retour_chariot = '<br />';
var chat_content='';

function refresh_chat(text,forcing){
	var br = retour_chariot;
	if (forcing=='' || !forcing){
		if (text=='') br = '';
		chat_content = iteration +':'+ text + br + chat_content;
	}
	else if (!forcing==''){
		chat_content = iteration +':'+ text + ' ' + forcing + retour_chariot + chat_content;
	}
	document.getElementById('chat_in').innerHTML = chat_content;	
}