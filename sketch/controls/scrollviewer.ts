import { Scrollbar } from "./scrollbar";
import { Point2D } from "../geometry";
import { Consts } from "../sketch";

export class ScrollViewer {
    position: Point2D;
    size: Point2D;
    scrollbar: Scrollbar;

    constructor(position: Point2D, size: Point2D) {
        this.position = position;
        this.size = size;
        this.scrollbar = new Scrollbar(new Point2D(position.x, position.y), new Point2D(50, 10), size.y);
        Consts.mediator.on('onMouseDragged', (position: Point2D) => {
            let visualPosition = new Point2D(position.x - (Consts.p.windowWidth / 2),
                                                position.y - (Consts.p.windowHeight / 2));
            console.log(this.scrollbar.intersects(visualPosition));
            if(Consts.p.mouseIsPressed && this.scrollbar.intersects(visualPosition))
            {
                let oldValue = visualPosition.y;
                let oldMax = Consts.p.windowHeight;
                let oldMin = 0;
                let newMax = this.scrollbar.maxHeight;
                let newMin = 0;

                if(oldMax - oldMin === 0)
                    return;

                let newValue = (((oldValue - oldMin) * (newMax - newMin)) / (oldMax - oldMin)) + visualPosition.y;
                this.scrollbar.setHeight(newValue);
            }
        });
    }

    display() : void {
        Consts.p.push();
        Consts.p.fill('#333');
        Consts.p.rect(this.position.x, this.position.y, this.size.x, this.size.y);
        Consts.p.pop();
        this.scrollbar.display();
    }
}