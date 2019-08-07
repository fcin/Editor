class Scrollbar {

    position: Point2D;
    size: Point2D;

    constructor(position: Point2D, size: Point2D) {
        this.position = position;
        this.size = size;
    }

    display(): void {
        push();
        fill('#AA0AA0');
        rect(this.position.x, this.position.y, 50, 10);
        pop();
    }

    setMaxHeight(height: number) {

    }
}