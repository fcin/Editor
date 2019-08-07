
class Consts {
    static basicFont : p5.Font;
    static canvasCenter: Point2D;
}

let renderer: Renderer;

function preload() {
    Consts.basicFont = loadFont(
      "https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Bold.otf"
    );
  }

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL)
    renderer =  new Renderer();

    Consts.canvasCenter = new Point2D(width, height);

    frameRate(30);
    background(200);
    renderer.render();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    background(200);
    renderer.render();
}

function mouseClicked() {
    renderer.onMouseClicked(new Point2D(mouseX, mouseY));
    console.log(mouseX);
}

function mouseDragged() {
    renderer.onMouseDragged(new Point2D(mouseX, mouseY));
  }