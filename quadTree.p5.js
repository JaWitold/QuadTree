class Rectanglep5 extends Rectangle
{
    constructor(x, y, w, h)
    {
        super(x, y, w, h)
    }

    show()
    {
        rectMode(CENTER)
        stroke(30, 240, 50)
        strokeWeight(0.5)
        noFill()
        rect(this.x, this.y, this.w*2, this.h*2)
    }
}

class Circlep5 extends Circle
{
    constructor(x, y, r)
    {
        super(x, y, r)
    }

    show()
    {
        stroke(30, 50, 240)
        strokeWeight(0.5)
        noFill()
        circle(this.x, this.y, this.r*2)
    }
}

class QuadTreep5 extends QuadTree
{
    constructor(boundary, n)
    {
        super(boundary, n)
    }

    subdivide()
    {
        this.nw = new QuadTreep5(new Rectangle(this.boundary.x - this.boundary.w/2, this.boundary.y - this.boundary.h/2, this.boundary.w/2, this.boundary.h/2), this.capacity)
        this.ne = new QuadTreep5(new Rectangle(this.boundary.x + this.boundary.w/2, this.boundary.y - this.boundary.h/2, this.boundary.w/2, this.boundary.h/2), this.capacity)
        this.sw = new QuadTreep5(new Rectangle(this.boundary.x - this.boundary.w/2, this.boundary.y + this.boundary.h/2, this.boundary.w/2, this.boundary.h/2), this.capacity)
        this.se = new QuadTreep5(new Rectangle(this.boundary.x + this.boundary.w/2, this.boundary.y + this.boundary.h/2, this.boundary.w/2, this.boundary.h/2), this.capacity)
        this.divided = true
    }

    show()
    {
        // stroke(255)
        // strokeWeight(1)
        // noFill()
        // rectMode(CENTER);
        // rect(this.boundary.x, this.boundary.y, this.boundary.w*2, this.boundary.h*2)

        if(this.divided){
            this.nw.show()
            this.ne.show()
            this.sw.show()
            this.se.show()
        }

        this.drawPoints(this.points)
    }

    drawPoints(points)
    {
        for(let p of this.points)
        {
            stroke(230, 0, 120)
            strokeWeight(2)
            point(p.x, p.y)
        }
    }
}