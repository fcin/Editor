import p5 from 'p5';
import {Renderer} from '../sketch/renderer';
import { Point2D } from '../sketch/geometry';
import { Consts } from '../sketch/sketch';

/**
 * @param {p5} p
 */
export const sketch = (p: p5) => {
  let renderer: Renderer;
  
  p.setup = () => {
    this.renderer =  new Renderer();

    Consts.canvasCenter = new Point2D(Consts.p.width, Consts.p.height);

    Consts.p.frameRate(30);
    Consts.p.background(200);
    renderer.render();
  }

  p.draw = () => {
    // Define render logic for your sketch here
  }

  p.keyPressed = () => {
    // Export sketch's canvas to file
    if (p.keyCode === 80) {
      p.saveCanvas('sketch', 'png')
    }
  }
}
