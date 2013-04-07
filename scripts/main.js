/*
Object Engine
This is the game engine
*/
//Engine Constructor
function Engine(Canvas)
{
	this.mainCanvasElement = document.getElementById(Canvas);
	this.g = this.mainCanvasElement.getContext('2d');
	this.boundingBox = this.mainCanvasElement.getBoundingClientRect();
	
	this.nextFrame;

	this.g.font = '10pt Arial';
	this.g.fillStyle = 'blue';

	this.mouseX = 0;
	this.mouseY = 0;
	this.dragging = false;
	this.dragStartX = 0;
	this.dragStartY = 0;
	
	this.mainCanvasElement.onmousemove = function(e)
	{
		//inside this method 'this' refers to the canvas, not the instance of engine
		this.mouseX = e.clientX - this.boundingBox.left;
		this.mouseY = e.clientY - this.boundingBox.top;
	}.bind(this);
	
	this.mainCanvasElement.onmousedown = function(e)
	{
		this.dragging = true;
		this.dragStartX = this.mouseX;
		this.dragStartY = this.mouseY;
	}.bind(this);

	this.mainCanvasElement.onmouseup = function(e)
	{
		this.dragging = false;
	}.bind(this);

	this.mainCanvasElement.onmouseout = function(e)
	{
		this.dragging = false;
	}.bind(this);
}
//Engine prototype
Engine.prototype =
{
	constructor: Engine,

	drawDragBox: function()
	{
		this.g.beginPath();
		this.g.fillStyle = 'lightgreen';
		this.g.rect(this.dragStartX,this.dragStartY,(this.mouseX - this.dragStartX),(this.mouseY - this.dragStartY));
		this.g.fill();
	},
	drawCrosshair: function(x,y)
	{
		this.g.beginPath();
		this.g.strokeStyle = 'lightgrey';
		this.g.moveTo(0,y);
		this.g.lineTo(800,y);
		this.g.stroke();
		this.g.beginPath();
		this.g.moveTo(x,0);
		this.g.lineTo(x,800);
		this.g.stroke();
		
	},
	draw: function()
	{
		this.g.clearRect(0,0,800,600);
		if (this.dragging)
		{
			this.drawCrosshair(this.dragStartX,this.dragStartY);
			this.drawDragBox();
		}
		this.drawCrosshair(this.mouseX,this.mouseY);
		this.g.fillStyle = 'blue';
		this.g.fillText('Mouse x = '+this.mouseX, 5, 20);
		this.g.fillText('Mouse y = '+this.mouseY, 5, 40);
		if (this.dragging)
		{
			this.g.fillText('drag start x = '+this.dragStartX, 5, 60);
			this.g.fillText('drag start y = '+this.dragStartY, 5, 80);
		}
	}
	
	
	
}