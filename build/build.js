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
        this.tracer = new RayTracer(this.geometries);
    }
    render() {
        this.geometries.forEach(element => {
            element.display();
        });
    }
    onMouseClicked(position) {
        var hit = this.tracer.trace(position);
        if (hit !== null)
            hit.highlight();
    }
}
function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
let r;
function draw() {
    frameRate(0);
    background(200);
    r = new Renderer();
    r.render();
}
function mouseClicked() {
    r.onMouseClicked(new Point2D(mouseX, mouseY));
}
class Plane extends Geometry {
    constructor(position, size) {
        super(position);
        this.position = position;
        this.size = size;
    }
    display() {
        let translateX = this.position.x + (this.size.x / 2) - width / 2;
        let translateY = this.position.y + (this.size.y / 2) - height / 2;
        let translateZ = this.position.z;
        translate(translateX, translateY, translateZ);
        ambientMaterial(120, 150, 255);
        ambientLight(255, 0, 0);
        plane(this.size.x, this.size.y);
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
        console.log('HIGHLIGHT');
        let borderSize = 4;
        push();
        let x = this.position.x - this.size.x - borderSize / 4;
        let y = this.position.y - this.size.y;
        translate(x, y, -1);
        ambientMaterial(70, 130, 230);
        plane(this.size.x + borderSize, this.size.y + borderSize);
        pop();
    }
}
//# sourceMappingURL=build.js.map