//clé api JCDecaux : c633b356069b6327b8f7ad355b4af60655380999
// url get station - https://api.jcdecaux.com/vls/v1/stations?contract=Marseille&apiKey=c633b356069b6327b8f7ad355b4af60655380999

//slide
const slideHero = new Slide("slide", "boutonLeft", "boutonRight", "boutonPlayPause", 5000);

//ville
const marseille = new Ville("Marseille", 43.3027, 5.3817, 13, "map", "infoMap", "blocSignature");

//canvas signature
const canvasSignature = new Canvas("signature");

//zone signature
const signature = new Signature(canvasSignature, "effacerCanvas", "retourCanvas", "validerCanvas", marseille, "blocReservation", "nom", "prenom");

window.addEventListener("load", function(){
	slideHero.init();
	marseille.init();
	canvasSignature.init();
	signature.init();
});