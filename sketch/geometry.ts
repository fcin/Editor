abstract class Geometry {
    position = new Point3D(0, 0, 0);
    isHighlighted: boolean;

    constructor(position: Point3D) {
        this.position = position;
    }

    abstract display(): void;
    abstract intersects(point: Point2D): boolean;
    abstract highlight(): void;
    abstract setPosition(position: Point2D) : void;
}

class Point2D {
    x: number = 0;
    y: number = 0;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

class Point3D {
    x: number = 0;
    y: number = 0;
    z: number = 0;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}