"use strict";
var item_json = '{'+
	'"objets": ['+
    '{'+
      '"nom": "Pomme",'+
      '"phrase": "Une Pomme",'+
      '"description": "Une Pomme",'+
      '"type": "consomable",'+
      '"stackable": "oui",'+
      '"vie": 2,'+
      '"faim": 2,'+
      '"soif": 3,'+
      '"moral": 3,'+
      '"fatigue": 2,'+
      '"img": "pomme.png",'+
      '"emcombrement": 1,'+
      '"charge": 1'+
    '},'+
    '{'+
      '"nom": "Banane",'+
      '"phrase": "Une Banane",'+
      '"description": "Une banane.",'+
      '"type": "consomable",'+
      '"stackable": "oui",'+
      '"vie": 2,'+
      '"faim": 2,'+
      '"soif": 1,'+
      '"moral": 2,'+
      '"fatigue": 2,'+
      '"img": "banane.png",'+
      '"emcombrement": 1,'+
      '"charge": 1'+
    '},'+
    '{'+
      '"nom": "Orange",'+
      '"phrase": "Une Orange",'+
      '"description": "Une Orange.",'+
      '"type": "consomable",'+
      '"stackable": "oui",'+
      '"vie": 2,'+
      '"faim": 2,'+
      '"soif": 3,'+
      '"moral": 2,'+
      '"fatigue": 3,'+
      '"img": "orange.png",'+
      '"emcombrement": 1,'+
      '"charge": 1'+
    '},'+
    '{'+
      '"nom": "Hache",'+
      '"phrase": "Une Hache",'+
      '"description": "Une Hache",'+
      '"type": "outils",'+
      '"stackable": "non",'+
      '"vie": "",'+
      '"faim": "",'+
      '"soif": "",'+
      '"moral": "",'+
      '"fatigue": "",'+
      '"img": "hache.png",'+
      '"emcombrement": 5,'+
      '"charge": ""'+
    '}'+
  ']'+
'}';
var item_arr = JSON.parse(item_json);