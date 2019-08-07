class TimelineItem extends CollapsableItem {

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
        push();
        fill('#EEE');
        rect(this.position.x, this.position.y, this.size.x, this.size.y);

        fill('#000');
        textSize(fontSize);
        textFont(Consts.basicFont);
        textAlign(LEFT, BOTTOM);
        text(this.name, this.position.x + 10, this.position.y + fontSize);
        pop();
    }
    
    move(position: Point2D) : void
    {
        this.position.x += position.x;
        this.position.y += position.y;
    }
}