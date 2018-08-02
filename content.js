//get random image
const images = document.querySelectorAll('img');
let randomImageIndex = 1; //Math.floor(images.length * Math.random());
const currentImg = images[randomImageIndex];

//get an image's coordinates
let rect = currentImg.getBoundingClientRect();
console.log(rect.top, rect.right, rect.bottom, rect.left);

currentImg.style.border = "solid 1px red";
currentImg.style.position = "absolute";
currentImg.style.zIndex = "10000";

let imgTop = rect.top;
let imgLeft = rect.left;
currentImg.style.top = imgTop + 'px';
currentImg.style.left = imgLeft + 'px';

/**************************************CHEESE MOVEMENT***********************************/
class Player {
   constructor(direction, enemyLeft, enemyTop) {
      this.player = document.createElement('img');
      this.playerTop = 0;
      this.playerLeft = 0;
      this.speed = 500;
      this.movement = 50;
      this.currentDirection = direction;
      this.enemyTop = enemyTop;
      this.enemyLeft = enemyLeft;
      this.timer = setTimeout(this.move.bind(this), this.speed);                       
      this.player.classList.add("cheese");
      this.player.setAttribute('src', 'http://www.stickpng.com/assets/images/580b57fbd9996e24bc43c0c9.png');
      this.player.style.top = this.playerTop + 'px';
      this.player.style.left = this.playerLeft + 'px';
      document.body.appendChild(this.player);
   }

   enemyFollowPlayer() {
      if (this.enemyLeft > this.playerLeft && this.enemyTop > this.playerTop) {
         this.enemyLeft -= this.movement;
         this.enemyTop -= this.movement;
      }
      else if (this.enemyLeft < this.playerLeft && this.enemyTop > this.playerTop) {
         this.enemyLeft += this.movement;
         this.enemyTop -= this.movement;                        
      
      }
      else if (this.enemyLeft > this.playerLeft && this.enemyTop < this.playerTop) {
         this.enemyLeft -= this.movement;
         this.enemyTop += this.movement;
         
      }
      else if (this.enemyLeft < this.playerLeft && this.enemyTop < this.playerTop) {
         this.enemyLeft += this.movement;
         this.enemyTop += this.movement;
         
      }
      else if (this.enemyLeft === this.playerLeft && this.enemyTop > this.playerTop) {
         this.enemyTop -= this.movement;
         
      }
      else if (this.enemyLeft > this.playerLeft && this.enemyTop === this.playerTop) {
         this.enemyLeft -= this.movement;
         
      }
      else if (this.enemyLeft === this.playerLeft && this.enemyTop < this.playerTop) {
         this.enemyTop += this.movement;
         
      }
      else if (this.enemyLeft < this.playerLeft && this.enemyTop === this.playerTop) {
         this.enemyLeft += this.movement;
         
      }

      currentImg.style.top = this.enemyTop + 'px';
      currentImg.style.left = this.enemyLeft + 'px';
   }

   move() {
      let direction = this.currentDirection;

      //shift head position
      if (direction === 'right' && this.playerLeft <= window.innerWidth - 125) this.playerLeft += 50;
      else if (direction === 'left' && this.playerLeft >= 0) this.playerLeft -= 50;
      else if (direction === 'up' && this.playerTop >= 0) this.playerTop -= 50;
      else if (direction === 'down'&& this.playerTop <= window.innerWidth - 125) this.playerTop += 50; 

      //update head position
      this.player.style.top = this.playerTop + 'px';
      this.player.style.left = this.playerLeft + 'px';
      //update enemy
      this.enemyFollowPlayer();

      setTimeout(this.move.bind(this), this.speed);
   }
}

const player = new Player('noMove', imgLeft, imgTop);

//document.body.addEventListener('keydown', ...)
const Keys = {
   up: false,
   down: false,
   left: false,
   right: false
};

window.onkeydown = function(e) {
   let kc = e.keyCode;
   e.preventDefault();

   if      (kc === 37) Keys.left = true;  // only one key per event
   else if (kc === 38) Keys.up = true;    // so check exclusively
   else if (kc === 39) Keys.right = true;
   else if (kc === 40) Keys.down = true;
   readKeys();
};

window.onkeyup = function(e) {
   let kc = e.keyCode;
   e.preventDefault();

   if      (kc === 37) Keys.left = false;
   else if (kc === 38) Keys.up = false;
   else if (kc === 39) Keys.right = false;
   else if (kc === 40) Keys.down = false;
   readKeys();
};

function readKeys() {
   if (Keys.left === true) {
      player.currentDirection = 'left';
   } else if (Keys.up === true) {
      player.currentDirection = 'up';
   } else if (Keys.right === true) {
      player.currentDirection = 'right';
   } else if (Keys.down === true) {
      player.currentDirection = 'down'        
   } else {
      player.currentDirection = 'noMove'
   }
}

/**************************************************************************************/

// function enemyFollowPlayer(this.enemyLeft, this.enemyTop, this.playerLeft, this.playerTop, this.movement) {
//     if (this.enemyLeft > this.playerLeft && this.enemyTop > this.playerTop) {
//         imgLeft -= this.movement;
//         imgTop -= this.movement;
//     }
//     if (this.enemyLeft < this.playerLeft && this.enemyTop > this.playerTop) {
//         imgLeft += this.movement;
//         imgTop -= this.movement;                        
        
//     }
//     if (this.enemyLeft > this.playerLeft && this.enemyTop < this.playerTop) {
//         imgLeft -= this.movement;
//         imgTop += this.movement;
        
//     }
//     if (this.enemyLeft < this.playerLeft && this.enemyTop < this.playerTop) {
//         imgLeft += this.movement;
//         imgTop += this.movement;
        
//     }
//     if (this.enemyLeft === this.playerLeft && this.enemyTop > this.playerTop) {
//         imgTop -= this.movement;
        
//     }
//     if (this.enemyLeft > this.playerLeft && this.enemyTop === this.playerTop) {
//         imgLeft -= this.movement;
        
//     }
//     if (this.enemyLeft === this.playerLeft && this.enemyTop < this.playerTop) {
//         imgTop += this.movement;
        
//     }
//     if (this.enemyLeft < this.playerLeft && this.enemyTop === this.playerTop) {
//         imgLeft += this.movement;
        
//     }

//     currentImg.style.top = imgTop + 'px';
//     currentImg.style.left = imgLeft + 'px';
// }
