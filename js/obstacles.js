let obstacleArray = []

const obstacles = {
    x: 200,
    y: 200,
    width: 50,
    height: 15,
    obstacleItemSpeed: 40,
    obstacleMoveState: false, 
    color: '#600000',
    update(progress) {

        if (player.y < 300) {
            obstacleArray.map((value) => {
                value.y += progress * 0.28
            })
        }  

        for (i = 0; i < obstacleArray.length; i++) {
            if (obstacleArray[i].y >= canvas.height + 100) {
            obstacleArray.splice(i, 1) 
            }
            
        }

    },
    createStart() {
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
    createLvl1() {       

        if (obstacleArray[obstacleArray.length - 1].y >= 135) {
        
            obstacleAmount = new createObstacle(Math.random() * 449, Math.random() * -1000, 50, 15)

            obstacleArray.push(obstacleAmount)

            obstacleAmountSpecial = new createObstacle(Math.random() * 449, -10, 50, 15)

            obstacleArray.push(obstacleAmountSpecial)

            items.spawn() 

        }

    },
    draw(){

        for (i = 0; i < obstacleArray.length; i++) {
            // drawRect(obstacleArray[i].x, obstacleArray[i].y, obstacleArray[i].width, obstacleArray[i].height, obstacleArray[i].color)
            ctx.drawImage(platform, obstacleArray[i].x-5.5, obstacleArray[i].y-2, 60, 20)
        }

    }
}

function createObstacle(x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
}

