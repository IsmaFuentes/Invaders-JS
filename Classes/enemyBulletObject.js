
class enemyBulletObject extends bulletObject 
{
	constructor(x,y,width,height,ctx)
	{
		super(x,y,width,height,ctx);
	}

	show()
	{
		this.ctx.fillStyle = "red";
		this.ctx.fillRect(this.x,this.y,this.width,this.height);
	}

	move()
	{
		this.y -= -2;
		this.show();
	}
}