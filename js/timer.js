class Timer{
	constructor(secondes, minutes){
		this.secondes = secondes;
		this.minutes = minutes;
		this.interval = "";
		this.isOff = true;
	}
	timerIsFinish(){
		if(this.secondes.textContent === "0" && this.minutes.textContent === "0"){
			return true;
		}else{
			return false;
		}
	}
	timerOff(){
		clearInterval(this.interval);
		this.isOff = true;
	}
	timerOn(secondes, minutes){
		let mainThis = this;
		this.isOff = false;

		this.interval = setInterval(function(){
			if(Number(mainThis.secondes.textContent) > 0){	//ont enleve une seconde
				mainThis.secondes.textContent = Number(mainThis.secondes.textContent) - 1;
			}else{	// si les seconde sont a zero
				if(mainThis.timerIsFinish()){		//ont test si le timer est fini
					mainThis.timerOff();	//si oui, ont stop le timer
				}else{			
					if(Number(mainThis.minutes.textContent) > 0){	//sinon, on enleve une minute
						mainThis.secondes.textContent = "59";
						mainThis.minutes.textContent = Number(mainThis.minutes.textContent) - 1;
					}
				}
			}
		}, 1000);
	}
}