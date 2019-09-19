// WINDOW ONLOAD
window.onload = function()
{
	gameStart();

	KeyListener();
}
	
	// CONSTANTS
	const CANVAS_WIDTH = 550;
	const CANVAS_HEIGHT = 700;
	const PLAYER_SPEED = 3;
	const CANVAS = document.getElementById("Window");
	const CTX = CANVAS.getContext("2d");
	
	// VARIABLES
	var keys = [];
	var bullets = [];
	var enemyBullets = [];
	var enemies = [];

	// GAME OBJECTS
	var game = new gameWindow(CANVAS,CANVAS_WIDTH,CANVAS_HEIGHT,CTX);
	var player = new playerObject(250,600,50,50,CTX,CANVAS,"image","img/ship.png");

	// GAME INTERVAL
	var interval = {
		initialize: function(){ setInterval(updateArea,10);},
		clear: function(){clearInterval(interval);}
	};

	// MAIN FUNCTIONS
	function gameStart()
	{
		game.initialize();

		// initializes player
		player.show();

		// creates the first round of enemies
		createEnemies(9,1);

		interval.initialize();
	}

	// GAME REFRESH - MAIN LOOP
	function updateArea()
	{
		game.clear();
		player.show();
		playerMovement();
		bulletMovement();
		enemieMovement();
		CollideListener();
		newRound();
		gameOver();
	}


	//	MOVEMENT
	function playerMovement()
	{
		player.speedX = 0;

		if(keys[37]){player.speedX = -PLAYER_SPEED;}
		if(keys[39]){player.speedX = PLAYER_SPEED;}

		player.move();

		if(keys[32])
		{
			let bullet = new bulletObject(player.x + 23.5, player.y,3,4,CTX);
			bullets.push(bullet);
			keys[32] = false;
		}
	}

	function enemieMovement()
	{
		for(let i = 0; i < enemies.length; i++)
		{
			enemies[i].show();
			enemies[i].move();
			enemies[i].shot();
		}
	}

	function bulletMovement()
	{
		if(bullets.length != 0)
		{
			for(let i = 0; i < bullets.length; i++)
			{
				// player bullets
				bullets[i].show();
				bullets[i].move();
			}	
		}

		if(enemyBullets.length != 0)
		{
			for(let i = 0; i < enemyBullets.length; i++)
			{
				// enemy bullets
				enemyBullets[i].show();
				enemyBullets[i].move();
			}	
		}
	}

	// ENEMIES
	function createEnemies(num1,num2)
	{
		for(let i = 0; i < num1; i++)
		{
			let enemy = new enemyObject(60+i*50,70,35,40,CTX,CANVAS,"image","img/enemie.gif",0.02,enemyBullets);
			enemies.push(enemy);

			for(let j = 0; j < num2; j++)
			{
				let enemy = new enemyObject(60+i*50,20,35,40,CTX,CANVAS,"image","img/enemie.gif",0.02,enemyBullets);
				enemies.push(enemy);
			}
		}
	}

	// ROUNDS & OTHERS
	function newRound()
	{
		if(enemies.length == 0)
		{
			createEnemies(9,1);
		}
	}

	function gameOver()
	{
		if(player.lifes == 0)
		{
			//clearInterval(interval);
			interval.clear();
			game.clear();
			message("GAME OVER",CTX);
		}
	}

	function message(string,context)
	{
		context.font = "30px Arial";
		context.fillStyle = "lightblue";
		context.textAlign = "center";
		context.fillText(string, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
	}

	// KEY LISTENER
	function KeyListener()
	{
		window.addEventListener('keydown', function(e){
			keys[e.keyCode] = true;
		})
		window.addEventListener('keyup', function(e){
			keys[e.keyCode] = false;
		})
	}

	// COLLISIONS
	function CollideListener()
	{
		// collisions player bullet / enemy
		for(let i = 0; i < bullets.length; i++)
		{
			for(let j = 0; j < enemies.length; j++)
			{
				if(bullets[i].hasCollideWithEnemy(bullets[i],enemies[j]))
				{
					enemies.splice(j,1);
					bullets.splice(i,1);
					break;
				}
			}

			// if bullet surpases the top of the canvas
			if(bullets[i] != null && bullets[i].y == 0)
			{
				bullets.splice(i,1);
			}	
		}

		// collisions enemy bullet / player
		for(let i = 0; i < enemyBullets.length; i++)
		{
			if(enemyBullets[i].hasCollideWithPlayer(enemyBullets[i],player))
			{
				player.lifes--;
				enemyBullets.splice(i,1);
			}

			// if bullet surpases the bottom of the canvas
			if(enemyBullets[i] != null && enemyBullets[i].y == 800)
			{
				enemyBullets.splice(i,1);
			}	
		}
	}
