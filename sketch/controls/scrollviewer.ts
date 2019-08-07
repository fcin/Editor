class ScrollViewer {
    position: Point2D;
    size: Point2D;
    scrollbar: Scrollbar;

    constructor(position: Point2D, size: Point2D) {
        this.position = position;
        this.size = size;
        this.scrollbar = new Scrollbar(position, new Point2D(50, 10));
    }

    display() : void {
        push();
        fill('#333');
        rect(this.position.x, this.position.y, this.size.x, this.size.y);
        pop();
        this.scrollbar.display();
    }
}