
function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL)

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

let r: Renderer;

function draw() {
    background(200);
    r =  new Renderer();
    r.render();
}

function mouseClicked() {
    r.onMouseClicked(new Point2D(mouseX, mouseY));
}