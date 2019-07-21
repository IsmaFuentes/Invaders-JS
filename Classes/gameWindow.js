
class gameWindow
{
	constructor(canvas, width, height, context)
	{
		this.canvas = canvas;
		this.width = width;
		this.height = height;
		this.context = context;
		this.round = 0;
	}	

	initialize()
	{
		this.canvas.width = this.width;
		this.canvas.height = this.height;
	}

	clear()
	{
		this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
	}
}

