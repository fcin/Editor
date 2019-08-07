class Geometry {
    constructor(position) {
        this.position = new Point3D(0, 0, 0);
        this.position = position;
    }
}
class Point2D {
    constructor(x, y) {
        this.x = 0;
        this.y = 0;
        this.x = x;
        this.y = y;
    }
}
class Point3D {
    constructor(x, y, z) {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.x = x;
        this.y = y;
        this.z = z;
    }
}
class RayTracer {
    constructor(geometries) {
        this.geometries = geometries;
    }
    trace(point) {
        var intersectingGeometries = this.geometries.filter(g => g.intersects(point));
        let maxZ = -1000;
        let maxZIndex = -1;
        for (let i = 0; i < intersectingGeometries.length; i++) {
            if (intersectingGeometries[i].position.z > maxZ) {
                maxZ = intersectingGeometries[i].position.z;
                maxZIndex = i;
            }
        }
        if (maxZIndex === -1)
            return null;
        return intersectingGeometries[maxZIndex];
    }
}
class Renderer {
    constructor() {
        this.geometries = [];
        let p = new Plane(new Point3D(50, 50, 0), new Point2D(50, 50));
        this.geometries.push(p);
        let p2 = new Plane(new Point3D(70, 70, -1), new Point2D(50, 50));
        this.geometries.push(p2);
        this.tracer = new RayTracer(this.geometries);
        this.timeline = new Timeline(new Point2D(-width / 2, height / 2 - 100), new Point2D(width, 100));
        let item1 = new TimelineItem("plane1", new Point2D(0, 0), new Point2D(100, 50));
        this.timeline.addItem(item1);
        this.scrollviewer = new ScrollViewer(new Point2D(0, 0), new Point2D(50, 50));
        console.log(this.scrollviewer.position);
    }
    render() {
        this.timeline.display();
        this.geometries.forEach(element => {
            element.display();
            if (element.isHighlighted) {
                element.highlight();
            }
        });
        this.scrollviewer.display();
    }
    onMouseClicked(position) {
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
    onMouseDragged(position) {
        this.geometries.filter(geom => geom.isHighlighted).forEach(geom => {
            geom.setPosition(position);
        });
    }
}
class Consts {
}
let renderer;
function preload() {
    Consts.basicFont = loadFont("https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Bold.otf");
}
function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    renderer = new Renderer();
    Consts.canvasCenter = new Point2D(width, height);
    frameRate(30);
    background(200);
    renderer.render();
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function draw() {
    background(200);
    renderer.render();
}
function mouseClicked() {
    renderer.onMouseClicked(new Point2D(mouseX, mouseY));
    console.log(mouseX);
}
function mouseDragged() {
    renderer.onMouseDragged(new Point2D(mouseX, mouseY));
}
class CollapsableItem {
    constructor(position, size) {
        this.position = position;
        this.size = size;
    }
}
class CollapsablePanel {
    constructor(position, size) {
        this.position = position;
        this.size = size;
    }
}
class Scrollbar {
    constructor(position, size) {
        this.position = position;
        this.size = size;
    }
    display() {
        push();
        fill('#AA0AA0');
        rect(this.position.x, this.position.y, 50, 10);
        pop();
    }
    setMaxHeight(height) {
    }
}
class ScrollViewer {
    constructor(position, size) {
        this.position = position;
        this.size = size;
        this.scrollbar = new Scrollbar(position, new Point2D(50, 10));
    }
    display() {
        push();
        fill('#333');
        rect(this.position.x, this.position.y, this.size.x, this.size.y);
        pop();
        this.scrollbar.display();
    }
}
class Timeline extends CollapsablePanel {
    constructor(position, size) {
        super(position, size);
        this.items = [];
        this.position = position;
        this.size = size;
    }
    addItem(item) {
        item.move(this.position);
        this.items.push(item);
    }
    display() {
        color(255, 255, 255);
        rect(this.position.x, this.position.y, this.size.x, this.size.y);
        this.items.forEach(item => item.display());
    }
}
class TimelineItem extends CollapsableItem {
    constructor(name, position, size) {
        super(position, size);
        this.name = name;
        this.position = position;
        this.size = size;
    }
    display() {
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
    move(position) {
        this.position.x += position.x;
        this.position.y += position.y;
    }
}
class Plane extends Geometry {
    constructor(position, size) {
        super(position);
        this.position = position;
        this.size = size;
        this.isHighlighted = false;
    }
    display() {
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
    intersects(point) {
        if (point.x >= this.position.x && point.x <= this.position.x + this.size.x) {
            if (point.y >= this.position.y && point.y <= this.position.y + this.size.y) {
                return true;
            }
        }
        return false;
    }
    highlight() {
        if (this.isHighlighted === false)
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
    setPosition(position) {
        if (this.isHighlighted) {
            this.position.x = position.x;
            this.position.y = position.y;
        }
    }
}
//# sourceMappingURL=build.js.map