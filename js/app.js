
//slide
const slideHero = new Slide("slide", "boutons", "boutonLeft", "boutonRight", "boutonPlayPause", 5000, true);

//ville
const marseille = new Ville("Marseille", 43.3027, 5.3817, 13, "map", "infoMap", "blocSignature");

//canvas signature
const canvasSignature = new Canvas("signature", "#000");

//zone signature
const signature = new Signature(canvasSignature, "effacerCanvas", "retourCanvas", "validerCanvas", marseille, "blocReservation", "nom", "prenom");

window.addEventListener("load", function(){
	slideHero.init();
	marseille.init();
	canvasSignature.init();
	signature.init();
});