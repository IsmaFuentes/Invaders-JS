
class shipObject 
{
	constructor(x,y,width,height,context,canvas)
	{
		this.width = width;
		this.height = height;
		this.x = x;
		this.y = y;
		this.context = context;
		this.canvas = canvas;
	}

	clear()
	{
		this.context.clearRect(this.x, this.y, this.width, this.height);
	}

	move()
	{
		this.x += this.speedX;

		if(this.x <= 0) // left border
		{
			this.x = 0;
		}
		else if(this.x >= 500) // rigth border
		{
			this.x = 500;
		}
	}
}