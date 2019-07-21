
class playerObject extends shipObject 
{
	constructor(x,y,width,height,context,canvas,type,src)
	{
		super(x,y,width,height,context,canvas);
		this.type = type;
		this.src = src;
		this.speedX = 0;
		this.image = new Image();
		this.image.src = this.src;
		this.lifes = 3;
	}

	show()
	{
		this.context.drawImage(this.image,this.x,this.y,this.width,this.height);
	}
}