//get random image
const playerPicture = ['cheese.jpeg', 'Snow.jpg',];
let linksArray = [3, 22, 34, 0];
let cheating = ['https://www.codesmith.io/', "https://smile.amazon.com/", "https://www.youtube.com/", "https://www.piit28.com/library"]
let imageArr = [];
let links = document.getElementsByTagName("a");
let images = document.querySelectorAll('img');
function doOnLoad() {
    // for(let i = 0; i < links.length; i++) {
    //     linksArray.push(links[i].href);       
    // }
    for(let i = 0; i < images.length; i +=1) {
        if (images[i].width && images[i].width > 50 && images[i].width < 500 && images[i].x < 700 && images[i].y < 700 ){
        imageArr.push(images[i])
        }

    }
}
window.onload = doOnLoad();
let randomImageIndex = 1;// = Math.floor(Math.random() * imageArr.length);
let currentImg = imageArr[randomImageIndex];

//get an image's coordinates
let rect = currentImg.getBoundingClientRect();
//console.log(rect.width)
console.log(rect.top, rect.right, rect.bottom, rect.left);

//currentImg.style.border = "solid 1px red";
currentImg.style.position = "absolute";
currentImg.style.zIndex = "10000000";
let imgBot = rect.bot;
let imgTop = rect.top;
let imgLeft = rect.left;
currentImg.style.top = imgTop + 'px';
currentImg.style.left = imgLeft + 'px';

/**************************************CHEESE MOVEMENT***********************************/
class Player {
   constructor(direction, enemyLeft, enemyTop, enemyBot) {
      this.player = document.createElement('img');
      
      this.playerTop = 0;
      this.playerLeft = 0;
      this.width = this.player.style.width;
      this.height = this.player.style.height;
      this.enemyHealth = 3;

      this.swordElement = document.createElement('img'); 
      this.swordElement.classList.add("sword");
      this.swordElement.classList.add("hideSword");
      this.swordElement.setAttribute('src', chrome.extension.getURL("sword.png"));
      document.body.appendChild(this.swordElement);

      this.sword = false;
      
      this.speed = 500;
      this.movement = 10;
      this.currentDirection = direction;
      
      this.tracker = 0;
      this.playerHealth = 3;
      this.enemyBot = enemyBot;
      this.enemyTop = enemyTop;
      this.enemyLeft = enemyLeft;

      this.timer = setTimeout(this.move.bind(this), this.speed);   
      //http://www.stickpng.com/assets/images/580b57fbd9996e24bc43c0c9.png
      this.player.classList.add("cheese");
      this.player.setAttribute('src', chrome.extension.getURL('cheese.jpeg'));
      this.player.style.top = this.playerTop + 'px';
      this.player.style.left = this.playerLeft + 'px';
      document.body.appendChild(this.player);
   }
   enemyPlayerCollision() {
    if (this.enemyLeft < this.playerLeft + this.width  &&
        this.enemyLeft + currentImg.width > this.playerLeft &&
        this.enemyTop < this.playerTop + this.height &&
        currentImg.height + this.enemyTop > this.playerTop) {
            this.player.classList.add("tint");
            setTimeout(() => this.player.classList.remove("tint"), 250);
            this.playerHealth -= 1;
            //console.log(this.playerHealth);
        }
   }
   attackEnemySword() {
       if (this.enemyLeft < this.playerLeft + this.width + 120  &&
        this.enemyLeft + currentImg.width > this.playerLeft &&
        this.enemyTop < this.playerTop + this.height &&
        currentImg.height + this.enemyTop > this.playerTop && this.currentDirection === 'right'
        && Keys.sword === true && this.enemyLeft > this.playerLeft) {
            
          this.enemyHealth -= 1; 
          console.log(this.enemyHealth);       
          currentImg.classList.add("tint");
          setTimeout(() => currentImg.classList.remove("tint"), 250);  
        }
      else if (this.enemyLeft < this.playerLeft + this.width &&
        this.enemyLeft + currentImg.width + 200 > this.playerLeft &&
        this.enemyTop < this.playerTop + this.height &&
        currentImg.height + this.enemyTop > this.playerTop && this.currentDirection === 'left'
        && Keys.sword === true && this.enemyLeft < this.playerLeft) {
            this.enemyHealth -= 1; 
            console.log(this.enemyHealth);  
            currentImg.classList.add("tint");
            setTimeout(() => currentImg.classList.remove("tint"), 250);       
      }
      else if (this.enemyLeft < this.playerLeft + this.width  &&
            this.enemyLeft + currentImg.width > this.playerLeft &&
             this.enemyTop < this.playerTop - this.height &&
             currentImg.height + this.enemyTop + 250 > this.playerTop && this.currentDirection === 'up'
             && Keys.sword === true ) {
             this.enemyHealth -= 1; 
             console.log(this.enemyHealth); 
             currentImg.classList.add("tint");
             setTimeout(() => currentImg.classList.remove("tint"), 250);        
      }

      else if (this.enemyLeft < this.playerLeft + this.width &&
             this.enemyLeft + currentImg.width > this.playerLeft &&
             this.enemyTop < this.playerTop + this.height + 120 &&
             currentImg.height + this.enemyTop > this.playerTop && this.currentDirection === 'down'
             && Keys.sword === true && this.enemyTop > this.playerTop) {
               this.enemyHealth -= 1; 
               console.log(this.enemyHealth);   
               currentImg.classList.add("tint");
               setTimeout(() => currentImg.classList.remove("tint"), 250);    
      }
   }
 
