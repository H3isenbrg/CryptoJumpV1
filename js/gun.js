let bulletsArray = []

const gun = {
    x: 0,
    y: 0,
    x2: 0,
    y2: 0,
    width: 10,
    height: 50,
    angle: -1.55,
    color: '#fc0303',
    isShooting: false,
    
    update(progress) {

        this.x = player.x + player.width / 2
        this.y = player.y

        this.x2 = this.x
        this.y2 = this.y + 5

        ctx.save();

        if (keyboard.leftGun && this.angle >= -2.5) {this.angle -= 0.005 * progress}

        if (keyboard.rightGun && this.angle <= -0.55) {this.angle += 0.005 * progress}

        if (keyboard.shoot === true && this.isShooting === false) {
            this.isShooting = true;
            shootSound.play();
            bulletsArray.push(
                new bulletConstructor(this.angle, this.x2, this.y2, progress)
            )
            setTimeout(() => {
                this.isShooting = false;
            }, 400);
        }
        
        for (i = 0; i < bulletsArray.length; i++) {
            if (bulletsArray[i].y < 0) {
                bulletsArray.splice(i, 1)
            }
        }

        bulletsArray.forEach(bullet => {
            bullet.move();
        })

    },
    draw() {
        ctx.translate((this.x2), (this.y2));
        ctx.rotate(this.angle); 
        ctx.translate(-(this.x2), -(this.y2));
        // drawRect(this.x, this.y, this.width, this.height, this.color)
        ctx.drawImage(gunbarrel, this.x, this.y, 40, 10)
        ctx.restore()
        bulletsArray.forEach(bullet => {    
            bullet.draw();
        })
    }

}

function bulletConstructor(angle, x, y, progress) {
    this.radius = 5;
    this.angle = angle;
    this.x = x;
    this.y = y;
    this.dx = Math.cos(angle) * progress * 2.5;
    this.dy = Math.sin(angle) * progress * 2.5;
    this.progress = progress

    this.move = function() {
        this.x += this.dx;
        this.y += this.dy; 
    }

    this.draw = function() {
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}