class Ville{
	constructor(nom, lat, lng, zoom, idMap, conteneurInfo, zoneSignature){
		this.nom = nom;
		this.stations = [];

		this.lat = lat;
		this.lng = lng;
		this.zoom = zoom;
		this.map = null;
		this.idMap = idMap;

		this.conteneurInfo = conteneurInfo;
		this.zoneSignature = zoneSignature;
	}
	init(){
		let mainThis = this;
		//init map
	    this.map = L.map(this.idMap).setView([this.lat, this.lng], this.zoom);
	    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', 
				    {
				        attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
				        minZoom: 1,
				        maxZoom: 20
				    }).addTo(this.map);

	    //recupere les infos stations et positionne les markers
		ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=" + this.nom + "&apiKey=c633b356069b6327b8f7ad355b4af60655380999", function(response){
			let reponse=JSON.parse(response);
			for(let elem of reponse){
				let marker = L.marker([elem.position.lat, elem.position.lng]).addTo(mainThis.map);
				let station = new Station(elem.name, elem.position.lat, elem.position.lng, elem.address, elem.status,
								  elem.available_bikes, elem.available_bike_stands);
				mainThis.stations.push(station);

				marker.addEventListener("click", function(e){
					let openOrClosed = document.querySelector("#" + mainThis.conteneurInfo + " > p:nth-of-type(2)");
					if(openOrClosed.textContent === "OPEN"){
						openOrClosed.classList.remove("open");
					}else if(openOrClosed.textContent === "CLOSED"){
						openOrClosed.classList.remove("closed");
					}
					openOrClosed.textContent = station.isOpen;
					if(openOrClosed.textContent === "OPEN"){
						openOrClosed.classList.add("open");
					}else {
						openOrClosed.classList.add("closed");
					}

					// nom
					document.querySelector("#" + mainThis.conteneurInfo + " > p:first-of-type").textContent = station.nom; 

					// adresse
					if(station.adresse !== ""){
						document.querySelector("#" + mainThis.conteneurInfo + " > p:nth-of-type(3)").textContent = "Adresse : " + station.adresse.toLowerCase();
					}else{
						document.querySelector("#" + mainThis.conteneurInfo + " > p:nth-of-type(3)").textContent = "Adresse non renseignée";
					}
					
					if(station.placeDispo === 0){ // nombre de place disponible
						document.querySelector("#" + mainThis.conteneurInfo + " > p:nth-of-type(4)").textContent = " Aucune place";
					}else if(station.placeDispo === 1){
						document.querySelector("#" + mainThis.conteneurInfo + " > p:nth-of-type(4)").textContent = station.placeDispo + " place";
					}else{
						document.querySelector("#" + mainThis.conteneurInfo + " > p:nth-of-type(4)").textContent = station.placeDispo + " places";
					}

					if(station.veloDispo === 0){ // nombre de velo disponible
						document.querySelector("#" + mainThis.conteneurInfo + " > p:nth-of-type(5)").textContent = " Aucun vélo disponible";
					}else if(station.veloDispo === 1){
						document.querySelector("#" + mainThis.conteneurInfo + " > p:nth-of-type(5)").textContent = station.veloDispo + " vélo disponible";
					}else{
						document.querySelector("#" + mainThis.conteneurInfo + " > p:nth-of-type(5)").textContent = station.veloDispo + " vélos disponibles";
					}
					

					//affiche le bouton "reserver" et le formulaire au clic du premier marker
					if(getComputedStyle(document.querySelector("#" + mainThis.conteneurInfo + " > p:last-of-type")).display === "none"){
						document.querySelector("#" + mainThis.conteneurInfo + " > p:last-of-type").style.display = "block";
						document.querySelector("#" + mainThis.conteneurInfo + " > form").style.display = "block";
					}
				});
			}
		});

		//configure le bouton de reservation
		document.querySelector("#" + this.conteneurInfo + " > p:last-of-type").addEventListener("click", function(){
			document.getElementById(mainThis.zoneSignature).style.display = "flex";
			document.getElementById(mainThis.zoneSignature).style.opacity = "1";
		});
	}
}