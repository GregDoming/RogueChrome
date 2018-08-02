//get random image
const images = document.querySelectorAll('img');
let randomImageIndex = Math.floor(images.length * Math.random());
const currentImg = images[randomImageIndex];

var rect = currentImg.getBoundingClientRect();
console.log(rect.top, rect.right, rect.bottom, rect.left);

//add person to screen
const man = document.createElement('img');
man.classList.add("cheese");
man.setAttribute('src', 'http://www.stickpng.com/assets/images/580b57fbd9996e24bc43c0c9.png');
document.body.appendChild(man);

document.addEventListener('keydown', function(e) {
   if (e.keyCode === 37) { //left
      //man.style.top = "100px";
   }
   else if (e.keyCode === 38) {  //up
      
   }
   else if (e.keyCode === 38) {  //right
      
   }
   else if (e.keyCode === 40) {  //down
      
   }
})

//currentImg.width // currentImg.height;
