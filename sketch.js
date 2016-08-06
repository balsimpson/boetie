var socket;
var playerColor;
var otherPlayers;
var counter;

function setup() {
  var canvas = createCanvas(400, 200);
  background(120);
  counter = 0;
  canvas.parent('sketch_holder');

  // socket = io.connect('http://bowtie.tinkr.in:8000');

  socket = io.connect('window.location.host');

  socket.on('mouse', newDrawing);
  socket.on('playerCounter', playerCounter);
  console.log('socket ' + socket);
  playerColor = color(random(255), random(255), random(255));
  console.log('playerColor: ' + playerColor);
  //playerColor = (random(255), random(255), random(255));
  //
  //socket.emit('playerColor', playerColor);
  socket.emit('playerCounter', counter);


}

function playerCounter(data) {
    fill(255);
    text(data,10,20);
}
function newDrawing(data) {
  //otherColor = (data.c.levels[0], data.c.levels[1], data.c.levels[2]);
  fill(data.c.levels[0], data.c.levels[1], data.c.levels[2]);
  console.log('r:' + data.c.levels[0] + ', ' + 'g:' + data.c.levels[1] + ', ' + 'b:' + data.c.levels[2]);
  //console.log('otherColor: ' + otherColor);
  ellipse(data.x, data.y, 20, 20);
}

function mouseDragged() {
  var sid = socket.id;

  var data = {
    x: mouseX,
    y: mouseY,
    c: playerColor
  }
  socket.emit('mouse', data);

  // console.log(mouseX, mouseY, sid);

  fill(playerColor);
  ellipse(mouseX, mouseY, 20, 20);
}

function draw() {
}