   playerDeath() {
       if (this.playerHealth === 0) {
           //alert("You die!");
           //alert("Do you dare to try again?");
           //location.reload();
   }
}
enemyDeath() {
    if (this.enemyHealth === 0) {
      randomImageIndex = linksArray[this.tracker]
      window.location.href = cheating[this.tracker++];

      images = document.querySelectorAll('img');
      currentImg = images[randomImageIndex];

      //get an image's coordinates
      rect = currentImg.getBoundingClientRect();

      //currentImg.style.border = "solid 1px red";
      currentImg.style.position = "absolute";
      currentImg.style.zIndex = "10000000";
      this.enemyBot = rect.bot
      this.enemyTop = rect.top
      this.enemyLeft = rect.left
      currentImg.style.top = imgTop + 'px';
      currentImg.style.left = imgLeft + 'px';
      this.enemyHealth = 3;
    }
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

   moveSword() {
      if (this.sword && this.currentDirection !== 'noMove') {
         this.swordElement.classList.remove('hideSword');
         if (this.currentDirection === 'right') {
            this.swordElement.classList.remove('upSword');
            this.swordElement.classList.remove('downSword');
            this.swordElement.classList.remove('leftSword');
            this.swordElement.style.left = this.playerLeft + 100 + 'px';
            this.swordElement.style.top = this.playerTop + 30 + 'px';
         }
         else if (this.currentDirection === 'left') {
            this.swordElement.classList.remove('upSword');
            this.swordElement.classList.remove('downSword');
            this.swordElement.classList.add('leftSword');
            this.swordElement.style.left = this.playerLeft - 100 + 'px';
            this.swordElement.style.top = this.playerTop + 20 + 'px';
         }
         else if (this.currentDirection === 'up') {
            this.swordElement.classList.remove('leftSword');
            this.swordElement.classList.remove('downSword');
            this.swordElement.classList.add('upSword');
            this.swordElement.style.left = this.playerLeft + 'px';
            this.swordElement.style.top = this.playerTop - 70 + 'px';
         }
         else if (this.currentDirection === 'down') {
            this.swordElement.classList.remove('leftSword');
            this.swordElement.classList.remove('upSword');
            this.swordElement.classList.add('downSword');
            this.swordElement.style.left = this.playerLeft + 'px';
            this.swordElement.style.top = this.playerTop + 120 + 'px';
         }
      } else {
         this.swordElement.classList.add('hideSword');
         this.swordElement.style.left = -100 + 'px';
         this.swordElement.style.top = -100 + 'px';
      }
   }

   move() {
       
this.attackEnemySword();
      this.enemyPlayerCollision();
      this.playerDeath();
      this.enemyDeath();
      let direction = this.currentDirection;

      //shift head position
      if (direction === 'right' && this.playerLeft <= window.innerWidth - 125) this.playerLeft += 50;
      else if (direction === 'left' && this.playerLeft >= 0) this.playerLeft -= 50;
      else if (direction === 'up' && this.playerTop >= 0) this.playerTop -= 50;
      else if (direction === 'down'&& this.playerTop <= window.innerHeight - 125) this.playerTop += 50; 

      //update head position
      this.player.style.top = this.playerTop + 'px';
      this.player.style.left = this.playerLeft + 'px';
      //update sword
      this.moveSword();
      //update enemy
      this.enemyFollowPlayer();

      setTimeout(this.move.bind(this), this.speed);
   }
}

const player = new Player('noMove', imgLeft, imgTop, imgBot);

//document.body.addEventListener('keydown', ...)
const Keys = {
   up: false,
   down: false,
   left: false,
   right: false,
   sword: false
};

window.onkeydown = function(e) {
   let kc = e.keyCode;
   e.preventDefault();

   if      (kc === 37) Keys.left = true;  // only one key per event
   else if (kc === 38) Keys.up = true;    // so check exclusively
   else if (kc === 39) Keys.right = true;
   else if (kc === 40) Keys.down = true;
   else if (kc === 32) Keys.sword = true;
   else if (kc === 16) Keys.leave = true;
   readKeys();
};

window.onkeyup = function(e) {
   let kc = e.keyCode;
   e.preventDefault();

   if      (kc === 37) Keys.left = false;
   else if (kc === 38) Keys.up = false;
   else if (kc === 39) Keys.right = false;
   else if (kc === 40) Keys.down = false;
   else if (kc === 32) Keys.sword = false;
   else if (kc === 16) Keys.leave = false;
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
   player.sword = Keys.sword;
}
// function simulateClick(x, y) { 
//     if (Keys.leave === true){
    //        document.elementFromPoint(x, y).click();
    //}
    //

    
    
    
// }
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
