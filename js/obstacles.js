let obstacleArray = []

function createObstacle(x, y, dx, dy, width, height) {
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
                
                if(current - start < 1500) {
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

                if(current - start < 1500) {
                    requestAnimationFrame(initLeft)
                } else {
                    moveRight()
                }

            }

            initLeft()
    
        }

        moveRight()             

    },
    this.moveVertical = function () {

        let moveRight = () => {

           let start = Date.now()

           let initRight = () => {

               this.dy = 0.125
               
               let current = Date.now()
               
               if(current - start < 1500) {
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

               this.dy = -0.125

               let current = Date.now()

               if(current - start < 1500) {
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

const obstacles = {
    x: 200,
    y: 200,
    dx: 0,
    dy: 0,
    width: 50,
    height: 15,
    speed: 0.42,
    obstacleMoveState: false, 
    color: '#600000',
    update(progress) {

        if (player.y < 300) {
            obstacleArray.map((value) => {
                value.y += progress * obstacles.speed
            })

            if (items.inUse === false) {
                
                scoreTracker.score += progress * obstacles.speed * scoreTracker.lowerNumber
                scoreTracker.scoreRounded = Math.ceil(scoreTracker.score)
        
            }

        }  

        for (i = 0; i < obstacleArray.length; i++) {
            
            obstacleArray[i].x += progress * obstacleArray[i].dx

            obstacleArray[i].y += progress * obstacleArray[i].dy

            if (obstacleArray[i].x < - obstacles.width && obstacleArray[i].dx < 0) {
                obstacleArray[i].x = canvas.width
            }
    
            if (obstacleArray[i].x + obstacles.width > canvas.width + obstacles.width && obstacleArray[i].dx > 0) {
                obstacleArray[i].x = - obstacles.width
            }

            if (obstacleArray[i].y >= canvas.height + 100) {
            obstacleArray.splice(i, 1) 
            }
            
        }


    },
    createStart() {    

        obstacleAmount = new createObstacle(225, 650, 0, 0, 50, 15)
        obstacleArray.push(obstacleAmount)
        obstacleAmount = new createObstacle(300, 550, 0, 0, 50, 15)
        obstacleArray.push(obstacleAmount)
        obstacleAmount = new createObstacle(150, 450, 0, 0, 50, 15)
        obstacleArray.push(obstacleAmount)
        obstacleAmount = new createObstacle(250, 350, 0, 0, 50, 15)
        obstacleArray.push(obstacleAmount)
        obstacleAmount = new createObstacle(100, 250, 0, 0, 50, 15)
        obstacleArray.push(obstacleAmount)
        obstacleAmount = new createObstacle(300, 100, 0, 0, 50, 15)
        obstacleArray.push(obstacleAmount)
        obstacleAmount = new createObstacle(50, 600, 0, 0, 50, 15)
        obstacleArray.push(obstacleAmount)
        obstacleAmount = new createObstacle(380, 200, 0, 0, 50, 15)
        obstacleArray.push(obstacleAmount)
        obstacleAmount = new createObstacle(100, 300, 0, 0, 50, 15)
        obstacleArray.push(obstacleAmount)
        obstacleAmount = new createObstacle(300, 170, 0, 0, 50, 15)
        obstacleArray.push(obstacleAmount)
        obstacleAmount = new createObstacle(20, 100, 0, 0, 50, 15)
        obstacleArray.push(obstacleAmount)
        obstacleAmount = new createObstacle(300, 300, 0, 0, 50, 15)
        obstacleArray.push(obstacleAmount)

        // obstacleArray.map((value) => {
            
        //     if (value.type === 'test')
        //         value.move()

        // })

    },

    draw(){

        for (i = 0; i < obstacleArray.length; i++) {
            // drawRect(obstacleArray[i].x, obstacleArray[i].y, obstacleArray[i].width, obstacleArray[i].height, obstacleArray[i].color)
            ctx.drawImage(platform, obstacleArray[i].x-5.5, obstacleArray[i].y-2, 60, 20)
        }

    }
}
