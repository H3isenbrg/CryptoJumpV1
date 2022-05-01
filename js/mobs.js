let fireballArray = []
let monsterArray = []

function random(min, max) {
    return min + Math.random() * (max - min);
}
  

function createMob(x, y, dx, dy, width, height) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.width = width
    this.height = height
    this.move = function () {

        let moveRight = () => {

           let start = Date.now()

           let initRight = () => {

               this.dx = 0.125
               
               let current = Date.now()
               
               if(current - start < 2000) {
                   requestAnimationFrame(initRight)
               } else {
                   moveLeft()
               }
           
           }

           initRight()
       }

       let moveLeft = () => {

           let start = Date.now()

           let initLeft = () => {

               this.dx = -0.125

               let current = Date.now()

               if(current - start < 2000) {
                   requestAnimationFrame(initLeft)
               } else {
                   moveRight()
               }

           }

           initLeft()
   
       }

       moveRight()             

   }
}

let fireballs = {
    width: 75,
    height: 75,
    upcoming: false,
    spawn() {

        //Level 1 

        

        //Level 2
        fireballItem = new createMob(Math.random() * 449, random(-5000, -10000), 0, 0, 75, 75)
        fireballArray.push(fireballItem)


        //Level 3
        fireballItem = new createMob(Math.random() * 449, random(-10000, -15000), 0, 0, 75, 75)
        fireballArray.push(fireballItem) 

        fireballItem = new createMob(Math.random() * 449, random(-10000, -15000), 0, 0, 75, 75)
        fireballArray.push(fireballItem)

         //Level 4

         fireballItem = new createMob(Math.random() * 449, random(-10000, -15000), 0, 0, 75, 75)
         fireballArray.push(fireballItem) 
 
         fireballItem = new createMob(Math.random() * 449, random(-10000, -15000), 0, 0, 75, 75)
         fireballArray.push(fireballItem)

         fireballItem = new createMob(Math.random() * 449, random(-10000, -15000), 0, 0, 75, 75)
         fireballArray.push(fireballItem)

        
    },
    update(progress) {
        
    if (player.y < 300 && items.inUse == false) {
        
        fireballArray.map((value) => {
            value.y += progress * items.speed
        })
    } 
    
    for (i = 0; i < fireballArray.length; i++) {

        if (fireballArray[0].y >= -1000) {
            fireballs.upcoming = true
        } else if (fireballArray[0].y <= -1000) {
            fireballs.upcoming = false
        } 

        if (fireballArray[i].y >= -150 && items.inUse == false) {
            fireballArray[i].y += progress * 0.3
            }
        
        if (fireballArray[i].y >= -150 && fireballArray[i].y < 100 && items.inUse == false) {
            fireballSound.play();
        }
        
            
        if (fireballArray[i].y >= 1000) {
            fireballArray.splice(i, 1) 
            }
        
        if (player.y + player.height > fireballArray[i].y && player.y + player.height - 50 < fireballArray[i].y + fireballs.height &&
            player.x + player.width >= fireballArray[i].x && player.x - player.width <= fireballArray[i].x && items.inUse === false) {
              
            lostSound.play();
            alert('Game over - your score is')
            player.start()     

            }

    }

    },
    draw() {

        for (i = 0; i < fireballArray.length; i++) {
            // drawRect(fireballArray[i].x, fireballArray[i].y, fireballArray[i].width, fireballArray[i].height, fireballArray[i].color)
            ctx.drawImage(fireball, fireballArray[i].x - 59, fireballArray[i].y - 209, 150, 300)
        }

    }
}

let monsters = {
    width: 100,
    height: 100,
    upcoming: false,
    spawn() {
        
        //Level 1
        monsterItem = new createMob(Math.random() * 449, random(-5000, -10000), 0, 0, 100, 100)
        monsterArray.push(monsterItem)
        monsterItem.move()

        //Level 2
        monsterItem = new createMob(Math.random() * 449, random(-5000, -10000), 0, 0, 100, 100)
        monsterArray.push(monsterItem)
        monsterItem.move()

        monsterItem = new createMob(Math.random() * 449, random(-5000, -10000), 0, 0, 100, 100)
        monsterArray.push(monsterItem)
        monsterItem.move()

        monsterItem = new createMob(Math.random() * 449, random(-5000, -10000), 0, 0, 100, 100)
        monsterArray.push(monsterItem)
        monsterItem.move()

        //Level 3


    },
    update(progress) {

        if (player.y < 300 && items.inUse == false) {
        
            monsterArray.map((value) => {
                value.y += progress * items.speed
            })
        } 
        
        for (i = 0; i < monsterArray.length; i++) {
            
            monsterArray[i].x += progress * monsterArray[i].dx

            if (monsterArray[0].y >= -1000) {
                monsters.upcoming = true
            } else if (monsterArray[0].y <= -1000) {
                monsters.upcoming = false
            } 
            
            if (monsterArray[i].y >= -150 && monsterArray[i].y < canvas.height && items.inUse == false) {
                monsterSound.play();
            }
            
            //Deactivated sink below because it causes a bug with monsters.upcoming[0] function. Needs to be solved at a later point.

            
            if (player.y + player.height > monsterArray[i].y && player.y + player.height - 50 < monsterArray[i].y + monsters.height &&
                player.x + player.width >= monsterArray[i].x && player.x < monsterArray[i].x + monsters.width && items.inUse === false) {
                  
                lostSound.play();
                alert('Game over - your score is')
                player.start()

            }
                
            bulletsArray.map((value) => {
                if (value.y > monsterArray[i].y && value.y < monsterArray[i].y + monsters.height && value.x >= monsterArray[i].x && value.x <= monsterArray[i].x + monsters.width) {
       
                    monsterDeadSound.play()
                    monsterArray.splice(i, 1)
                     
                }
            
            })

            if (monsterArray[i].y >= 1000) {
                monsterArray.splice(i, 1) 
                }
            

        }

       
    },
    draw() {

        for (i = 0; i < monsterArray.length; i++) {
            // drawRect(monsterArray[i].x, monsterArray[i].y, monsterArray[i].width, monsterArray[i].height, monsterArray[i].color)
            ctx.drawImage(monster, monsterArray[i].x - 30, monsterArray[i].y - 40, 160, 160)
        }

    }
}