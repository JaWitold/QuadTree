class Point{
    constructor(x,y)
    {
        this.x = x
        this.y = y
    }
}

class Rectangle extends Point
{
    constructor(x, y, w, h)
    {
        super(x, y);
        this.w = w
        this.h = h
    }

    contains(point)
    {
        return (
            point.x >= this.x - this.w &&
            point.x < this.x + this.w &&
            point.y >= this.y - this.h &&
            point.y < this.y + this.h
    )}

    intersects(range)
    {
        return !(
            range.x - range.w > this.x + this.w ||
            range.x + range.w < this.x - this.w ||
            range.y - range.h > this.y + this.h ||
            range.y + range.h < this.y - this.h
        )
    }   
}

class Circle extends Point
{
    constructor(x, y, r)
    {
        super(x, y);
        this.r = r
    }

    contains(point){
        return(dist(this.x, this.y, point.x, point.y) < this.r)
    }

    intersects(range)
    {
        return !(
            range.x - range.w > this.x + this.r ||
            range.x + range.w < this.x - this.r ||
            range.y - range.h > this.y + this.r ||
            range.y + range.h < this.y - this.r
        )
    } 
}

class QuadTree {
    constructor(boundary, n)
    {
        this.boundary = boundary
        this.capacity = n
        this.points = []
        this.divided = false
    }

    subdivide()
    {
        this.nw = new QuadTree(new Rectangle(this.boundary.x - this.boundary.w / 2, this.boundary.y - this.boundary.h / 2, this.boundary.w/2, this.boundary.h/2), this.capacity)
        this.ne = new QuadTree(new Rectangle(this.boundary.x + this.boundary.w / 2, this.boundary.y - this.boundary.h / 2, this.boundary.w/2, this.boundary.h/2), this.capacity)
        this.sw = new QuadTree(new Rectangle(this.boundary.x - this.boundary.w / 2, this.boundary.y + this.boundary.h / 2, this.boundary.w/2, this.boundary.h/2), this.capacity)
        this.se = new QuadTree(new Rectangle(this.boundary.x + this.boundary.w / 2, this.boundary.y + this.boundary.h / 2, this.boundary.w/2, this.boundary.h/2), this.capacity)
        this.divided = true
    }

    insert(point)
    {   
        if(!this.boundary.contains(point))
        {
            return false;
        }else if(this.points.length < this.capacity)
        {
            this.points.push(point)
            return true
        } else 
        {
            if(!this.divided){
                this.subdivide()
            }
            this.nw.insert(point)
            this.ne.insert(point)   
            this.sw.insert(point)  
            this.se.insert(point)  
        }
    }

    query(range)
    {
        let found = [];
        if(!range.intersects(this.boundary))
        {
            return found;
        } else {
            for (let p of this.points)
            {
                if(range.contains(p))
                {
                    found.push(p)
                }
            }
        }

        if(this.divided)
        {
            found = found.concat(this.nw.query(range))
            found = found.concat(this.ne.query(range))
            found = found.concat(this.sw.query(range))
            found = found.concat(this.se.query(range))
        }

        return found
    }
}