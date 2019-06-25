class Signature{
	constructor(objetCanvas, btnEffacer, btnRetour, btnValider, objetVille, zoneReservation, nomSignataire, prenomSignataire){
		this.canvas = objetCanvas;

		this.btnEffacer = document.getElementById(btnEffacer);
		this.btnRetour = document.getElementById(btnRetour);
		this.btnValider = document.getElementById(btnValider);

		this.infoMap = objetVille.conteneurInfo;
		this.zoneSignature = document.getElementById(objetVille.zoneSignature);
		this.zoneReservation = zoneReservation;

		this.nomSignataire = document.getElementById(nomSignataire);
		this.prenomSignataire = document.getElementById(prenomSignataire);
	}
	init(){
		let mainThis = this;

		this.btnEffacer.addEventListener("click", function(){
			mainThis.canvas.erase();
		});

		this.btnRetour.addEventListener("click", function(){
			//cache la zone signature
			mainThis.zoneSignature.style.opacity = "0";
			setTimeout(function(){
				mainThis.zoneSignature.style.display = "none";
			}, 300);
		});

		this.btnValider.addEventListener("click", function(){
			let nomStationReserver = document.querySelector("#" + mainThis.infoMap + " p:nth-of-type(1)").textContent;
			let secondes = document.querySelector("#" + mainThis.zoneReservation  + "> p:last-child > span:nth-of-type(2)");
			let minutes = document.querySelector("#" + mainThis.zoneReservation  + "> p:last-child > span:nth-of-type(1)");
			localStorage.setItem("nomSignataire", mainThis.nomSignataire.value);
			localStorage.setItem("prenomSignataire", mainThis.prenomSignataire.value);
			localStorage.setItem("reservation", true);
			
			//cache la zone signature
			mainThis.zoneSignature.style.opacity = "0";
			setTimeout(function(){
				mainThis.zoneSignature.style.display = "none";
			}, 300);

			//affiche la zone reservation
			document.getElementById(mainThis.zoneReservation).style.display = "block";

			//complete les infos de la zone reservation
			
			document.querySelector("#" + mainThis.zoneReservation  + " span:first-of-type").textContent = nomStationReserver;

			document.querySelector("#" + mainThis.zoneReservation  + " span:nth-of-type(2)").textContent = mainThis.nomSignataire.value;
			document.querySelector("#" + mainThis.zoneReservation  + " span:nth-of-type(3)").textContent = mainThis.prenomSignataire.value;
			document.querySelector("#" + mainThis.zoneReservation  + " > p:last-child > span:nth-of-type(2)").textContent = 0;//secondes
			document.querySelector("#" + mainThis.zoneReservation  + " > p:last-child > span:nth-of-type(1)").textContent = 20;//minutes

			//declenche le timer
			if(localStorage.getItem("reservationEnCours")){
				mainThis.timer.timerOff();
				mainThis.timer.timerOn();
			}else{
				localStorage.setItem("reservationEnCours", true);
				mainThis.timer = new Timer(secondes, minutes);
				mainThis.timer.timerOn();
				mainThis.interval = setInterval(function(){
					if(mainThis.timer.isOff){
						document.getElementById(mainThis.zoneReservation).style.display = "none";
						clearInterval(mainThis.interval);
						localStorage.setItem("reservationEnCours", false);
					}
				}, 1000);
			}
		});

		//au chargement de la page, s'il y a deja une reservation
		if(localStorage.getItem("reservation")){

			//préremplit nom et prenom dans le formulaire
			mainThis.nomSignataire.value = localStorage.getItem("nomSignataire");
			mainThis.prenomSignataire.value = localStorage.getItem("prenomSignataire");
		}

		// la variable reservationEnCours permet d'eviter les doublon de timer
		window.addEventListener("beforeunload", function(){
			localStorage.removeItem("reservationEnCours");
		});
	}
}