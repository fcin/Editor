import { Point2D } from "../geometry";
import { CollapsableItem } from "../abstractions/collapsableItem";
import { Consts } from "../sketch";

export class TimelineItem extends CollapsableItem {

    name: string;

    constructor(name: string, position: Point2D, size: Point2D)
    {
        super(position, size);
        this.name = name;
        this.position = position;
        this.size = size;
    }

    display(): void {
        const fontSize = 18;
        Consts.p.push();
        Consts.p.fill('#EEE');
        Consts.p.rect(this.position.x, this.position.y, this.size.x, this.size.y);

        Consts.p.fill('#000');
        Consts.p.textSize(fontSize);
        Consts.p.textFont(Consts.basicFont);
        Consts.p.textAlign(Consts.p.LEFT, Consts.p.BOTTOM);
        Consts.p.text(this.name, this.position.x + 10, this.position.y + fontSize);
        Consts.p.pop();
    }
    
    move(position: Point2D) : void
    {
        this.position.x += position.x;
        this.position.y += position.y;
    }
}