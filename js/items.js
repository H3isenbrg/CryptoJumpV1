let itemsSpringcoilArray = []
let springcoilArray = []

let itemsHelicopterArray = []
let helicopterArray = []

let itemsJetpackArray = []
let jetpackArray = []

let itemsJumpbootsArray = []
let jumpbootsArray = []

const items = {
    hasSpawned: false,
    inUse: false,
    usingJumpBoots: false,
    speed: 0.42,
    color: '#dd1111',
    spawn() {

        if (itemsSpringcoilArray.length === 0 && itemsHelicopterArray.length === 0 && itemsJetpackArray.length === 0 && itemsJumpbootsArray.length === 0) {
            items.hasSpawned = false
        } else {
            items.hasSpawned = true
        }

        if (Math.random() * 10 <= 2 && items.hasSpawned === false && items.inUse === false) {
            itemsSpringcoilArray.push(obstacleAmountSpecial)

            for (i = 0; i < itemsSpringcoilArray.length; i++) {

                springcoilItem = new createObstacle(itemsSpringcoilArray[i].x + 10, itemsSpringcoilArray[i].y - 30, 30, 30)
                springcoilArray.push(springcoilItem)
                
            }

        } else if (Math.random() * 10 <= 0.2 && items.hasSpawned === false && items.inUse === false) {

            itemsHelicopterArray.push(obstacleAmountSpecial)

            for (i = 0; i < itemsHelicopterArray.length; i++) {

                helicopterItem = new createObstacle(itemsHelicopterArray[i].x + 10, itemsHelicopterArray[i].y - 30, 30, 30)
                helicopterArray.push(helicopterItem)
                
            }

        } else if (Math.random() * 10 <= 0.1 && items.hasSpawned === false && items.inUse === false) {

            itemsJumpbootsArray.push(obstacleAmountSpecial)

            for (i = 0; i < itemsJumpbootsArray.length; i++) {

                jumpbootsItem = new createObstacle(itemsJumpbootsArray[i].x + 10, itemsJumpbootsArray[i].y - 30, 30, 30)
                jumpbootsArray.push(jumpbootsItem)
                
            }

        } else if (Math.random() * 10 <= 0.05 && items.hasSpawned === false && items.inUse === false) {

            itemsJetpackArray.push(obstacleAmountSpecial)

            for (i = 0; i < itemsJetpackArray.length; i++) {

                jetpackItem = new createObstacle(itemsJetpackArray[i].x + 10, itemsJetpackArray[i].y - 30, 30, 30)
                jetpackArray.push(jetpackItem)
                
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

        for (i = 0; i < itemsHelicopterArray.length; i++) {

            if (itemsHelicopterArray[i].y >= canvas.height) {
                itemsHelicopterArray.splice(i, 1) 
            }

        }
        
        for (i = 0; i < helicopterArray.length; i++) {

            if (helicopterArray[i].y >= canvas.height) {
                helicopterArray.splice(i, 1) 
            }

        }

        for (i = 0; i < itemsJumpbootsArray.length; i++) {

            if (itemsJumpbootsArray[i].y >= canvas.height) {
                itemsJumpbootsArray.splice(i, 1) 
            }

        }
        
        for (i = 0; i < jumpbootsArray.length; i++) {

            if (jumpbootsArray[i].y >= canvas.height) {
                jumpbootsArray.splice(i, 1) 
            }

        }

        for (i = 0; i < itemsJetpackArray.length; i++) {

            if (itemsJetpackArray[i].y >= canvas.height) {
                itemsJetpackArray.splice(i, 1) 
            }

        }
        
        for (i = 0; i < jetpackArray.length; i++) {

            if (jetpackArray[i].y >= canvas.height) {
                jetpackArray.splice(i, 1) 
            }

        }

    },
    update(progress) {

        if (player.y < 300) {
            springcoilArray.map((value) => {
                value.y += progress * items.speed
            })

            helicopterArray.map((value) => {
                value.y += progress * items.speed
            })
            
            jumpbootsArray.map((value) => {
                value.y += progress * items.speed
            })

            jetpackArray.map((value) => {
                value.y += progress * items.speed
            })

        }  

    },
    draw() {
        for (i = 0; i < springcoilArray.length; i++) {
            // drawRect(springcoilArray[i].x, springcoilArray[i].y, springcoilArray[i].width, springcoilArray[i].height, items.color)
            ctx.drawImage(springcoil, springcoilArray[i].x, springcoilArray[i].y, 30, 30)
        }

        for (i = 0; i < helicopterArray.length; i++) {
            // drawRect(helicopterArray[i].x, helicopterArray[i].y, helicopterArray[i].width, helicopterArray[i].height, items.color)
            ctx.drawImage(heli, helicopterArray[i].x, helicopterArray[i].y, 30, 30)
        }

        for (i = 0; i < jumpbootsArray.length; i++) {
            // drawRect(jumpbootsArray[i].x, jumpbootsArray[i].y, jumpbootsArray[i].width, jumpbootsArray[i].height, items.color)
            ctx.drawImage(boots, jumpbootsArray[i].x - 5, jumpbootsArray[i].y, 40, 40)
        }

        for (i = 0; i < jetpackArray.length; i++) {
            // drawRect(jetpackArray[i].x, jetpackArray[i].y, jetpackArray[i].width, jetpackArray[i].height, items.color)
            ctx.drawImage(jetpack, jetpackArray[i].x - 10, jetpackArray[i].y - 5, 50, 50)
        }


    },
    springcoil(progress) {
        
        for (i = 0; i < springcoilArray.length; i++) {
            
            if (player.y + player.height > springcoilArray[i].y && player.y + player.height - 5 < springcoilArray[i].y + springcoilArray[i].height &&
                player.x + player.width >= springcoilArray[i].x && player.x - player.width < springcoilArray[i].x && player.dy > 0.3 && items.inUse === false) {
                    
                    player.dy = player.jumpPower * 1.5
                    let start = Date.now()
                    items.inUse = true
                    
                    let initSpringcoil = () => {

                        scoreTracker.score += progress * 1.1 * scoreTracker.lowerNumber
                        scoreTracker.scoreRounded = Math.ceil(scoreTracker.score)
                        
                        obstacleArray.map((value) => {
                            value.y += progress * 1.1
                        })

                        springcoilArray.map((value) => {
                            value.y += progress * 1.1
                        })

                        helicopterArray.map((value) => {
                            value.y += progress * 1.1
                        })

                        jumpbootsArray.map((value) => {
                            value.y += progress * 1.1
                        })

                        jetpackArray.map((value) => {
                            value.y += progress * 1.1
                        })

                        current = Date.now()

                        if (current - start < 500) {
                            requestAnimationFrame(initSpringcoil)
                        } else {

                                let start = Date.now()
                            
                                let initSpringcoilSlow = () => {
                                
                                player.gravity = 0.0015

                                scoreTracker.score += progress * 0.5 * scoreTracker.lowerNumber
                                scoreTracker.scoreRounded = Math.ceil(scoreTracker.score)

                                obstacleArray.map((value) => {
                                value.y += progress * 0.5
                                })
        
                                springcoilArray.map((value) => {
                                value.y += progress * 0.5
                                })
        
                                helicopterArray.map((value) => {
                                value.y += progress * 0.5
                                })

                                jumpbootsArray.map((value) => {
                                value.y += progress * 0.5
                                })
        
                                jetpackArray.map((value) => {
                                value.y += progress * 0.5
                                })
                                
                                let current = Date.now()
                                
                                if (current - start < 250) {
                                requestAnimationFrame(initSpringcoilSlow)
                                } else {
                                items.inUse = false
                                player.gravity = 0.003
                                }

                            }

                        initSpringcoilSlow()
                            
                        }

                    }

                    initSpringcoil()

            } 


        }


    }, 
    helicopter(progress) {

        for (i = 0; i < helicopterArray.length; i++) {
            
            if (player.y + player.height > helicopterArray[i].y && player.y + player.height - 5 < helicopterArray[i].y + helicopterArray[i].height &&
                player.x + player.width >= helicopterArray[i].x && player.x - player.width < helicopterArray[i].x && items.inUse === false) {
                    
                    let start = Date.now()
                    items.inUse = true
                    helicopterArray.splice(i, 1)
                    player.dy = 0
                    player.gravity = 0

                    let adjustPlayer = () => {
                        
                        if (player.y > 100) {

                            player.dy += progress * -0.001
    
                        } else {
                            player.dy = 0
                        }
                                     

                        current = Date.now()

                        if (current - start < 1000) {
                            requestAnimationFrame(adjustPlayer)
                        }

                    }

                    let initHelicopter = () => {
                        
                        scoreTracker.score += progress * 0.75 * scoreTracker.lowerNumber
                        scoreTracker.scoreRounded = Math.ceil(scoreTracker.score)
                    
                        obstacleArray.map((value) => {
                            value.y += progress * 0.75
                        })

                        springcoilArray.map((value) => {
                            value.y += progress * 0.75
                        })

                        helicopterArray.map((value) => {
                            value.y += progress * 0.75
                        })

                        jumpbootsArray.map((value) => {
                            value.y += progress * 0.75
                        })

                        jetpackArray.map((value) => {
                            value.y += progress * 0.75
                        })

                        current = Date.now()

                        if (current - start < 5000) {
                            requestAnimationFrame(initHelicopter)
                        } else {
                            items.inUse = false
                            player.gravity = 0.003
                        }

                    }

                    adjustPlayer()
                    initHelicopter()

            } 


        }

    },
    jetpack(progress) {
        
        for (i = 0; i < jetpackArray.length; i++) {
            
            if (player.y + player.height > jetpackArray[i].y && player.y + player.height - 5 < jetpackArray[i].y + jetpackArray[i].height &&
                player.x + player.width >= jetpackArray[i].x && player.x - player.width < jetpackArray[i].x && items.inUse === false) {
                    
                    let start = Date.now()
                    items.inUse = true
                    jetpackArray.splice(i, 1)
                    player.dy = 0
                    player.gravity = 0

                    let adjustPlayer = () => {
                        
                        if (player.y > 100) {

                            player.dy += progress * -0.001
    
                        } else {
                            player.dy = 0
                        }
                                     

                        current = Date.now()

                        if (current - start < 1000) {
                            requestAnimationFrame(adjustPlayer)
                        }

                    }

                    let initJetpack = () => {
                        
                        scoreTracker.score += progress * 3 * scoreTracker.lowerNumber
                        scoreTracker.scoreRounded = Math.ceil(scoreTracker.score)

                        obstacleArray.map((value) => {
                            value.y += progress * 3
                        })

                        springcoilArray.map((value) => {
                            value.y += progress * 3
                        })

                        helicopterArray.map((value) => {
                            value.y += progress * 3
                        })
                        
                        jumpbootsArray.map((value) => {
                            value.y += progress * 3
                        })

                        jetpackArray.map((value) => {
                            value.y += progress * 3
                        })

                        current = Date.now()

                        if (current - start < 3500) {
                            requestAnimationFrame(initJetpack)
                        } else {
                            
                            let start = Date.now()

                            let initJetpackSlow = () => {

                                scoreTracker.score += progress * 0.5 * scoreTracker.lowerNumber
                                scoreTracker.scoreRounded = Math.ceil(scoreTracker.score)

                                obstacleArray.map((value) => {
                                    value.y += progress * 0.5
                                })
        
                                springcoilArray.map((value) => {
                                    value.y += progress * 0.5
                                })
        
                                helicopterArray.map((value) => {
                                    value.y += progress * 0.5
                                })

                                jumpbootsArray.map((value) => {
                                    value.y += progress * 0.5
                                })
        
                                jetpackArray.map((value) => {
                                    value.y += progress * 0.5
                                })
                                
                                let current = Date.now()

                                if (current - start < 1500) {
                                    requestAnimationFrame(initJetpackSlow)
                                } else {
                                    items.inUse = false
                                    player.gravity = 0.003
                                }

                            }                            
                          
                            initJetpackSlow()

                        }

                    }

                    adjustPlayer()
                    initJetpack()

            } 


        }


    }, 
    jumpBoots(progress) {

        if (player.y < 100 && items.usingJumpBoots === true) {
            player.jumpPower *= 1.1
        }

        if (player.y > 100 && player.y <= 200 && items.usingJumpBoots === true) {
            player.jumpPower *= 1.2
        }

        if (player.y > 200 && player.y <= 300 && items.usingJumpBoots === true) {
            player.jumpPower *= 1.3
        }

        if (player.y > 300 && player.y <= 400 && items.usingJumpBoots === true) {
            player.jumpPower *= 1.4
        }

        if (player.y > 400 && player.y < 500 && items.usingJumpBoots === true) {
            player.jumpPower *= 1.5
        }

        if (player.y > 500 && items.usingJumpBoots === true) {
            player.jumpPower *= 1.6   
        }

        for (i = 0; i < jumpbootsArray.length; i++) {
            
            if (player.y + player.height > jumpbootsArray[i].y && player.y + player.height - 5 < jumpbootsArray[i].y + jumpbootsArray[i].height &&
                player.x + player.width >= jumpbootsArray[i].x && player.x - player.width < jumpbootsArray[i].x && items.inUse === false) {
                    
                    let start = Date.now()
                    items.inUse = true
                    items.usingJumpBoots = true
                    jumpbootsArray.splice(i, 1)

                    let jumpbootsTimer = () => {
                        
                        current = Date.now()

                        if (current - start < 10000) {
                            requestAnimationFrame(jumpbootsTimer)
                        } else {
                            items.usingJumpBoots = false
                            items.inUse = false
                        }

                    }
                
                jumpbootsTimer()
            } 

        }

        for (i = 0; i < obstacleArray.length; i++) {

            if (player.y + player.height > obstacleArray[i].y && player.y + player.height - 20 < obstacleArray[i].y + obstacleArray[i].height
                && player.x + player.width >= obstacleArray[i].x && player.x - player.width < obstacleArray[i].x && player.dy > 1 && items.usingJumpBoots === true) {
                
                player.dy = player.jumpPower
                let start = Date.now()
                
                let initJumpboots = () => {
                    
                    scoreTracker.score += progress * 1.1 * scoreTracker.lowerNumber
                    scoreTracker.scoreRounded = Math.ceil(scoreTracker.score)

                    obstacleArray.map((value) => {
                        value.y += progress * 1.1
                    })

                    springcoilArray.map((value) => {
                        value.y += progress * 1.1
                    })

                    helicopterArray.map((value) => {
                        value.y += progress * 1.1
                    })

                    jumpbootsArray.map((value) => {
                        value.y += progress * 1.1
                    })

                    jetpackArray.map((value) => {
                        value.y += progress * 1.1
                    })

                    current = Date.now()

                    if (current - start < 500) {
                        requestAnimationFrame(initJumpboots)
                    } else {

                        let start = Date.now()

                        let initJumpbootsSlow = () => {

                            player.gravity = 0.0015

                            scoreTracker.score += progress * 0.5 * scoreTracker.lowerNumber
                            scoreTracker.scoreRounded = Math.ceil(scoreTracker.score)

                            obstacleArray.map((value) => {
                                value.y += progress * 0.5
                            })
        
                            springcoilArray.map((value) => {
                                value.y += progress * 0.5
                            })
        
                            helicopterArray.map((value) => {
                                value.y += progress * 0.5
                            })

                            jumpbootsArray.map((value) => {
                                value.y += progress * 0.5
                            })
        
                            jetpackArray.map((value) => {
                                value.y += progress * 0.5
                            })
                                
                            let current = Date.now()
                                
                            if (current - start < 250) {
                                requestAnimationFrame(initJumpbootsSlow)
                            } else {
                                player.gravity = 0.003
                            }
                        
                        }

                        initJumpbootsSlow()

                    }

                }

                initJumpboots()

            } 

        }

    }
    
}