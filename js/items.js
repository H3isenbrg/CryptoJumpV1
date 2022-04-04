let itemsSpringcoilArray = []
let springcoilArray = []

const items = {
    hasSpawned: false,
    inUse: false,
    color: '#dd1111',
    spawn() {

        if (Math.random() * 10 <= 2 && items.hasSpawned === false && items.inUse === false && itemsSpringcoilArray.length === 0) {
            itemsSpringcoilArray.push(obstacleAmountSpecial)

            for (i = 0; i < itemsSpringcoilArray.length; i++) {

                springcoilItem = new createObstacle(itemsSpringcoilArray[i].x + 10, itemsSpringcoilArray[i].y - 20, 30, 30)
                springcoilArray.push(springcoilItem)
                
                // if (springcoilArray[i].y >= canvas.height) {
                //     springcoilArray.splice(i, 1) 
                // }

                console.log(springcoilArray)
                
    
            }

        }

        for (i = 0; i < itemsSpringcoilArray.length; i++) {
            if (itemsSpringcoilArray[i].y >= canvas.height) {
                itemsSpringcoilArray.splice(i, 1) 
            }
        }
        

    },
    update(progress) {

        if (player.y < 300) {
            springcoilArray.map((value) => {
                value.y += progress * 0.28
            })
        }  

        for (i = 0; i < springcoilArray.length; i++) {

            if (player.y + player.height > springcoilArray[i].y + springcoilArray[i].height && 
                player.y + player.height - 5 < springcoilArray[i].y + springcoilArray[i].height &&
                player.x + player.width >= springcoilArray[i].x && player.x - player.width <= springcoilArray[i].x && player.dy > 2 && player.usingItem === false) {
                    
                    

                    player.dy = player.jumpPower * 1.5
                    player.y += player.dy;
                    springSound.play();
                    
                    let boosterInterval = setInterval(() => {

                        items.inUse = true
                    
                        obstacleArray.map((value) => {
                            value.y += 10
                        })
    
                        springcoilArray.map((value) => {
                            value.y += 10
                        })

                        setTimeout(() => {

                            items.inUse = false 
                            clearInterval(boosterInterval)
                            
                         }, 1000) 


                        }, 20)

            } 

            if (springcoilArray[i].y >= 700) {
                springcoilArray.splice(i, 1) 
            }

        }
    },
    draw() {

        for (i = 0; i < springcoilArray.length; i++) {
            // drawRect(springcoilArray[i].x, springcoilArray[i].y, springcoilArray[i].width, springcoilArray[i].height, items.color)
            ctx.drawImage(springcoil, springcoilArray[i].x, springcoilArray[i].y, 30, 30)
        }
    }
    









}