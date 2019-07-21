
class bulletObject 
{
	constructor(x,y,width,height,ctx)
	{
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.ctx = ctx;
	}

	show()
	{
		this.ctx.fillStyle = "lightblue";
		this.ctx.fillRect(this.x,this.y,this.width,this.height);
	}

	move()
	{
		this.y -= 5;
		this.show();
	}

	hasCollideWithEnemy(bullet,object)
	{
		if(bullet.y < object.y + object.height && bullet.x < object.x + object.width && bullet.x > object.x)
		{
			return true;
		}
	}

	hasCollideWithPlayer(bullet,object)// REVISAR
	{
		if(bullet.y == object.y + object.height-30 && bullet.x < object.x + object.width && bullet.x > object.x)
		{
			return true;
		}
	}
}