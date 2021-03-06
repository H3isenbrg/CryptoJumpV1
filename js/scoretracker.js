const scoreTracker = {
    score: 0, 
    scoreRounded: 0,
    lowerNumber: 0.1,
    highscore: localStorage.getItem('highscore'),
    trackHighscore() {
        if (this.scoreRounded > this.highscore) {
            this.highscore = this.scoreRounded
            localStorage.setItem('highscore', this.highscore)

        }
            
    },
    createLvl() {

        if (this.scoreRounded < 500) {
            
            if (obstacleArray[obstacleArray.length - 1].y >= 125) {
        
                obstacleAmount = new createObstacle(Math.random() * 449, Math.random() * -1000, 0, 0, 50, 15)
    
                obstacleArray.push(obstacleAmount)

                obstacleAmount = new createObstacle(Math.random() * 449, Math.random() * -1000, 0, 0, 50, 15)
    
                obstacleArray.push(obstacleAmount)
                        
                obstacleAmountSpecial = new createObstacle(Math.random() * 449, -10, 0, 0, 50, 15)
    
                obstacleArray.push(obstacleAmountSpecial)

                items.spawn() 
                
            }


        }

        if (this.scoreRounded > 500 && this.scoreRounded < 1000) {

            if (obstacleArray[obstacleArray.length - 1].y >= 125) {
        
                obstacleAmount = new createObstacle(Math.random() * 449, Math.random() * -1000, 0, 0, 50, 15)
                
                obstacleArray.push(obstacleAmount)
                
                if (Math.random() * 10 < 3) {
                    obstacleAmount.move()
                }

                obstacleAmountSpecial = new createObstacle(Math.random() * 449, -10, 0, 0, 50, 15)
    
                obstacleArray.push(obstacleAmountSpecial)

                items.spawn() 
            }

        }

        if (this.scoreRounded > 1000 && this.scoreRounded < 1500) {

            if (obstacleArray[obstacleArray.length - 1].y >= 125) {
        
                obstacleAmount = new createObstacle(Math.random() * 449, Math.random() * -1000, 0, 0, 50, 15)
                
                obstacleArray.push(obstacleAmount)
                
                if (Math.random() * 10 < 5) {
                    obstacleAmount.move()
                } else {
                    obstacleAmount.moveVertical()
                }

                
                obstacleAmountSpecial = new createObstacle(Math.random() * 449, -10, 0, 0, 50, 15)
    
                obstacleArray.push(obstacleAmountSpecial)

                items.spawn() 
    
            }

        }
        
        if (this.scoreRounded > 1500 && this.scoreRounded < 2000) {

            if (obstacleArray[obstacleArray.length - 1].y >= 125) {
            
                obstacleAmountSpecial = new createObstacle(Math.random() * 449, -10, 0, 0, 50, 15)
    
                obstacleArray.push(obstacleAmountSpecial)
                
                if (Math.random() * 10 < 3.3) {
                    obstacleAmountSpecial.move()
                }
                
            
            
            }

        }
        
        if (this.scoreRounded > 2000) {

            if (obstacleArray[obstacleArray.length - 1].y >= 125) {
            
                obstacleAmountSpecial = new createObstacle(Math.random() * 449, -10, 0, 0, 50, 15)
    
                obstacleArray.push(obstacleAmountSpecial)
                
                if (Math.random() * 10 < 3.3) {
                    obstacleAmountSpecial.move()
                } else if (Math.random() * 10 > 6.6) {
                    obstacleAmountSpecial.moveVertical()
                }
                
            }

        }

    },
    draw() {
        let currentScore = document.getElementById('scorenumber1')
        currentScore.innerText = scoreTracker.scoreRounded

        let bestScore = document.getElementById('scorenumber2')
        bestScore.innerText = scoreTracker.highscore
        
    }
}
