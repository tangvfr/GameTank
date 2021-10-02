function renderTank(colorCh, colorCo, colorCa, id, size) {
    let canvas = document.getElementById(id);
    canvas.width = 108*size;
    canvas.height = 52*size;
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = colorCh;
    ctx.fillRect(0, 0, 80*size, 6*size);
    ctx.fillStyle = colorCo;
    ctx.fillRect(6*size, 6*size, 80*size, 40*size);
    ctx.fillStyle = colorCh;
    ctx.fillRect(0, 46*size, 80*size, 6*size);
    ctx.fillStyle = colorCa;
    ctx.fillRect(68*size, 20*size, 40*size, 12*size);
}