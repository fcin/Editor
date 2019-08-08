import { Point2D } from "../geometry";
import { CollapsableItem } from "../abstractions/collapsableItem";
import { CollapsablePanel } from "../abstractions/collapsablePanel";
import { Consts } from "../sketch";

export class Timeline extends CollapsablePanel {

    items: CollapsableItem[] = [];

    constructor (position: Point2D, size: Point2D) {
        super(position, size);
        this.position = position;
        this.size = size;
    }

    addItem(item: CollapsableItem): void {
        item.move(this.position);
        this.items.push(item);
    }    
    
    display(): void {
        Consts.p.color(255, 255, 255);
        Consts.p.rect(this.position.x, this.position.y, this.size.x, this.size.y);

        this.items.forEach(item => item.display());
    }
}