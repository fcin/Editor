class Renderer
 {
    private readonly geometries : Geometry[] = [];
    private readonly tracer: RayTracer;

    constructor() {
        let p : Plane = new Plane(new Point3D(50, 50, 0), new Point2D(50, 50));   
        this.geometries.push(p);
        this.tracer = new RayTracer(this.geometries);
    }

    render() : void
    {
        this.geometries.forEach(element => {
            element.display();
        });
    }

    onMouseClicked(position: Point2D) : void
    {
        var hit = this.tracer.trace(position);
        if(hit !== null)
            console.log(hit.position);
    }
}