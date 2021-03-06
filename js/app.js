const initGame = () => {
    obstacles.createStart()
    player.start()
    
    fireballs.spawn()
    monsters.spawn()

}

function drawRect(x, y, width, height, color) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function update(progress) {
    player.update(progress)
    player.jump()
    player.endGame()
    obstacles.update(progress)
    scoreTracker.createLvl()
    items.update(progress)
    items.springcoil(progress)
    items.helicopter(progress)
    items.jetpack(progress)
    items.jumpBoots(progress)
    fireballs.update(progress)
    monsters.update(progress)
    gun.update(progress)
    
    
}

function draw() {
    ctx.clearRect(0,0, canvas.width, canvas.height)
    ctx.fillStyle = 'white'
    ctx.fillRect(0,0, canvas.width, canvas.height)
    canvasDrawbackground()
    scoreTracker.draw()
    obstacles.draw()
    items.draw()
    player.draw()
    fireballs.draw()
    monsters.draw()
    
    
    gun.draw()



}

function loop(timestamp) {

    if (player.gameOver === true) {return}

    let progress = timestamp - lastRender
    update(progress)
    draw()

    lastRender = timestamp
    requestAnimationFrame(loop)
}
let lastRender = 0

function initLoop() {

    
    requestAnimationFrame(loop)
}


