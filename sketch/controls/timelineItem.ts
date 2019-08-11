import { Point2D } from "../geometry";
import { CollapsableItem } from "../abstractions/collapsableItem";
import { Consts } from "../sketch";
import { UIItem } from '../abstractions/uiItem';
import { Scrollable } from '../abstractions/scrollable';

export class TimelineItem extends CollapsableItem implements UIItem, Scrollable {
    name: string;
    container:UIItem;

    constructor(name: string, position: Point2D, size: Point2D, container: UIItem)
    {
        super(position, size);
        this.name = name;
        this.position = position;
        this.size = size;
        this.container = container;
    }

    display(): void {
        const fontSize = 18;
        Consts.p.fill('#EEE');
        Consts.p.rect(this.position.x, this.position.y, this.size.x, this.size.y);

        Consts.p.fill('#000');
        Consts.p.textSize(fontSize);
        Consts.p.textFont(Consts.basicFont);
        Consts.p.textAlign(Consts.p.LEFT, Consts.p.BOTTOM);
        Consts.p.text(this.name, this.position.x + 10, this.position.y + fontSize);
    }
    
    move(position: Point2D) : void
    {
        this.position.x += position.x;
        this.position.y += position.y;
    }

    setPosition(position: Point2D): void {
        this.position = position;
    }

    scroll(amount: Point2D): void {
        let containerY = this.container.position.y;
        let containerMaxY = this.container.position.y + this.container.size.y;
        let newPosY = (containerMaxY - containerY) / amount.y;
        this.position.y = newPosY + (this.position.y * Math.sign(amount.y));
    }
}