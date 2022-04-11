const canvas = document.createElement('canvas');
canvas.classList.add('canvas')
const ctx = canvas.getContext('2d', { alpha: false });
document.body.insertBefore(canvas, document.body.childNodes[0]);
canvas.width = 500;
canvas.height = 700; 
let scoreTracker = 0
ctx.font = '50px arial'

const img = document.getElementById('doodle')
const jetpack = document.getElementById('jetpack')
const platform = document.getElementById('platform')
const background = document.getElementById('background')
const fireball = document.getElementById('fireball')
const springcoil = document.getElementById('springcoil')
const heli = document.getElementById('heli')
const boots = document.getElementById('boots')
const gunBarrel = document.getElementById('gun')
const monster = document.getElementById('monster')

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

let obstacleArray = []
let obstacleMovingArray = []
let fireballArray = []
let monsterArray = []

let itemObstaclesBoosterpadArray = []
let itemObstaclesJetpackArray = []
let itemObstaclesHeliArray = []
let itemObstaclesBootsArray = []

let boosterpadArray = []
let jetpackArray = []
let heliArray = []
let bootsArray = []

let bulletsArray = []

// let y = Math.floor(Math.random() * 6)
let y = [1, 3, 5]

function random(min, max) {
    return min + Math.random() * (max - min);
  }
  
const keyboard = (() => {
    document.body.addEventListener('keydown', keyHandler);
    document.body.addEventListener('keyup', keyHandler);
    
    const keyboardState = {
        right: false,
        left: false,
        leftGun: false,
        rightGun: false,
        shoot: false,
        any: false,
       
    };

    function keyHandler(e) {
        const state = (e.type === 'keydown')
        if (e.keyCode == 39) {
            keyboardState.right = state;
        } else if (e.keyCode == 37) {
            keyboardState.left = state;
        } else if (e.keyCode == 65) {
            keyboardState.leftGun = state;
        } else if (e.keyCode == 68) {
            keyboardState.rightGun = state;
        } else if (e.keyCode == 32) {
            keyboardState.shoot = state;
        }


        if(state) { keyboardState.any = true }
        e.preventDefault();
    }
    return keyboardState;
    })();

const player = {
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,
    width: 50,
    height: 70,

    // color: '#dd1111', // disable this so that items dont have color on it
    onGround: false,
    jumpPower: -7,
    moveSpeed: 3,
    onJump: false,
    usingItem: false,
    usingJetpack: false,
    usingHeli: false,
    usingBoots: false,
    start() {
        this.x = ctx.canvas.width / 2 - this.width / 2;
        this.y = 630 // remember to update this one with world ground variable
        // this.onGround = true;
        this.dx = 0;
        this.dy = 0;    
    },
    update() {

        if (player.y + player.height >= 450) {
            player.jumpPower = -8.5
        } else {
            player.jumpPower = -7
        } 

        if (player.x < - (player.width / 2) && player.dx < 0) {
            player.x = canvas.width + (player.width / 2)
        }

        if (player.x + player.width  > canvas.width + (player.width / 2) && player.dx > 0) {
            player.x = - (player.width / 2)
        }

        if (keyboard.left) {this.dx = -this.moveSpeed}
        if (keyboard.right) {this.dx = this.moveSpeed}

        if (this.y + this.height >= world.worldGround) {
            this.onGround = true
        } else {
            this.onGround = false
        }

        if (this.onGround) {this.dy = this.jumpPower}
        
        this.dy += world.gravity;
        this.dy *= world.drag
        this.y += this.dy
        
        this.dx *= world.groundDrag
        this.x += this.dx;

    },
    
    draw() {
        drawRect(this.x, this.y, this.width, this.height, this.color);
        
    },
    scoreTrack() {
        if (this.y < 300) {
            scoreTracker += 1
        } if (this.usingHeli === true) {
            scoreTracker += 1
        } 
        if (this.usingJetpack === true) {
            scoreTracker += 4
        } 
        
    }, 
    endGame() {
        if (this.y + player.height >= 700) {
            lostSound.play();
            alert('Game over - your score is ' + scoreTracker)
            scoreTracker = 0
            player.start()
            obstacleArray.splice(0, obstacleArray.length)
            obstacles.drawStart()       
        }
    }
}

const gun = {
    x: 0,
    y: 0,
    x2: 0,
    y2: 0,
    width: 10,
    height: 50,
    angle: -1.55,
    color: '#fc0303',
    isShooting: false,
    
    update() {
   
        this.x = player.x + player.width / 2
        this.y = player.y - player.height + this.height + 12.5

        this.x2 = this.x
        this.y2 = this.y + 5

        ctx.save();

        if (keyboard.leftGun && this.angle >= -2.5) {this.angle -= 0.02}


        if (keyboard.rightGun && this.angle <= -0.55) {this.angle += 0.02}

        if (keyboard.shoot === true && this.isShooting === false) {
            this.isShooting = true;
            shootSound.play();
            bulletsArray.push(
                new bulletConstructor(this.angle, this.x2, this.y2)
            )
            setTimeout(() => {
                this.isShooting = false;
            }, 400);
        }


        ctx.translate((this.x2), (this.y2));
        ctx.rotate(this.angle); 
        ctx.translate(-(this.x2), -(this.y2));
       
    },
    draw() {
        
        // drawRect(this.x, this.y, this.width, this.height, this.color)
        ctx.drawImage(gunBarrel, this.x, this.y, 40, 10)
    }

}

