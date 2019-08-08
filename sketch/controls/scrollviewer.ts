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
        this.scrollbar = new Scrollbar(position, new Point2D(50, 10));
    }

    display() : void {
        Consts.p.push();
        Consts.p.fill('#333');
        Consts.p.rect(this.position.x, this.position.y, this.size.x, this.size.y);
        Consts.p.pop();
        this.scrollbar.display();
    }
}