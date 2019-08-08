import { Renderer } from "./renderer";
import { Point2D } from "./geometry";
import p5 from 'p5'

export class Consts {
    static basicFont : p5.Font;
    static canvasCenter: Point2D;
    static p: p5;
}

var sketch = (p: p5) => {
    let renderer: Renderer;

    p.preload = () => {
        Consts.p = p;
        Consts.basicFont = p.loadFont(
          "https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Bold.otf"
        );
      }
    
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL)
        renderer =  new Renderer();
    
        Consts.canvasCenter = new Point2D(p.width, p.height);
    
        p.frameRate(30);
        p.background(200);
        renderer.render();
    }
    
    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }
    
    p.draw = () => {
        p.background(200);
        renderer.render();
    }
    
    p.mouseClicked = () => {
        renderer.onMouseClicked(new Point2D(p.mouseX, p.mouseY));
        console.log(p.mouseX);
    }
    
    p.mouseDragged = () => {
        renderer.onMouseDragged(new Point2D(p.mouseX, p.mouseY));
      }
    
}

new p5(sketch)