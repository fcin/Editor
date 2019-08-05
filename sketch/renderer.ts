class Renderer {
    private readonly geometries: Geometry[] = [];
    private readonly tracer: RayTracer;

    constructor() {
        let p: Plane = new Plane(new Point3D(50, 50, 0), new Point2D(50, 50));
        this.geometries.push(p);
        let p2: Plane = new Plane(new Point3D(70, 70, 0), new Point2D(50, 50));
        this.geometries.push(p2);
        this.tracer = new RayTracer(this.geometries);
    }

    render(): void {
        this.geometries.forEach(element => {
            element.display();
            if (element.isHighlighted) {
                element.highlight();
            }
        });
    }

    onMouseClicked(position: Point2D): void {
        if (!this.geometries.some(geom => geom.isHighlighted)) {
            var hit = this.tracer.trace(position);
            if (hit !== null)
                hit.highlight();
            else
                this.geometries.forEach(geom => geom.isHighlighted = false);
        }
        else {
            this.geometries.forEach(geom => geom.isHighlighted = false);
        }
    }

    onMouseDragged(position: Point2D): void {
        this.geometries.filter(geom => geom.isHighlighted).forEach(geom => {
            geom.setPosition(position);
        });
    }
}