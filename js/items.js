let itemsSpringcoilArray = []
let springcoilArray = []

const items = {
    hasSpawned: false,
    inUse: false,
    speed: 0.28,
    color: '#dd1111',
    spawn() {
        // remove hasspawned & inuse?
        if (Math.random() * 10 <= 2 && items.hasSpawned === false && items.inUse === false && itemsSpringcoilArray.length === 0) {
            itemsSpringcoilArray.push(obstacleAmountSpecial)

            for (i = 0; i < itemsSpringcoilArray.length; i++) {

                springcoilItem = new createObstacle(itemsSpringcoilArray[i].x + 10, itemsSpringcoilArray[i].y - 20, 30, 30)
                springcoilArray.push(springcoilItem)
                
            }

        }

        for (i = 0; i < itemsSpringcoilArray.length; i++) {

            if (itemsSpringcoilArray[i].y >= canvas.height) {
                itemsSpringcoilArray.splice(i, 1) 
            }

        }
        
        for (i = 0; i < springcoilArray.length; i++) {

            if (springcoilArray[i].y >= canvas.height) {
                springcoilArray.splice(i, 1) 
            }

        }
    },
    update(progress) {

        if (player.y < 300) {
            springcoilArray.map((value) => {
                value.y += progress * items.speed
            })
        }  

    },
    draw() {
        console.log(items.inUse)
        for (i = 0; i < springcoilArray.length; i++) {
            // drawRect(springcoilArray[i].x, springcoilArray[i].y, springcoilArray[i].width, springcoilArray[i].height, items.color)
            ctx.drawImage(springcoil, springcoilArray[i].x, springcoilArray[i].y, 30, 30)
        }
    },
    springcoil(progress) {
        
        for (i = 0; i < springcoilArray.length; i++) {
            
            if (player.y + player.height > springcoilArray[i].y && player.y + player.height - 5 < springcoilArray[i].y + springcoilArray[i].height &&
                player.x + player.width >= springcoilArray[i].x && player.x - player.width < springcoilArray[i].x && player.dy > 0.3 && items.inUse === false) {
                    
                    player.dy = player.jumpPower* 1.4
                    let start = Date.now()
                    items.inUse = true
                    
                    let initSpringcoil = () => {
                        
                        obstacleArray.map((value) => {
                            value.y += progress * 1.1
                        })

                        springcoilArray.map((value) => {
                            value.y += progress * 1.1
                        })

                        current = Date.now()

                        if (current - start < 750) {
                            requestAnimationFrame(initSpringcoil)
                        } else {
                            items.inUse = false
                        }

                    }

                    initSpringcoil()

            } 


        }


    }
    









}