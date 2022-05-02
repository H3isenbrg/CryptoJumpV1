const menu = document.getElementById('menu')
const playButton = document.getElementById('play')
const replayButton = document.getElementById('replay')

playButton.addEventListener('click', startGame)

function startGame() {
    menu.style.visibility = 'hidden'
    playButton.style.visibility = 'hidden'
    replayButton.style.visibility = 'hidden'
    player.gameOver = false
    
    initGame()
    initLoop()
    
    
}

function restartGame() {
    location.reload()

    //below code doesnt happen because of reload. how to solve reload? 
    menu.style.visibility = 'hidden'
    playButton.style.visibility = 'hidden'
    replayButton.style.visibility = 'hidden'
    player.gameOver = false
    initGame()
    initLoop()
}

function gameOver() {
    menu.style.visibility = 'visible'
    replayButton.style.visibility = 'visible'
    replayButton.addEventListener('click', restartGame)
}

