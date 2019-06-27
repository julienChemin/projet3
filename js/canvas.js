class Canvas{
	constructor(idCanvas, color = "#000"){
		this.canvas = document.getElementById(idCanvas);
		this.isMouseDown = false;
		this.isDrawing = false;
		this.color = color;
	}
	draw(x, y){
		if(!this.isDrawing){
			this.ctx.beginPath();
			this.ctx.moveTo(x, y);
			this.isDrawing = true;
		}else{
			this.ctx.lineTo(x, y);
			this.ctx.stroke();
		}
	}
	erase(){
		this.ctx.clearRect(0, 0, this.canvas.getAttribute("width"), this.canvas.getAttribute("height"));
	}
	init(){
		let mainThis = this;

		if(this.canvas.getContext){
			this.ctx = this.canvas.getContext("2d");
			

			this.canvas.addEventListener("mousedown", function(){
				mainThis.isMouseDown = true;
			});

			document.addEventListener("mouseup", function(){
				mainThis.isMouseDown = false;
				mainThis.isDrawing = false;
			});

			this.canvas.addEventListener("mousemove", function(e){
				if(mainThis.isMouseDown){
					let rect = e.target.getBoundingClientRect();
					mainThis.draw(e.clientX - rect.left, e.clientY - rect.top);
				}
			});

			//appareil tactil
			this.canvas.addEventListener("touchstart", function(e){
				e.preventDefault();
				mainThis.isMouseDown = true;
			});

			document.addEventListener("touchend", function(){
				mainThis.isMouseDown = false;
				mainThis.isDrawing = false;
			});

			this.canvas.addEventListener("touchmove", function(e){
				if(mainThis.isMouseDown){
					let rect = e.target.getBoundingClientRect();
					let touches = e.changedTouches;
					for(let touche of touches){
						mainThis.draw(touche.clientX - rect.left, touche.clientY - rect.top);
					}
				}
			});

		}else{
			this.canvas.textContent = "Votre navigateur ne supporte pas l'application utilisé pour effectuer la signature en ligne."
		}

		// modifie la taille du canvas en fonction de la taille de l'ecran au chargement et lors du resize
		window.addEventListener("resize", function(){
			if(window.innerWidth < 600){
				mainThis.canvas.width = "230";
				mainThis.canvas.height = "200";
			}else if(window.innerWidth <= 768){
				mainThis.canvas.width = "400";
				mainThis.canvas.height = "250";
			}else if(window.innerWidth > 768){
				mainThis.canvas.width = "500";
				mainThis.canvas.height = "300";
			}
		});

		if(window.innerWidth < 600){
			mainThis.canvas.width = "230";
			mainThis.canvas.height = "200";
		}else if(window.innerWidth <= 768){
			mainThis.canvas.width = "400";
			mainThis.canvas.height = "250";
		}else if(window.innerWidth > 768){
			mainThis.canvas.width = "500";
			mainThis.canvas.height = "300";
		}
	}
}