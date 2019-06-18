class Canvas{
	constructor(idCanvas){
		this.canvas = document.getElementById(idCanvas);
		this.isMouseDown = false;
		this.isDrawing = false;
		this.color = "#000";
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
					//let offset = mainThis.getOffset(this, e);
					//mainThis.draw((e.pageX - offset[0]) - 3, (e.pageY - offset[1]) - 65); // les nombres 5 et 65 compensent un décalage que je n'arrive pas a expliquer
					let rect = e.target.getBoundingClientRect();
					console.log(rect, rect.left, rect.top);
					console.log(e.clientX - rect.left);
					mainThis.draw(e.clientX - rect.left, e.clientY - rect.top);
				}
			});
		}else{
			this.canvas.textContent = "Votre navigateur ne supporte pas l'application utilisé pour effectuer la signature en ligne."
		}
	}
	getOffset(elem, event){
		let offsetX = 0;
		let offsetY = 0;
		let el = elem;

		while(el !== document){
			offsetX += el.offsetLeft - el.scrollLeft;
			offsetY += el.offsetTop - el.scrollTop;
			el = el.parentNode;
		}
		return [offsetX, offsetY];
	}
}