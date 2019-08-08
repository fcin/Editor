import { Plane } from "./geometries/plane";
import { RayTracer } from "./rayTracer";
import { Geometry } from "./geometry";
import { Timeline } from "./controls/timeline";
import { ScrollViewer } from "./controls/scrollviewer";
import { Point3D, Point2D } from "./geometry";
import { Consts } from "./sketch";
import { TimelineItem } from "./controls/timelineItem";

export class Renderer {
    private readonly geometries: Geometry[] = [];
    private readonly tracer: RayTracer;
    private readonly timeline: Timeline;
    private readonly scrollviewer: ScrollViewer;

    constructor() {
        let p: Plane = new Plane(new Point3D(50, 50, 0), new Point2D(50, 50));
        this.geometries.push(p);
        let p2: Plane = new Plane(new Point3D(70, 70, -1), new Point2D(50, 50));
        this.geometries.push(p2);
        this.tracer = new RayTracer(this.geometries);
        this.timeline = new Timeline(new Point2D(-Consts.p.width/2, Consts.p.height/2 - 100), new Point2D(Consts.p.width, 100));
        let item1 = new TimelineItem("plane1", new Point2D(0, 0), new Point2D(100, 50));
        this.timeline.addItem(item1);
        this.scrollviewer = new ScrollViewer(new Point2D(0, 0), new Point2D(50, 50));
        console.log(this.scrollviewer.position);
    }

    render(): void {
        this.timeline.display();
        this.geometries.forEach(element => {
            element.display();
            if (element.isHighlighted) {
                element.highlight();
            }
        });
        this.scrollviewer.display();
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