const player = {
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,
    width: 50,
    height: 70,
    jumpPower: -1,
    moveSpeed: 0.4,
    gravity: 0.003,
    xDrag: 0.9,
    // color: '#dd1111',
    start() {
        this.x = ctx.canvas.width / 2 - this.width / 2;
        this.y = ctx.canvas.height - 200
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
        
        if (player.x < - (player.width / 2) && player.dx < 0) {
            player.x = canvas.width + (player.width / 2)
        }

        if (player.x + player.width  > canvas.width + (player.width / 2) && player.dx > 0) {
            player.x = - (player.width / 2)
        }
        
    },
    jump() {
        
        for (i = 0; i < obstacleArray.length; i++) {

            if (player.y + player.height > obstacleArray[i].y && player.y + player.height - 5 < obstacleArray[i].y + obstacleArray[i].height
                && player.x + player.width >= obstacleArray[i].x && player.x - player.width < obstacleArray[i].x && player.dy > 0.3) {
                    
                player.dy = player.jumpPower;

            } 

        }
        
    },
    draw() {
        // drawRect(this.x, this.y, this.width, this.height, this.color);
        ctx.drawImage(doodle, player.x-3, player.y, 80, 70);
        
    },
     
    endGame() {
        if (this.y + player.height >= canvas.height) {
            alert('Game over - your score is')
            player.start()     
        }
    }
}