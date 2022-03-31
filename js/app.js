const canvas = document.createElement('canvas');
canvas.classList.add('canvas')
const ctx = canvas.getContext('2d', { alpha: false });
document.body.insertBefore(canvas, document.body.childNodes[0]);
canvas.width = 500;
canvas.height = 700;

const player = {
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,
    width: 50,
    height: 70,
    jumpPower: -1.1,
    moveSpeed: 0.4,
    gravity: 0.003,
    xDrag: 0.9,
    color: '#dd1111',
    onGround: false,
    onJump: false,
    usingItem: false,
    usingJetpack: false,
    usingHeli: false,
    usingBoots: false,
    start() {
        this.x = ctx.canvas.width / 2 - this.width / 2;
        this.y = ctx.canvas.height - this.height
        this.dx = 0;
        this.dy = 0;    
    },
    update(progress) {
        
        if (keyboard.left) {this.dx = -this.moveSpeed}
        if (keyboard.right) {this.dx = this.moveSpeed}

        this.x += progress * this.dx;
        this.dx *= this.xDrag

        this.y += progress * this.dy
        this.dy += progress * this.gravity;
        
        if (this.y + this.height >= canvas.height) {
            this.onGround = true
        } else {
            this.onGround = false
        }

        if (this.onGround === true) {this.dy = this.jumpPower}

        if (player.x < - (player.width / 2) && player.dx < 0) {
            player.x = canvas.width + (player.width / 2)
        }

        if (player.x + player.width  > canvas.width + (player.width / 2) && player.dx > 0) {
            player.x = - (player.width / 2)
        }
    },
    
    draw() {
        drawRect(this.x, this.y, this.width, this.height, this.color);
        
    },
     
    endGame() {
        if (this.y + player.height >= 700) {
            alert('Game over - your score is')
            player.start()     
        }
    }
}

function drawRect(x, y, width, height, color) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

const initGame = (() => {
    player.start()
})()

function update(progress) {
    player.update(progress)
}

function draw() {
    ctx.clearRect(0,0, canvas.width, canvas.height)
    ctx.fillStyle = 'white'
    ctx.fillRect(0,0, canvas.width, canvas.height)
    player.draw()
}

function loop(timestamp) {
    let progress = timestamp - lastRender
    update(progress)
    draw()

    lastRender = timestamp
    requestAnimationFrame(loop)
}
let lastRender = 0
requestAnimationFrame(loop)

