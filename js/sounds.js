const springSound = new createSound('src/sounds/feder.mp3')
const jumpSound = new createSound('src/sounds/jump.wav')
const jetSound = new createSound('src/sounds/jetpack2.mp3')
const lostSound = new createSound('src/sounds/pada.mp3')
const fireballSound = new createSound('src/sounds/fireball.mp3')
const heliSound = new createSound('src/sounds/propeller2.mp3')
const bootsSound = new createSound('src/sounds/springshoes.mp3')
const shootSound = new createSound('src/sounds/shoot.mp3')
const monsterSound = new createSound('src/sounds/monsterblizu.mp3')
const monsterDeadSound = new createSound('src/sounds/egg-crack.mp3')

function createSound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }