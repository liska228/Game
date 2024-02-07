var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1200;
canvas.height = 694;
document.body.appendChild(canvas);

//завантажуємо фонове зображення
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
  //показати фонове зображення
  bgReady = true;
};
bgImage.src ="grass_background.png";

//завантажити зображення гравця
var playerReady = false;
var playerImage = new Image();
playerImage.onload = function () {
  //показати зображення гравця
  playerReady = true;
};
playerImage.src = "player.png";

//завантажити зображення злодія
var enemyReady = false;
var enemyImage = new Image();
enemyImage.onload = function () {
  //показати зображення злодія
  enemyReady = true;
};
enemyImage.src = "enemy.png";

//створюємо ігрови об'єкvar enemyReady = false;
var enemy2Ready=false;
var enemy2Image = new Image();
enemy2Image.onload = function () {
  //показати зображення злодія
  enemy2Ready = true;
};
enemyImage.src = "enemy2.png";

var player = {
  speed: 256 //швидкість руху гравця в пікселях за секунду
};
var enemy = {};
var enemiesCaught = 0;

var enemy2 = {};
var enemiesCaught = 0;

//керування клавіатурою
var keysDown = {};

//перевірити
addEventListener("keydown", function (event) {
  keysDown[event.key] = true;
}, false);

addEventListener("keyup", function (event) {
  delete keysDown[event.key];
}, false);

//скидання позиції гравця та ворога, коли гравець зловив ворога
var reset = function () {
  //змінюємо положення гравця в центр зображення
  player.x = canvas.width / 2;
  player.y = canvas.height / 2;

  //змінюємо положення ворога в рандомне місце на зображенні
  enemy.x = enemyImage.width + (Math.random() * (canvas.width - (enemyImage.width*2)));
  enemy.y = enemyImage.height + (Math.random() * (canvas.height - (enemyImage.height*2)));

  enemy2.x = enemy2Image.width + (Math.random() * (canvas.width - (enemy2Image.width*2)));
  enemy2.y = enemy2Image.height + (Math.random() * (canvas.height - (enemy2Image.height*2)));
};

//оновлюємо ігрови об'єкти, щоб змінити позицію гравця залежно від натиснутої клавіши
var update = function (modifier) {
  if ("ArrowUp" in keysDown || "w" in keysDown) { //гравець здвигається вгору
    player.y -= player.speed * modifier;
  }
  if ("ArrowDown" in keysDown || "s" in keysDown) { //гравець здвигається вниз
    player.y += player.speed * modifier;
  }
  if ("ArrowLeft" in keysDown || "a" in keysDown) { //гравець здвигається вліво
    player.x -= player.speed * modifier;
  }
  if ("ArrowRight" in keysDown || "d" in keysDown) { //гравець здвигається вправо
    player.x += player.speed * modifier;
  }

  //перевіримо чи гравець не стикається з ворогом
  if (
    player.x <= (enemy.x + enemyImage.width)
    && enemy.x <= (player.x + playerImage.width)
    && player.y <= (enemy.y + enemyImage.height)
    && enemy.y <= (player.y + playerImage.height)
  ) {
    ++enemiesCaught;
    reset();
  }
};

if (
  player.x <= (enemy2.x + enemy2Image.width)
  && enemy2.x <= (player.x + playerImage.width)
  && player.y <= (enemy2.y + enemy2Image.height)
  && enemy2.y <= (player.y + playerImage.height)
) {
  ++enemiesCaught;
  reset();
}

//малюємо все на зображенні
var render = function () {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }

  if (playerReady) {
    ctx.drawImage(playerImage, player.x, player.y);
  }

  if (enemyReady) {
    ctx.drawImage(enemyImage, enemy.x, enemy.y);
  }

  if (enemy2Ready) {
    ctx.drawImage(enemy2Image, enemy2.x, enemy2.y);
  }

  //відображаємо рахунок і час
  ctx.fillStyle = "rgb(250, 250, 250)";
  ctx.font = "24px Helvetica";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Лічильник ворогів: " + enemiesCaught, 20, 20);
  ctx.fillText("Час: " + count, 20, 50);
  //відображаємо закінчення гри коли час вийшов
  if(finished==true){
    ctx.fillText("Гра завершена!", 540, 337);
    

  }
  

  
};

var count = 30; //скільки триватиме гра
var finished = false;
var counter =function(){
  count=count-1; //відлік по 1 секунді
  //коли час закінчиться ховаємо ворога, гравця і лічильник
  	if (count <= 0)
  	{
  		//зупиняємо лічильник
     	clearInterval(counter);
     	//закінчуємо гру
     	finished = true;
     	count=0;
     	//ховаємо ворога і гравця
     	enemyReady=false;
      enemy2Ready=false;
     	playerReady=false;
  	}

}

//інтервал таймера кожну секунду
setInterval(counter, 1000);

//основна гра
var main = function () {
  //запустіть функцію оновлення
  update(0.02); //не змінюється
  //запустити функцію render
  render();
  //попросіть зробити це знову
  requestAnimationFrame(main);
};

var w = window;
reset();
main();