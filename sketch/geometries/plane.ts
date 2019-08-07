class Plane extends Geometry {
    position: Point3D;
    size: Point2D;

    constructor(position: Point3D, size: Point2D) {
        super(position);
        this.position = position;
        this.size = size;
        this.isHighlighted = false;
    }

    display(): void {
        let translateX = this.position.x + (this.size.x / 2) - width / 2;
        let translateY = this.position.y + (this.size.y / 2) - height / 2;
        let translateZ = this.position.z;
        push();
        translate(translateX, translateY, translateZ);
        applyMatrix(0, 1, 1, 0, 0, 0);
        ambientMaterial(120, 150, 255);
        ambientLight(255, 0, 0);
        plane(this.size.x, this.size.y);
        pop();
    }

    intersects(point: Point2D): boolean {
        if (point.x >= this.position.x && point.x <= this.position.x + this.size.x) {
            if (point.y >= this.position.y && point.y <= this.position.y + this.size.y) {
                return true;
            }
        }

        return false;
    }

    highlight(): void {
        
        if(this.isHighlighted === false)
            this.isHighlighted = true;

        if (this.isHighlighted) {
            let borderSize = 4;

            push();
            let x = this.position.x - this.size.x - borderSize / 4;
            let y = this.position.y - this.size.y;
            let translateX = this.position.x + (this.size.x / 2) - width / 2;
            let translateY = this.position.y + (this.size.y / 2) - height / 2;
            let translateZ = this.position.z;
            translate(translateX, translateY, translateZ - 1);
            applyMatrix(0, 1, 1, 0, 0, 0);
            color(70, 130, 230);
            plane(this.size.x + borderSize, this.size.y + borderSize);
            pop();
        }
    }

    setPosition(position: Point2D) : void
    {
        if(this.isHighlighted)
        {
            this.position.x = position.x;
            this.position.y = position.y;
        }
    }
}