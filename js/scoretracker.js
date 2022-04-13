const scoreTracker = {
    score: 0, 
    scoreRounded: 0,
    lowerNumber: 0.1,
    createLvl() {

        // if (this.scoreRounded < 500) {

        //     if (obstacleArray[obstacleArray.length - 1].y >= 125) {
        
        //         obstacleAmount = new createObstacle(Math.random() * 449, Math.random() * -1000, 0, 0, 50, 15)
    
        //         obstacleArray.push(obstacleAmount)

        //         obstacleAmount = new createObstacle(Math.random() * 449, Math.random() * -1000, 0, 0, 50, 15)
    
        //         obstacleArray.push(obstacleAmount)
    
        //         obstacleAmountSpecial = new createObstacle(Math.random() * 449, -10, 0, 0, 50, 15)
    
        //         obstacleArray.push(obstacleAmountSpecial)
    
        //         items.spawn() 
    
        //     }


        // }

        // if (this.scoreRounded > 500 && this.scoreRounded < 1000) {

        //     if (obstacleArray[obstacleArray.length - 1].y >= 125) {
        
        //         obstacleAmount = new createObstacle(Math.random() * 449, Math.random() * -1000, 0, 0, 50, 15)
    
        //         obstacleArray.push(obstacleAmount)
    
        //         obstacleAmountSpecial = new createObstacle(Math.random() * 449, -10, 0, 0, 50, 15)
    
        //         obstacleArray.push(obstacleAmountSpecial)
    
        //         items.spawn() 
    
        //     }

        // }

        // if (this.scoreRounded > 1000 && this.scoreRounded < 1500) {

        //     if (obstacleArray[obstacleArray.length - 1].y >= 125) {
        
        //         obstacleAmountSpecial = new createObstacle(Math.random() * 449, -10, 0, 0, 50, 15)
    
        //         obstacleArray.push(obstacleAmountSpecial)
    
        //         items.spawn() 
    
        //     }

        // }
        
        if (this.scoreRounded > 0) {

            if (obstacleArray[obstacleArray.length - 1].y >= 125) {
                
                // if (Math.random() * 10 < 5) {
                //     obstacleAmount = new createObstacle(Math.random() * 449, Math.random() * -1000, 0, 0, 50, 15)
                //     obstacleArray.push(obstacleAmount)
                //     obstacleMovingArray.push(obstacleAmount)
                // }
              
                obstacleAmountSpecial = new createObstacle(Math.random() * 449, -10, 0, 0, 50, 15)                
                obstacleArray.push(obstacleAmountSpecial)
                obstacleMovingArray.push(obstacleAmountSpecial)
                
            
            }

        }

    },
    draw() {
        ctx.fillStyle = 'black'
        ctx.font = '40px arial'
        ctx.fillText('Score:' + this.scoreRounded, 10, 40, 100);
    }
}