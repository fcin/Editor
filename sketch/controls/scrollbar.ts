import { Point2D } from "../geometry";
import { Consts } from "../sketch";

export class Scrollbar {

    position: Point2D;
    size: Point2D;
    maxHeight: number;
    currentHeight: number;
    rodSize: Point2D;

    constructor(position: Point2D, size: Point2D, rodHeight: number) {
        this.position = position;
        this.size = size;
        this.maxHeight = this.size.y;
        this.currentHeight = 0;
        this.rodSize = new Point2D(this.size.x, this.size.y + rodHeight - this.size.y);
    }

    display(): void {
        Consts.p.push();
        Consts.p.fill('#AA0AA0');
        Consts.p.rect(this.position.x, this.position.y + this.currentHeight, this.size.x, this.size.y);
        Consts.p.pop();
    }

    setHeight(height: number): void {
        this.currentHeight = height;
            
    }

    intersects(point: Point2D): boolean {
        if (point.x >= this.position.x && point.x <= this.position.x + this.rodSize.x) {
            if (point.y >= this.position.y && point.y <= this.position.y + this.rodSize.y) {
                return true;
            }
        }

        return false;
    }
}