function bulletConstructor(angle, x, y) {
    this.radius = 5;
    this.angle = angle;
    this.x = x;
    this.y = y;
    this.dx = Math.cos(angle) * 20;
    this.dy = Math.sin(angle) * 20;

    this.move = function() {
        this.x += this.dx;
        this.y += this.dy; 
    }

    this.draw = function() {
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

const world = {
    gravity: 0.1,
    drag: 0.98,
    groundDrag: 0.9,
    worldGround: 700,
}

const obstacles = {
    x: 200,
    y: 200,
    width: 50,
    height: 15,
    obstacleItemSpeed: 40,
    obstacleMoveState: false, 
    // color: '#600000',
    drawStart() {
        obstacleAmount = new createObstacle(225, 650, 50, 15)
        obstacleArray.push(obstacleAmount)
        obstacleAmount = new createObstacle(300, 550, 50, 15)
        obstacleArray.push(obstacleAmount)
        obstacleAmount = new createObstacle(150, 450, 50, 15)
        obstacleArray.push(obstacleAmount)
        obstacleAmount = new createObstacle(250, 350, 50, 15)
        obstacleArray.push(obstacleAmount)
        obstacleAmount = new createObstacle(100, 250, 50, 15)
        obstacleArray.push(obstacleAmount)
        obstacleAmount = new createObstacle(300, 100, 50, 15)
        obstacleArray.push(obstacleAmount)

        obstacleAmount = new createObstacle(50, 600, 50, 15)
        obstacleArray.push(obstacleAmount)
        obstacleAmount = new createObstacle(380, 200, 50, 15)
        obstacleArray.push(obstacleAmount)
        obstacleAmount = new createObstacle(100, 300, 50, 15)
        obstacleArray.push(obstacleAmount)
        obstacleAmount = new createObstacle(300, 170, 50, 15)
        obstacleArray.push(obstacleAmount)
        obstacleAmount = new createObstacle(20, 100, 50, 15)
        obstacleArray.push(obstacleAmount)
        obstacleAmount = new createObstacle(300, 300, 50, 15)
        obstacleArray.push(obstacleAmount)
        


    },

    drawStage1() {       
    
        for (i = 0; i < obstacleArray.length; i++) {
        drawRect(obstacleArray[i].x, obstacleArray[i].y, obstacleArray[i].width, obstacleArray[i].height, obstacleArray[i].color)

            if (obstacleArray[i].y >= 800) {
            obstacleArray.splice(i, 1) 
            }
            

        ctx.drawImage(platform, obstacleArray[i].x-5.5, obstacleArray[i].y-2, 60, 20)

        }

        if (obstacleArray[obstacleArray.length - 1].y >= 135) {
        
            obstacleAmount = new createObstacle(Math.random() * 449, Math.random() * -1000, 50, 15)

            obstacleArray.push(obstacleAmount)
            
            obstacleAmount = new createObstacle(Math.random() * 449, Math.random() * -1000, 50, 15)

            obstacleArray.push(obstacleAmount)

            obstacleAmount = new createObstacle(Math.random() * 449, Math.random() * -1000, 50, 15)

            obstacleArray.push(obstacleAmount)

            obstacleAmountSpecial = new createObstacle(Math.random() * 449, -10, 50, 15)

            obstacleArray.push(obstacleAmountSpecial)

            if (Math.random() * 10 <= 2 && itemObstaclesBoosterpadArray.length === 0 && itemObstaclesJetpackArray.length === 0 && itemObstaclesHeliArray.length === 0 && itemObstaclesBootsArray.length === 0 &&
             player.usingItem === false) {
                itemObstaclesBoosterpadArray.push(obstacleAmountSpecial)
                
            }

            for (i = 0; i < itemObstaclesBoosterpadArray.length; i++) {
                if (itemObstaclesBoosterpadArray[i].y >= 700) {
                    itemObstaclesBoosterpadArray.splice(i, 1) 
                    }
            }

            if (Math.random() * 10 <= 0.2 && itemObstaclesBoosterpadArray.length === 0 && itemObstaclesJetpackArray.length === 0 && itemObstaclesHeliArray.length === 0 && itemObstaclesBootsArray.length === 0 &&
             player.usingItem === false) {
                itemObstaclesHeliArray.push(obstacleAmountSpecial)
                
            }

            for (i = 0; i < itemObstaclesHeliArray.length; i++) {
                if (itemObstaclesHeliArray[i].y >= 700) {
                    itemObstaclesHeliArray.splice(i, 1) 
                    }
            }

            if (Math.random() * 10 <= 0.05 && itemObstaclesBoosterpadArray.length === 0 && itemObstaclesJetpackArray.length === 0 && itemObstaclesHeliArray.length === 0 && itemObstaclesBootsArray.length === 0 && 
            player.usingItem === false) {
                itemObstaclesJetpackArray.push(obstacleAmountSpecial)
                
            }

            for (i = 0; i < itemObstaclesJetpackArray.length; i++) {
                if (itemObstaclesJetpackArray[i].y >= 700) {
                    itemObstaclesJetpackArray.splice(i, 1) 
                    }
            }

            if (Math.random() * 10 <= 0.2 && itemObstaclesBoosterpadArray.length === 0 && itemObstaclesJetpackArray.length === 0 && itemObstaclesHeliArray.length === 0 && itemObstaclesBootsArray.length === 0 &&
            player.usingItem === false) {
                itemObstaclesBootsArray.push(obstacleAmountSpecial)
                
            }

            for (i = 0; i < itemObstaclesBootsArray.length; i++) {
                if (itemObstaclesBootsArray[i].y >= 700) {
                    itemObstaclesBootsArray.splice(i, 1) 
                    }
            }

        }

    },

    drawStage2() {

        for (i = 0; i < obstacleArray.length; i++) {
            drawRect(obstacleArray[i].x, obstacleArray[i].y, obstacleArray[i].width, obstacleArray[i].height, obstacleArray[i].color)
    
                if (obstacleArray[i].y >= 800) {
                obstacleArray.splice(i, 1) 
                }
                
    
            ctx.drawImage(platform, obstacleArray[i].x-5.5, obstacleArray[i].y-2, 60, 20)
    
            }
    
            if (obstacleArray[obstacleArray.length - 1].y >= 135) {
            
                obstacleAmount = new createObstacle(Math.random() * 449, Math.random() * -1000, 50, 15)
    
                obstacleArray.push(obstacleAmount)
    
                obstacleAmount = new createObstacle(Math.random() * 449, Math.random() * -1000, 50, 15)
    
                obstacleArray.push(obstacleAmount)
    
                obstacleAmountSpecial = new createObstacle(Math.random() * 449, -10, 50, 15)
    
                obstacleArray.push(obstacleAmountSpecial)
    
                if (Math.random() * 10 <= 2 && itemObstaclesBoosterpadArray.length === 0 && itemObstaclesJetpackArray.length === 0 && itemObstaclesHeliArray.length === 0 && itemObstaclesBootsArray.length === 0 &&
                player.usingItem === false) {
                   itemObstaclesBoosterpadArray.push(obstacleAmountSpecial)
                   
               }
   
               for (i = 0; i < itemObstaclesBoosterpadArray.length; i++) {
                   if (itemObstaclesBoosterpadArray[i].y >= 700) {
                       itemObstaclesBoosterpadArray.splice(i, 1) 
                       }
               }
   
               if (Math.random() * 10 <= 0.2 && itemObstaclesBoosterpadArray.length === 0 && itemObstaclesJetpackArray.length === 0 && itemObstaclesHeliArray.length === 0 && itemObstaclesBootsArray.length === 0 &&
                player.usingItem === false) {
                   itemObstaclesHeliArray.push(obstacleAmountSpecial)
                   
               }
   
               for (i = 0; i < itemObstaclesHeliArray.length; i++) {
                   if (itemObstaclesHeliArray[i].y >= 700) {
                       itemObstaclesHeliArray.splice(i, 1) 
                       }
               }
   
               if (Math.random() * 10 <= 0.05 && itemObstaclesBoosterpadArray.length === 0 && itemObstaclesJetpackArray.length === 0 && itemObstaclesHeliArray.length === 0 && itemObstaclesBootsArray.length === 0 && 
               player.usingItem === false) {
                   itemObstaclesJetpackArray.push(obstacleAmountSpecial)
                   
               }
   
               for (i = 0; i < itemObstaclesJetpackArray.length; i++) {
                   if (itemObstaclesJetpackArray[i].y >= 700) {
                       itemObstaclesJetpackArray.splice(i, 1) 
                       }
               }
   
               if (Math.random() * 10 <= 0.2 && itemObstaclesBoosterpadArray.length === 0 && itemObstaclesJetpackArray.length === 0 && itemObstaclesHeliArray.length === 0 && itemObstaclesBootsArray.length === 0 &&
               player.usingItem === false) {
                   itemObstaclesBootsArray.push(obstacleAmountSpecial)
                   
               }
   
               for (i = 0; i < itemObstaclesBootsArray.length; i++) {
                   if (itemObstaclesBootsArray[i].y >= 700) {
                       itemObstaclesBootsArray.splice(i, 1) 
                       }
               }
    
            }
    
    },

    drawStage3() {

        for (i = 0; i < obstacleArray.length; i++) {
            drawRect(obstacleArray[i].x, obstacleArray[i].y, obstacleArray[i].width, obstacleArray[i].height, obstacleArray[i].color)
    
                if (obstacleArray[i].y >= 800) {
                obstacleArray.splice(i, 1) 
                }
                
    
            ctx.drawImage(platform, obstacleArray[i].x-5.5, obstacleArray[i].y-2, 60, 20)
    
            }
    
            if (obstacleArray[obstacleArray.length - 1].y >= 135) {
               
                obstacleAmount = new createObstacle(Math.random() * 449, Math.random() * -1000, 50, 15)
    
                obstacleArray.push(obstacleAmount)
    
                obstacleAmountSpecial = new createObstacle(Math.random() * 449, -10, 50, 15)
    
                obstacleArray.push(obstacleAmountSpecial)
    
                if (Math.random() * 10 <= 2 && itemObstaclesBoosterpadArray.length === 0 && itemObstaclesJetpackArray.length === 0 && itemObstaclesHeliArray.length === 0 && itemObstaclesBootsArray.length === 0 &&
                player.usingItem === false) {
                   itemObstaclesBoosterpadArray.push(obstacleAmountSpecial)
                   
               }
   
               for (i = 0; i < itemObstaclesBoosterpadArray.length; i++) {
                   if (itemObstaclesBoosterpadArray[i].y >= 700) {
                       itemObstaclesBoosterpadArray.splice(i, 1) 
                       }
               }
   
               if (Math.random() * 10 <= 0.2 && itemObstaclesBoosterpadArray.length === 0 && itemObstaclesJetpackArray.length === 0 && itemObstaclesHeliArray.length === 0 && itemObstaclesBootsArray.length === 0 &&
                player.usingItem === false) {
                   itemObstaclesHeliArray.push(obstacleAmountSpecial)
                   
               }
   
               for (i = 0; i < itemObstaclesHeliArray.length; i++) {
                   if (itemObstaclesHeliArray[i].y >= 700) {
                       itemObstaclesHeliArray.splice(i, 1) 
                       }
               }
   
               if (Math.random() * 10 <= 0.05 && itemObstaclesBoosterpadArray.length === 0 && itemObstaclesJetpackArray.length === 0 && itemObstaclesHeliArray.length === 0 && itemObstaclesBootsArray.length === 0 && 
               player.usingItem === false) {
                   itemObstaclesJetpackArray.push(obstacleAmountSpecial)
                   
               }
   
               for (i = 0; i < itemObstaclesJetpackArray.length; i++) {
                   if (itemObstaclesJetpackArray[i].y >= 700) {
                       itemObstaclesJetpackArray.splice(i, 1) 
                       }
               }
   
               if (Math.random() * 10 <= 0.2 && itemObstaclesBoosterpadArray.length === 0 && itemObstaclesJetpackArray.length === 0 && itemObstaclesHeliArray.length === 0 && itemObstaclesBootsArray.length === 0 &&
               player.usingItem === false) {
                   itemObstaclesBootsArray.push(obstacleAmountSpecial)
                   
               }
   
               for (i = 0; i < itemObstaclesBootsArray.length; i++) {
                   if (itemObstaclesBootsArray[i].y >= 700) {
                       itemObstaclesBootsArray.splice(i, 1) 
                       }
               }
    
            }
    
    },

    drawStage4() {

        for (i = 0; i < obstacleArray.length; i++) {
            drawRect(obstacleArray[i].x, obstacleArray[i].y, obstacleArray[i].width, obstacleArray[i].height, obstacleArray[i].color)
        
            if (obstacleArray[i].y >= 800) {
                obstacleArray.splice(i, 1) 
            }
        
            ctx.drawImage(platform, obstacleArray[i].x-5.5, obstacleArray[i].y-2, 60, 20) // disable for neutral color
        
            }
        
            if (obstacleArray[obstacleArray.length - 1].y >= 135) {
            
                obstacleAmountSpecial = new createObstacle(Math.random() * 449, -10, 50, 15) // parameters need to be updated here

            obstacleArray.push(obstacleAmountSpecial)


            if (Math.random() * 10 <= 1) {
                obstacleMovingArray.push(obstacleAmountSpecial)
            }

            for (i = 0; i < obstacleMovingArray.length; i++) {
                if (obstacleMovingArray[i].y >= 800) {
                    obstacleMovingArray.splice(i, 1) 
                    }
            }

            if (Math.random() * 10 <= 0.25 && itemObstaclesBoosterpadArray.length === 0 && itemObstaclesJetpackArray.length === 0 && player.usingItem === false) {
                itemObstaclesJetpackArray.push(obstacleAmountSpecial)
                
            }

            for (i = 0; i < itemObstaclesJetpackArray.length; i++) {
                if (itemObstaclesJetpackArray[i].y >= 700) {
                    itemObstaclesJetpackArray.splice(i, 1) 
                    }
            }

            

             
        }

        let speed = 1 

            move()
            function move() {
                speed *= 1

                obstacleMovingArray.map((value) => {
                    value.x += speed
                })

                // obstacleMovingArray[y[1]].x += speed 
                
                setTimeout(() => {
                    speed *= -1

                    obstacleMovingArray.map((value) => {
                        value.x += speed
                    })

                    // obstacleArray[y[1]].x += speed 
                    setTimeout(move, 0)
                }, 2000);
            }

    },
    boost() {
        
        for (i = 0; i < obstacleArray.length; i++) {
            

            if (player.y + player.height > obstacleArray[i].y + obstacleArray[i].height && 
                player.y + player.height - 5 < obstacleArray[i].y + obstacleArray[i].height &&
                player.x + player.width >= obstacleArray[i].x && player.x - player.width <= obstacleArray[i].x && player.dy > 1 && player.usingItem === false && player.usingBoots === false) {
                    
                    // obstacleArray.splice(i, 1) 
                    
                    player.dy = player.jumpPower;
                    player.y += player.dy;
                    jumpSound.play();

            } 

            if (player.y + player.height > obstacleArray[i].y + obstacleArray[i].height && 
                player.y + player.height - 5 < obstacleArray[i].y + obstacleArray[i].height &&
                player.x + player.width >= obstacleArray[i].x && player.x - player.width <= obstacleArray[i].x && player.dy > 3 && player.usingBoots === true) {

                    player.usingItem === true
                    player.dy = player.jumpPower * 1.5
                    player.y += player.dy;
                    bootsSound.play();

                    let bootsInterval = setInterval(() => {
                    
                        obstacleArray.map((value) => {
                            value.y += 5
                        })
    
                        jetpackArray.map((value) => {
                            value.y += 5
                        })

                        boosterpadArray.map((value) => {
                            value.y += 5
                        })

                        bootsArray.map((value) => {
                        value.y += 5
                        })

                        setTimeout(() => {
                            player.usingItem === false
                            clearInterval(bootsInterval)
                            
                         }, 1000) 


                        }, 20)

                }

        }
        
    },
    obstacleGravity() {
    
        if (player.y < 300) {

    
            obstacleArray.map((value) => {
                value.y += 2
            })
        }  

    }, 

    spawnStartFireball() {

        fireballItem = new createObstacle(Math.random() * 449, random(-10000, -80000), 75, 75)
        fireballArray.push(fireballItem)

        fireballItem = new createObstacle(Math.random() * 449, random(-10000, -80000), 75, 75)
        fireballArray.push(fireballItem)

        fireballItem = new createObstacle(Math.random() * 449, random(-10000, -80000), 75, 75)
        fireballArray.push(fireballItem)

        fireballItem = new createObstacle(Math.random() * 449, random(-10000, -80000), 75, 75)
        fireballArray.push(fireballItem)

        fireballItem = new createObstacle(Math.random() * 449, random(-10000, -80000), 75, 75)
        fireballArray.push(fireballItem)

        fireballItem = new createObstacle(Math.random() * 449, random(-10000, -80000), 75, 75)
        fireballArray.push(fireballItem)

        fireballItem = new createObstacle(Math.random() * 449, random(-10000, -80000), 75, 75)
        fireballArray.push(fireballItem)

        fireballItem = new createObstacle(Math.random() * 449, random(-10000, -80000), 75, 75)
        fireballArray.push(fireballItem)

        fireballItem = new createObstacle(Math.random() * 449, random(-10000, -80000), 75, 75)
        fireballArray.push(fireballItem)

        fireballItem = new createObstacle(Math.random() * 449, random(-10000, -80000), 75, 75)
        fireballArray.push(fireballItem)

        fireballItem = new createObstacle(Math.random() * 449, random(-10000, -80000), 75, 75)
        fireballArray.push(fireballItem)

        fireballItem = new createObstacle(Math.random() * 449, random(-10000, -80000), 75, 75)
        fireballArray.push(fireballItem)

        fireballItem = new createObstacle(Math.random() * 449, random(-10000, -80000), 75, 75)
        fireballArray.push(fireballItem)

        fireballItem = new createObstacle(Math.random() * 449, random(-10000, -80000), 75, 75)
        fireballArray.push(fireballItem)

        fireballItem = new createObstacle(Math.random() * 449, random(-10000, -80000), 75, 75)
        fireballArray.push(fireballItem)

        fireballItem = new createObstacle(Math.random() * 449, random(-10000, -80000), 75, 75)
        fireballArray.push(fireballItem)

    },

    spawnStartMonsters() {

        monsterItem = new createObstacle(Math.random() * 449, random(-2500, -80000), 100, 100)
        monsterArray.push(monsterItem)

        monsterItem = new createObstacle(Math.random() * 449, random(-2500, -80000), 100, 100)
        monsterArray.push(monsterItem)
        
        monsterItem = new createObstacle(Math.random() * 449, random(-2500, -80000), 100, 100)
        monsterArray.push(monsterItem)

        monsterItem = new createObstacle(Math.random() * 449, random(-2500, -80000), 100, 100)
        monsterArray.push(monsterItem)

        monsterItem = new createObstacle(Math.random() * 449, random(-2500, -80000), 100, 100)
        monsterArray.push(monsterItem)

        monsterItem = new createObstacle(Math.random() * 449, random(-2500, -80000), 100, 100)
        monsterArray.push(monsterItem)

        monsterItem = new createObstacle(Math.random() * 449, random(-2500, -80000), 100, 100)
        monsterArray.push(monsterItem)

        monsterItem = new createObstacle(Math.random() * 449, random(-2500, -80000), 100, 100)
        monsterArray.push(monsterItem)

        monsterItem = new createObstacle(Math.random() * 449, random(-2500, -80000), 100, 100)
        monsterArray.push(monsterItem)

        monsterItem = new createObstacle(Math.random() * 449, random(-2500, -80000), 100, 100)
        monsterArray.push(monsterItem)

        monsterItem = new createObstacle(Math.random() * 449, random(-2500, -80000), 100, 100)
        monsterArray.push(monsterItem)

        monsterItem = new createObstacle(Math.random() * 449, random(-2500, -80000), 100, 100)
        monsterArray.push(monsterItem)

        monsterItem = new createObstacle(Math.random() * 449, random(-2500, -80000), 100, 100)
        monsterArray.push(monsterItem)

        monsterItem = new createObstacle(Math.random() * 449, random(-2500, -80000), 100, 100)
        monsterArray.push(monsterItem)

        monsterItem = new createObstacle(Math.random() * 449, random(-2500, -80000), 100, 100)
        monsterArray.push(monsterItem)
    
    },

    spawnItems() {
        
        for (i = 0; i < itemObstaclesBoosterpadArray.length; i++) {

            boosterpad = new createObstacle(itemObstaclesBoosterpadArray[i].x + 10, itemObstaclesBoosterpadArray[i].y - 20, 30, 30)
            boosterpadArray.push(boosterpad)

        }

        for (i = 0; i < boosterpadArray.length; i++) {
            drawRect(boosterpadArray[i].x, boosterpadArray[i].y, boosterpadArray[i].width, boosterpadArray[i].height,)

            ctx.drawImage(springcoil, boosterpadArray[i].x, boosterpadArray[i].y, 30, 30)

            if (player.y + player.height > boosterpadArray[i].y + boosterpadArray[i].height && 
                player.y + player.height - 5 < boosterpadArray[i].y + boosterpadArray[i].height &&
                player.x + player.width >= boosterpadArray[i].x && player.x - player.width <= boosterpadArray[i].x && player.dy > 2 && player.usingItem === false) {
                    
                    player.dy = player.jumpPower * 1.5
                    player.y += player.dy;
                    springSound.play();
                    
                    let boosterInterval = setInterval(() => {

                        player.usingItem = true
                    
                        obstacleArray.map((value) => {
                            value.y += 10
                        })
    
                        jetpackArray.map((value) => {
                            value.y += 10
                        })

                        boosterpadArray.map((value) => {
                            value.y += 10
                        })

                        setTimeout(() => {

                            player.usingItem = false 
                            clearInterval(boosterInterval)
                            
                         }, 1000) 


                        }, 20)

            } 

            if (boosterpadArray[i].y >= 700) {
                boosterpadArray.splice(i, 1) 
            }

        }



         for (i = 0; i < itemObstaclesJetpackArray.length; i++) {

            jetpackItem = new createObstacle(itemObstaclesJetpackArray[i].x + 10, itemObstaclesJetpackArray[i].y - 20, 30, 30)
            jetpackArray.push(jetpackItem)

        }

        for (i = 0; i < jetpackArray.length; i++) {
            drawRect(jetpackArray[i].x, jetpackArray[i].y, jetpackArray[i].width, jetpackArray[i].height,)

            ctx.drawImage(jetpack, jetpackArray[i].x - 11, jetpackArray[i].y - 7, 52.5, 52.5)

            if (player.y + player.height > jetpackArray[i].y && player.y + player.height - 50 < jetpackArray[i].y + jetpackArray[i].height &&
                player.x + player.width >= jetpackArray[i].x && player.x - player.width <= jetpackArray[i].x && player.usingItem === false) {
                
                jetSound.play();

                let adjustPlayer = setInterval(() => {

                    if (player.y > 100) {

                        player.dy = -5
                        player.y += player.dy

                    }

                 }, 20)

                 setTimeout(() => {
                    clearInterval(adjustPlayer)
                 }, 3500) 

                 jetpackArray.splice(i, 1)   
                player.usingItem = true
                player.usingJetpack = true
                world.gravity = 0
                world.drag = 0

                let boost = setInterval(() => {

                    obstacleArray.map((value) => {
                        value.y += this.obstacleItemSpeed
                    })

                    jetpackArray.map((value) => {
                        value.y += this.obstacleItemSpeed
                    })

                    boosterpadArray.map((value) => {
                        value.y += this.obstacleItemSpeed
                    })

                    }, 20)
                    
                setTimeout(() => {

                    clearInterval(boost)

                    let boostMild = setInterval(() => {

                        obstacleArray.map((value) => {
                            
                        value.y += this.obstacleItemSpeed / 4
                    
                    })
    
                    jetpackArray.map((value) => {
                                
                            value.y += this.obstacleItemSpeed / 4
                    })
    
                    }, 20)

                    setTimeout(() => {
                    clearInterval(boostMild)

                        player.usingItem = false
                        player.usingJetpack = false
                        world.gravity = 0.1
                        world.drag = 0.98

                    },1000)

                    }, 2500)             
    
            } 

        }

        for (i = 0; i < itemObstaclesHeliArray.length; i++) {

            heliItem = new createObstacle(itemObstaclesHeliArray[i].x + 10, itemObstaclesHeliArray[i].y - 20, 30, 30)
            heliArray.push(heliItem)

        }

        for (i = 0; i < heliArray.length; i++) {

            drawRect(heliArray[i].x, heliArray[i].y, heliArray[i].width, heliArray[i].height,)

            ctx.drawImage(heli, heliArray[i].x - 5, heliArray[i].y - 7, 40, 40)

            if (player.y + player.height > heliArray[i].y && player.y + player.height - 50 < heliArray[i].y + heliArray[i].height &&
                player.x + player.width >= heliArray[i].x && player.x - player.width <= heliArray[i].x && player.usingItem === false) {
                
                heliSound.play();
                heliArray.splice(i, 1) 

                let adjustPlayer = setInterval(() => {

                    if (player.y > 100) {

                        player.dy = -2.5
                        player.y += player.dy

                    }

                 }, 20)

                 setTimeout(() => {
                    clearInterval(adjustPlayer)
                 }, 3500) 

                 
                player.usingItem = true
                player.usingHeli = true
                world.gravity = 0
                world.drag = 0

                let boost = setInterval(() => {

                    obstacleArray.map((value) => {
                        value.y += 10
                    })

                    jetpackArray.map((value) => {
                        value.y += 10
                    })

                    boosterpadArray.map((value) => {
                        value.y += 10
                    })

                    heliArray.map((value) => {
                        value.y += 10
                    })  
                    

                    }, 20)
                    
                setTimeout(() => {

                    clearInterval(boost)

                    let boostMild = setInterval(() => {

                        obstacleArray.map((value) => {
                            
                        value.y += 2.5
                    
                    })
    
                    jetpackArray.map((value) => {
                                
                            value.y += 2.5
                    })
    
                    }, 20)

                    setTimeout(() => {
                    clearInterval(boostMild)

                        player.usingItem = false
                        player.usingHeli = false
                        world.gravity = 0.1
                        world.drag = 0.98

                    },1000)

                    }, 2500)             
    
            } 

        }

        for (i = 0; i < itemObstaclesBootsArray.length; i++) {

            bootsItem = new createObstacle(itemObstaclesBootsArray[i].x + 10, itemObstaclesBootsArray[i].y - 20, 30, 30)
            bootsArray.push(bootsItem)

        }

        for (i = 0; i < bootsArray.length; i++) {

            drawRect(bootsArray[i].x, bootsArray[i].y, bootsArray[i].width, bootsArray[i].height,)

            ctx.drawImage(boots, bootsArray[i].x - 5, bootsArray[i].y - 7, 40, 40)

                if (player.y + player.height > bootsArray[i].y + bootsArray[i].height && 
                    player.y + player.height - 5 < bootsArray[i].y + bootsArray[i].height &&
                    player.x + player.width >= bootsArray[i].x && player.x - player.width <= bootsArray[i].x && player.dy > 2 && player.usingItem === false) {
                        
                        player.usingBoots = true
                        
                        setTimeout(() => {
                        
                        player.usingBoots = false
                        
                        }, 10000) 
    
                } 
    
                if (bootsArray[i].y >= 700) {
                    bootsArray.splice(i, 1) 
                }

        }

        if (player.y < 300) {

            jetpackArray.map((value) => {
                value.y += 2
            })

            fireballArray.map((value) => {
                value.y += 2

            })

            boosterpadArray.map((value) => {
                value.y += 2

            })

            heliArray.map((value) => {
                value.y += 2

            })

            bootsArray.map((value) => {
                value.y += 2

            })

            monsterArray.map((value) => {
                value.y += 2
            })

        }         

        for (i = 0; i < fireballArray.length; i++) {

            drawRect(fireballArray[i].x, fireballArray[i].y, fireballArray[i].width, fireballArray[i].height,)

            ctx.drawImage(fireball, fireballArray[i].x - 59 , fireballArray[i].y - 209, 150, 300)

            fireballArray.map((value) => {

                if (value.y >= -150) {
                    value.y += 0.1
                }

            })


            if (player.y + player.height > fireballArray[i].y && player.y + player.height - 50 < fireballArray[i].y + fireballArray[i].height &&
                player.x + player.width >= fireballArray[i].x && player.x - player.width <= fireballArray[i].x && player.usingItem === false) {
                
                    lostSound.play();
                    alert('Game over - your score is ' + scoreTracker)
                    scoreTracker = 0
                    player.start()
                    obstacleArray.splice(0, obstacleArray.length)
                    obstacles.drawStart()  


            }

            if (fireballArray[i].y >= 0 && fireballArray[i].y < 100) {
                fireballSound.play();
                }

            if (fireballArray[i].y >= 1000) {
                fireballArray.splice(i, 1) 
                }

        }
        
        for (i = 0; i < monsterArray.length; i++) {

            drawRect(monsterArray[i].x, monsterArray[i].y, monsterArray[i].width, monsterArray[i].height)

            ctx.drawImage(monster, monsterArray[i].x - 30, monsterArray[i].y - 40, 160, 160)

            if (player.y + player.height > monsterArray[i].y && player.y + player.height - 50 < monsterArray[i].y + monsterArray[i].height &&
                player.x + player.width >= monsterArray[i].x && player.x - player.width <= monsterArray[i].x && player.usingItem === false) {
                
                    lostSound.play();
                    alert('Game over - your score is ' + scoreTracker)
                    scoreTracker = 0
                    player.start()
                    obstacleArray.splice(0, obstacleArray.length)
                    obstacles.drawStart()  


            }

            if (monsterArray[i].y >= 0 && monsterArray[i].y < 700) {
                monsterSound.play();
            }

            if (monsterArray[i].y >= 1000) {
                monsterArray.splice(i, 1) 
            }

            bulletsArray.map((value) => {
                if (value.y <= monsterArray[i].y && value.y >= monsterArray[i].y - 100 && value.x >= monsterArray[i].x && value.x <= monsterArray[i].x + 100) {
                    
                    monsterDeadSound.play()
                    monsterArray.splice(i, 1)
                    
                }
                
            })
                
            }
            
    }, 

}

function createObstacle(x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    // this.color = '#515A5A' // enable for neutral color

}

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

function drawRect(x, y, width, height, color) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function mainLoop(time) {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillRect(0, 0, 500, 700)
    
    ctx.drawImage(background, 0, 0, 500, 700) // disable for neutral color
    ctx.fillStyle = 'rgba(0, 0, 200, 0)'
    player.update();
    player.draw();
    
    gun.update();
   
    gun.draw();
    ctx.restore();

    
    
    bulletsArray.forEach(bullet => {
        bullet.move();

        bullet.draw();
    })

    ctx.fillStyle = 'rgba(0, 0, 200, 0)'

    difficulty()

    function difficulty() {

        if (scoreTracker < 2500) {
            obstacles.drawStage1();
        }
        
        else if (scoreTracker >= 2500 && scoreTracker < 5000){
            obstacles.drawStage2();
        }

        else if (scoreTracker >= 5000 && scoreTracker < 10000){
            obstacles.drawStage3();
        }

        else if (scoreTracker >= 10000) {
            obstacles.drawStage4();
        }


    }

    obstacles.spawnItems();    

    obstacles.boost();
    obstacles.obstacleGravity();

    player.scoreTrack();
    ctx.drawImage(img, player.x-3, player.y, 80, 70);
    ctx.fillStyle = 'black'
    ctx.fillText('Score:' + scoreTracker, 50, 50, 100, 100);
    player.endGame();

    // requestAnimationFrame(mainLoop);
    
}

player.start();
obstacles.drawStart();
obstacles.spawnStartFireball();
obstacles.spawnStartMonsters();

mainLoop()

setInterval(mainLoop, 1000 / 120)


// Old code for moving obstacles that didnt work

 // let initialArray = JSON.parse(JSON.stringify(obstacleArray));
            
        //         let moveRight = () => {
                    
        //             for (i = 0; i < obstacleArray.length; i++) {
                        
        //                 for (i = 0; i < initialArray.length; i++) {
                            
        //                     if (obstacleArray[1].x < initialArray[1].x + 100) {
                                
        //                         obstacleArray[i].x += 1
                                
        //                     } else {
                                
        //                     }

        //                 }

        //             }

        //             // if (obstacleArray[i].x < initialArray[i].x + 100) {
        //             //     requestAnimationFrame(moveRight)
        //             // } else {
        //             //  moveLeft()
        //             // }

        //         }

        //         let moveLeft = () => {
                    
        //             obstacleArray[i].x -= 10
                    
        //             // if (obstacleArray[i].x > initialArray[i].x - 100) {
        //                     // requestAnimationFrame(moveLeft)
        //             // } else {
        //             //         moveRight()
        //             // }

        //         }

        //         moveRight()    