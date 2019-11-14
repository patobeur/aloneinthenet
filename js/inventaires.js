"usestrict";
var  inventaire=false;

function look_invent(kelsac){
//
	var i=0;
	var name_sac=inventaire_arr.inventaire[kelsac]['nom'];
	var espace_sac=inventaire_arr.inventaire[kelsac]['espace'];
	var temp_item_arr;
	var id_item='';
	var nom_item='';
	var type_item='';
	var kelcase='';
	var koi='';
	
	var text1='['+name_sac+'][';
	var text2=']';
	var stock;
	for(i=0;i<espace_sac;i++){
		id_item=inventaire_arr.inventaire[kelsac]['content'][i]['id_item'];
		stock=inventaire_arr.inventaire[kelsac]['content'][i]['stock'];
		var text='case_'+(i+1);		
		if(id_item!=""){
			temp_item_arr=item_arr.objets[id_item];
			nom_item=item_arr.objets[id_item]['nom'];
			type_item=item_arr.objets[id_item]['type'];
			text='case_'+(i+1)+':id'+id_item+':'+type_item+':'+nom_item + ' stock:'+stock;
			// kelcase='moi-'+(i+1);
			kelcase=i;
			koi=item_arr.objets[id_item];
			refresh_sac(name_sac,kelcase,koi,id_item,kelsac)
		}
		//console.log(text1+text+text2);
	}

}
function click_barre(type,kelsac,kelcase,id_item){
	if(inventaire_arr.inventaire[kelsac]['content'][kelcase]['stock']>0) {
		if (type=='consomable') manger(type,kelsac,kelcase,id_item,kelsac);
	}
	else {
		alert('stock insufisant : action IMPOSSIBLE  BUG');
	}
}
function manger(type,kelsac,kelcase,id_item,kelsac){
	kelcase++;
	//console.log('stock:'+inventaire_arr.inventaire[kelsac]['content'][kelcase]['stock']+'case:'+(kelcase));
	kelcase--;
	if(inventaire_arr.inventaire[kelsac]['content'][kelcase]['stock']>0) {
		
		effet(id_item);
		inventaire_arr.inventaire[kelsac]['content'][kelcase]['stock'] = inventaire_arr.inventaire[kelsac]['content'][kelcase]['stock']-1;
		if(inventaire_arr.inventaire[kelsac]['content'][kelcase]['stock']<=0) clear_inventory(kelsac,kelcase);
		// effet(stat,valeur);
		look_invent(kelsac);
	}
}
function clear_inventory(kelsac,kelcase){
	kelcase++;
	var mondiv = inventaire_arr.inventaire[kelsac]['nom']+'-'+(kelcase);
	kelcase--;
	//console.log('clear '+mondiv + '--' + kelcase);
	inventaire_arr.inventaire[kelsac]['content'][kelcase]['stock'] = '';
	inventaire_arr.inventaire[kelsac]['content'][kelcase]['id_item'] = '';
	if(document.getElementById(mondiv)){
		document.getElementById(mondiv).style.background='#FFFFFF';
		document.getElementById(mondiv).title="vide";
		document.getElementById(mondiv).setAttribute("onclick","");
	}
			
}
function effet(id_item){	
	if(!item_arr.objets[id_item]['vie']=='' && vie <= (vie_max-item_arr.objets[id_item]['vie'])) vie = vie + (item_arr.objets[id_item]['vie']*ratio_nourriture);
	if(!item_arr.objets[id_item]['soif']=='' && soif <= (soif_max-item_arr.objets[id_item]['soif'])) soif = soif + (item_arr.objets[id_item]['soif']*ratio_nourriture);
	if(!item_arr.objets[id_item]['faim']=='' && faim <= (faim_max-item_arr.objets[id_item]['faim'])) faim = faim + (item_arr.objets[id_item]['faim']*ratio_nourriture);
	if(!item_arr.objets[id_item]['morale']=='' && moral <= (morale_max-item_arr.objets[id_item]['moral'])) morale = (moral + item_arr.objets[id_item]['moral']*ratio_nourriture);
	if(!item_arr.objets[id_item]['fatigue']=='' && fatigue <= (fatigue_max-item_arr.objets[id_item]['fatigue'])) fatigue = (fatigue + item_arr.objets[id_item]['fatigue']*ratio_nourriture);
	
	refresh_manger_chat(textes_arr.phrases[choixlangue]['content'][1]['phrase'] + item_arr.objets[id_item]['phrase']);
	//refresh_manger_chat('vie :',item_arr.objets[id_item]['vie']);
	//refresh_manger_chat('soif :',item_arr.objets[id_item]['soif']);
	//refresh_manger_chat('faim :',item_arr.objets[id_item]['faim']);
	//refresh_manger_chat('moral :',item_arr.objets[id_item]['moral']);
	//refresh_manger_chat('fatigue :',item_arr.objets[id_item]['fatigue']);
	/*	
	var i = 0;
	for (i=0;i<5;i++){
		var lastats = stats[i];
	}
	*/
	refresh_value()
}

