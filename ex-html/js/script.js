// Je récupère l'objet html
var body = document.getElementsByTagName('body')[0];

// Je crée mon nouveau paragraphe
var myParagraph = document.createElement('p');
// Je lui rajoute des attributs
myParagraph.id = 'myId';
myParagraph.title = 'Infobulle !';

// Je crée un noeud textuel
var noeudText = document.createTextNode('#text');
// Je lui définis un du texte
noeudText.nodeValue = 'Je suis un paragraphe ajouté dynamiquement en Js !';
// J'insère mon noeud textuel
myParagraph.appendChild(noeudText);

// Je l'insère
body.appendChild(myParagraph);
