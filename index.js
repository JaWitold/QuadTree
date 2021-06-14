const hmPoints = 1000;
let qt
let Rec, Cir

let off = 0

function setup()
{
    createCanvas(640, 480);
    background(0);
    const boundary = new Rectangle(width/2, height/2, width/2, height/2)

    qt = new QuadTreep5(boundary, 4)
 
    Rec = new Rectanglep5(random(width), random(height), 50, 50)
    Cir = new Circlep5(random(width), random(height), 50)

    autogeneratePoints(hmPoints, qt)
}

function draw()
{
    background(0)
    
    qt.show()
    Cir.show()
    Rec.show()

    Cir.x = noise(off + 100) * width
    Cir.y = noise(off + 200) * height
    
    Rec.x = noise(off + 300) * width
    Rec.y = noise(off + 400) * height

    let pointsR = qt.query(Cir)
    for(let p of pointsR)
    {
        strokeWeight(2)
        stroke(30, 50, 240)
        point(p.x, p.y)
    }

    let pointsC = qt.query(Rec)
    for(let p of pointsC)
    {
        if(pointsR.find(pR => p === pR)){
            
            stroke(255)
        }
        else
        {
            stroke(30, 240, 50)
        }
        strokeWeight(2)
        point(p.x, p.y)
    }       

    off += 0.007
}

function mouseDragged()
{
    for(let i = 0; i < 1; i++){
        const p = new Point(mouseX + random(-10, 10), mouseY + random(-10, 10))
        qt.insert(p)
    }
}


function autogeneratePoints(hm, qt)
{
for(let i = 0; i < hm; i++)
    {
        const p = new Point(random(width), random(height))
        qt.insert(p)
    }
}