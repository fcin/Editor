import { Point2D } from "../geometry";

export abstract class CollapsableItem {

    public position: Point2D;
    public size: Point2D;

    constructor(position: Point2D, size: Point2D) {
        this.position = position;
        this.size = size;
    }

    abstract display(): void;
    abstract move(position: Point2D): void;
}