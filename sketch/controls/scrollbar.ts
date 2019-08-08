import { Point2D } from "../geometry";
import { Consts } from "../sketch";

export class Scrollbar {

    position: Point2D;
    size: Point2D;

    constructor(position: Point2D, size: Point2D) {
        this.position = position;
        this.size = size;
    }

    display(): void {
        Consts.p.push();
        Consts.p.fill('#AA0AA0');
        Consts.p.rect(this.position.x, this.position.y, 50, 10);
        Consts.p.pop();
    }

    setMaxHeight(height: number) {

    }
}