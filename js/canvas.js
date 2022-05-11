const canvas = document.createElement('canvas');
canvas.classList.add('canvas')
const ctx = canvas.getContext('2d', { alpha: false });
document.body.insertBefore(canvas, document.body.childNodes[0]);
canvas.width = 500;
canvas.height = 700;
function canvasDrawbackground() {
    ctx.drawImage(background, 0, 0, 500, 700);
}

canvas.style.position = 'absolute'
canvas.style.margin = 'auto'
canvas.style.top = '0'
canvas.style.bottom = '0'
canvas.style.left = '0'
canvas.style.right = '0'
canvas.style.borderStyle = 'solid'
canvas.style.borderColor = '#352e29'
canvas.style.borderWidth = '10px'
canvas.style.borderRadius = '10px'

const doodle = document.createElement('img')
doodle.src = 'src/images/doodler.png'

const platform = document.createElement('img')
platform.src = 'src/images/platform.png'

const background = document.createElement('img')
background.src = 'src/images/doodlejump.background.png'

const jetpack = document.createElement('img')
jetpack.src = 'src/images/jetpack.png'

const fireball = document.createElement('img')
fireball.src = 'src/images/fireball.png'

const springcoil = document.createElement('img')
springcoil.src = 'src/images/springcoil.png'

const heli = document.createElement('img')
heli.src = 'src/images/heli.png'

const boots = document.createElement('img')
boots.src = 'src/images/boots.png'

const gunbarrel = document.createElement('img')
gunbarrel.src = 'src/images/gun.png'

const monster = document.createElement('img')
monster.src = 'src/images/monster.png'