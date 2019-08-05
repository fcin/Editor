class Plane extends Geometry
{
    position : Point3D;
    size :Point2D;

    constructor(position: Point3D, size: Point2D)
    {
        super(position);
        this.position = position;
        this.size = size;
    }

    display(): void {
        let translateX = this.position.x + (this.size.x / 2) - width / 2;
        let translateY = this.position.y + (this.size.y / 2) - height / 2;
        let translateZ = this.position.z;
        translate(translateX, translateY, translateZ);
        ambientMaterial(120, 150, 255);
        ambientLight(255,0,0);
        plane(this.size.x, this.size.y);
    }
    
    intersects(point: Point2D) : boolean
    {
        if(point.x >= this.position.x && point.x <= this.position.x + this.size.x)
        {
            if(point.y >= this.position.y && point.y <= this.position.y + this.size.y)
            {
                return true;
            }
        }

        return false;
    }

    highlight() : void
    {
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