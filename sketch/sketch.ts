
let renderer: Renderer;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL)
    renderer =  new Renderer();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    frameRate(30);
    background(200);
    renderer.render();
}

function mouseClicked() {
    renderer.onMouseClicked(new Point2D(mouseX, mouseY));
}

function mouseDragged() {
    renderer.onMouseDragged(new Point2D(mouseX, mouseY));
  }