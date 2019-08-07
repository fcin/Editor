abstract class CollapsablePanel {

    protected position: Point2D;
    protected size: Point2D;

    constructor(position: Point2D, size: Point2D) {
        this.position = position;
        this.size = size;
    }

    abstract addItem(item: CollapsableItem) : void

    abstract display(): void
}