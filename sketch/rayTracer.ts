class RayTracer {

    private readonly geometries : Geometry[];

    constructor(geometries: Geometry[]) {
        this.geometries = geometries;
    }

    public trace(point: Point2D) : Geometry
    {
        var intersectingGeometries = this.geometries.filter(g => g.intersects(point));
        let maxZ = -1000;
        let maxZIndex = -1;
        for(let i = 0; i < intersectingGeometries.length; i++)
        {
            if(intersectingGeometries[i].position.z > maxZ)
            {
                maxZ = intersectingGeometries[i].position.z;
                maxZIndex = i;
            }
        }

        if(maxZIndex === -1)
            return null;

        return intersectingGeometries[maxZIndex];
    }

}