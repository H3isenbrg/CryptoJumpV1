const canvas = document.createElement('canvas');
canvas.classList.add('canvas')
const ctx = canvas.getContext('2d', { alpha: false });
document.body.insertBefore(canvas, document.body.childNodes[0]);
canvas.width = 500;
canvas.height = 700;
function canvasDrawbackground() {
    ctx.drawImage(background, 0, 0, 500, 700);
}
