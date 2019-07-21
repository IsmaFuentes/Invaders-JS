
class enemyObject extends shipObject 
{
	constructor(x,y,width,height,context,canvas,type,src,cadence,array)
	{
		super(x,y,width,height,context,canvas);
		this.type = type;
		this.src = src;
		this.speedX = 0;
		this.speedY = 1;
		this.image = new Image();
		this.image.src = this.src;
		this.initialSpeed = 1;
		this.leftBorder = this.x - 90;
		this.rightBorder = this.x + 15;
		this.bottomBorder = this.y + 70;
		this.cadence = cadence;
		this.array = array;
	}

	show()
	{
		this.context.drawImage(this.image,this.x,this.y,this.width,this.height);
	}

	move()
	{
		this.x += this.speedX;
		this.y += this.speedY;

		if(this.x <= this.leftBorder + this.width)
		{
			this.speedX = this.initialSpeed;
		}	
		else if(this.x >= this.rightBorder + this.width)
		{
			this.speedX = - this.initialSpeed;
		}
		else if(this.y >= this.bottomBorder)
		{
			this.speedY = 0;
			this.y -= 5;
			this.speedX = - this.initialSpeed;
		}
	}

	shot()
	{
		var probability = Math.floor(Math.random() * 2000);

		if(probability / 100 < this.cadence)
		{
			var bullet = new enemyBulletObject(this.x+15,this.y+15,3,4,ctx);
			this.array.push(bullet);
		}
	}
}