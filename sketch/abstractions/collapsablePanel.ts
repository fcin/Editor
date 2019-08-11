import { Point2D } from "../geometry";
import { CollapsableItem } from "./collapsableItem";
import { UIItem } from "./uiItem";

export abstract class CollapsablePanel implements UIItem {

    public position: Point2D;
    public size: Point2D;

    constructor(position: Point2D, size: Point2D) {
        this.position = position;
        this.size = size;
    }

    abstract addItem(item: CollapsableItem) : void
    abstract display(): void
    abstract setPosition(position: Point2D): void;
    abstract scroll(amount: Point2D): void;
}