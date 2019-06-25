class Slide{
	constructor(slides, blocBouton, boutonLeft, boutonRight, boutonPlayPause, vitesseSlider = 5000, canControlWithArrow = false){
		this.slides = document.querySelectorAll("." + slides);
		this.blocBouton = document.getElementById(blocBouton);
		this.boutonLeft = document.getElementById(boutonLeft);
		this.boutonRight = document.getElementById(boutonRight);
		this.boutonPlayPause = document.getElementById(boutonPlayPause);
		this.nbrSlide = this.slides.length;
		this.positionSlider = 1;
		this.vitesseSlider = vitesseSlider;
		this.sliderInterval = "";
		this.sliderAuto = true;
		this.canControlWithArrow = canControlWithArrow;
	}
	toLeft(){
		for(let slide of this.slides){

			let leftBefore=parseFloat(slide.style.left);

			if(this.positionSlider === 1){
				let leftAfter=leftBefore - ((this.nbrSlide - 1)*100);
				slide.style.left=leftAfter + "%";
			}else{
				let leftAfter=leftBefore + 100;
				slide.style.left=leftAfter + "%";
			}
		}
		if(this.positionSlider === 1){
			this.positionSlider=this.nbrSlide;
		}else{
			this.positionSlider-=1;
		}
		if(this.sliderAuto){
			clearInterval(this.sliderInterval);
			this.sliderInterval=setInterval(this.toRight.bind(this), this.vitesseSlider);
		}
	}
	toRight(){
		for(let slide of this.slides){

			let leftBefore=parseFloat(slide.style.left);

			if(this.positionSlider === this.nbrSlide){
				let leftAfter=leftBefore + ((this.nbrSlide - 1)*100);
				slide.style.left=leftAfter + "%";
			}
			else{
				let leftAfter=leftBefore - 100;
				slide.style.left=leftAfter + "%";
			}
		}
		if(this.positionSlider === this.nbrSlide){
			this.positionSlider=1;
		}else{
			this.positionSlider+=1;
		}
		if(this.sliderAuto){
			clearInterval(this.sliderInterval);
			this.sliderInterval=setInterval(this.toRight.bind(this), this.vitesseSlider);
		}	
	}
	init(){
		let mainThis=this;
		
		// changer de slide avec les bouton "gauche" et "droite" du slider
		this.boutonLeft.addEventListener("click", this.toLeft.bind(this));
		this.boutonRight.addEventListener("click", this.toRight.bind(this));

		// changer de slide avec les fleches du clavier
		if(this.canControlWithArrow){
			document.addEventListener("keyup", function(e){
				switch(e.keyCode){
					case 37: //gauche
						mainThis.toLeft();
						break;
					case 39: //droite
						mainThis.toRight();
						break;
					default:
						break;
				}
			});
		}

		// animation automatique du slider
		this.sliderInterval=setInterval(this.toRight.bind(this), this.vitesseSlider);

		// bouton play-pause du slider
		this.boutonPlayPause.addEventListener("click", function(){
			if(mainThis.sliderAuto){
				clearInterval(mainThis.sliderInterval);
				mainThis.sliderAuto=false;
				mainThis.boutonPlayPause.classList.remove("fa-pause");
				mainThis.boutonPlayPause.classList.add("fa-play");
			}else{
				mainThis.sliderInterval=setInterval(mainThis.toRight.bind(mainThis), mainThis.vitesseSlider);
				mainThis.sliderAuto=true;
				mainThis.boutonPlayPause.classList.remove("fa-play");
				mainThis.boutonPlayPause.classList.add("fa-pause");
			}
		});

		//positionne les boutons au centre
		let rectBouton = this.blocBouton.getBoundingClientRect();
		let rectSlide = this.slides[0].getBoundingClientRect();
		this.blocBouton.style.left = ((rectSlide.width / 2) - (rectBouton.width / 2)) + "px";
		//repositionne les boutons quand la taille de la fenetre est modifier
		window.addEventListener("resize", function(){
			let rectBouton = mainThis.blocBouton.getBoundingClientRect();
			let rectSlide = mainThis.slides[0].getBoundingClientRect();
			mainThis.blocBouton.style.left = ((rectSlide.width / 2) - (rectBouton.width / 2)) + "px";
		});
	}
}