function refresh_manger_chat(stat,gain){
	refresh_chat(stat,gain);
}
function refresh_sac(name_sac,kelcase,koi,id_item,kelsac){
	
	var mondiv = name_sac + '-' + (kelcase+1);
	var  description='nom:'+koi.nom+'\n'+
	'stock:'+inventaire_arr.inventaire[kelsac]['content'][kelcase]['stock']+'\n'+
	'type:'+koi.type+'\n'+
	'description:'+koi.description+'\n'+
	'stackable:'+koi.stackable+'\n'+
	'vie:'+koi.vie+'\n'+
	'faim:'+koi.faim+'\n'+
	'soif:'+koi.soif+'\n'+
	'moral:'+koi.moral+'\n'+
	'fatigue:'+koi.fatigue+'\n'+
	'emcombrement:'+koi.emcombrement+'\n'+
	'charge:'+koi.charge+'\n';
	//if(document.getElementById(kelcase)){document.getElementById(kelcase).innerHTML=madiv;}
	if(document.getElementById(mondiv)){
		document.getElementById(mondiv).style.background='url(\'img/'+koi.img+'\')';
		document.getElementById(mondiv).title=description;
		document.getElementById(mondiv).setAttribute("onclick","click_barre('"+koi.type+"','"+kelsac+"','"+(kelcase)+"','"+id_item+"')");
	}
}

var  inventaire_json='{"inventaire":['+
'							{'+
'							"nom":"moi",'+
'							"espace":"8",'+
'							"content":'+
'								['+
'									{"id_item":"1","stock" : 7},'+
'									{"id_item":"2","stock" : 21},'+
'									{"id_item":"3","stock" : 1},'+
'									{"id_item":"","stock" : 0},'+
'									{"id_item":"","stock" : 0},'+
'									{"id_item":"","stock" : 0},'+
'									{"id_item":"","stock" : 0},'+
'									{"id_item":"","stock" : 0}'+
'								]'+
'							},'+
'							{'+
'							"nom":"sac1",'+
'							"espace":"12",'+
'							"content":'+
'								['+
'									{"id_item":"","stock" : 0},'+
'									{"id_item":"","stock" : 0},'+
'									{"id_item":"","stock" : 0},'+
'									{"id_item":"","stock" : 0},'+
'									{"id_item":"","stock" : 0},'+
'									{"id_item":"","stock" : 0},'+
'									{"id_item":"","stock" : 0},'+
'									{"id_item":"","stock" : 0},'+
'									{"id_item":"","stock" : 0},'+
'									{"id_item":"","stock" : 0},'+
'									{"id_item":"","stock" : 0},'+
'									{"id_item":"","stock" : 0}'+
'								]'+
'							},'+
'							{'+
'							"nom":"sac2",'+
'							"espace":"16",'+
'							"content":'+
'									['+
'									{"id_item":"","stock" : 0},'+
'									{"id_item":"","stock" : 0},'+
'									{"id_item":"","stock" : 0},'+
'									{"id_item":"","stock" : 0},'+
'									{"id_item":"","stock" : 0},'+
'									{"id_item":"","stock" : 0},'+
'									{"id_item":"","stock" : 0},'+
'									{"id_item":"","stock" : 0},'+
'									{"id_item":"","stock" : 0},'+
'									{"id_item":"","stock" : 0},'+
'									{"id_item":"","stock" : 0},'+
'									{"id_item":"","stock" : 0},'+
'									{"id_item":"","stock" : 0},'+
'									{"id_item":"","stock" : 0},'+
'									{"id_item":"","stock" : 0},'+
'									{"id_item":"","stock" : 0}'+
'									]'+
'								}'+
'							]'+
'						}';
var  inventaire_arr=JSON.parse(inventaire_json);