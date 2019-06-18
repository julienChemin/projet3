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
			localStorage.setItem("stationReserver", nomStationReserver);
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
			document.querySelector("#" + mainThis.zoneReservation  + " > p:last-child > span:nth-of-type(1)").textContent = 1;

			//declenche le timer
			mainThis.timer = new Timer(this, secondes, minutes);
			mainThis.timer.timerOn();
			mainThis.interval = setInterval(function(){
				if(mainThis.timer.isOff){
					localStorage.clear();
					document.getElementById(mainThis.zoneReservation).style.display = "none";
					clearInterval(mainThis.interval);
				}
			}, 1000);
		});

		//au chargement de la page, s'il y a deja une reservation
		if(localStorage.getItem("reservation")){
			let date = new Date;
			if(date.getDay() === localStorage.getItem("jour")){// si ont est le meme jour que celui de la reservation

			}
			//affiche la zone reservation
			document.getElementById(mainThis.zoneReservation).style.display = "block";

			//complete les infos de la zone reservation
			document.querySelector("#" + mainThis.zoneReservation  + " span:first-of-type").textContent = localStorage.getItem("stationReserver");
			document.querySelector("#" + mainThis.zoneReservation  + " span:nth-of-type(2)").textContent = localStorage.getItem("nomSignataire");
			document.querySelector("#" + mainThis.zoneReservation  + " span:nth-of-type(3)").textContent = localStorage.getItem("prenomSignataire");

			//
		}

		//avant la fermeture de la page
		window.addEventListener("beforeunload", function(){
			if(localStorage.getItem("reservation")){ 				// s'il y a une reservation
				let date = new Date;								// recupere minutes et secondes de la fermeture
				localStorage.setItem("secondes", date.getSeconds());// pour mettre a jour la reservation lors de la prochaine visite
				localStorage.setItem("minutes", date.getMinutes());
				localStorage.setItem("jour", date.getDay());
			}
		})
	}
}