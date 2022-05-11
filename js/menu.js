const menu = document.getElementById('menu')
const playButton = document.getElementById('play')
const replayButton = document.getElementById('replay')
const controlsButton = document.getElementById('controls')
const highscoreButton = document.getElementById('highscore')
const h1 = document.getElementById('menutitle')
const backButton = document.createElement('button')

playButton.addEventListener('click', startGame)
controlsButton.addEventListener('click', showControls)
backButton.addEventListener('click', restartGame)

function startGame() {
    menu.style.visibility = 'hidden'
    playButton.style.visibility = 'hidden'
    replayButton.style.visibility = 'hidden'
    player.gameOver = false
    
    initGame()
    initLoop()
        
}

function showControls() {
    playButton.style.visibility = 'hidden'
    controlsButton.style.visibility = 'hidden'
    highscoreButton.style.visibility = 'hidden'
    let controlsText = document.createElement('p')
    menu.appendChild(controlsText)
    controlsText.innerHTML = 'Move left - Arrow Left <br> Move right - Arrow Right <br> Point gun left - A <br> Point gun right - D <br> Shoot - Spacebar'
    menu.appendChild(backButton)
    backButton.classList.add('button')
    backButton.setAttribute('id', 'backButton')
    backButton.innerText = 'Back'

}

function restartGame() {
    location.reload()

}

function gameOver() {
    playButton.style.visibility = 'hidden'
    controlsButton.style.visibility = 'hidden'
    highscoreButton.style.visibility = 'hidden'
    menu.style.visibility = 'visible'
    replayButton.style.visibility = 'visible'
    h1.innerText = 'You died'
    replayButton.addEventListener('click', restartGame)
}

