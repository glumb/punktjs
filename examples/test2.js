import { Circle, Path, Point, Shape, Group } from '../src/index'
import { TerminalRenderer as Renderer } from '../src/TerminalRenderer'


// Source: http://blog.hackers-cafe.net/2009/06/how-to-calculate-bezier-curves-bounding.html
// Original version: NISHIO Hirokazu
// Modifications: Timo

var pow = Math.pow,
    sqrt = Math.sqrt,
    min = Math.min,
    max = Math.max,
    abs = Math.abs;

function getBoundsOfCurve(x0, y0, x1, y1, x2, y2, x3, y3) {
    var tvalues = new Array();
    var bounds = [new Array(), new Array()];
    var points = new Array();

    var a, b, c, t, t1, t2, b2ac, sqrtb2ac;
    for (var i = 0; i < 2; ++i) {
        if (i == 0) {
            b = 6 * x0 - 12 * x1 + 6 * x2;
            a = -3 * x0 + 9 * x1 - 9 * x2 + 3 * x3;
            c = 3 * x1 - 3 * x0;
        }
        else {
            b = 6 * y0 - 12 * y1 + 6 * y2;
            a = -3 * y0 + 9 * y1 - 9 * y2 + 3 * y3;
            c = 3 * y1 - 3 * y0;
        }

        if (abs(a) < 1e-12) // Numerical robustness
        {
            if (abs(b) < 1e-12) // Numerical robustness
            {
                continue;
            }
            t = -c / b;
            if (0 < t && t < 1) {
                tvalues.push(t);
            }
            continue;
        }
        b2ac = b * b - 4 * c * a;
        sqrtb2ac = sqrt(b2ac);
        if (b2ac < 0) {
            continue;
        }
        t1 = (-b + sqrtb2ac) / (2 * a);
        if (0 < t1 && t1 < 1) {
            tvalues.push(t1);
        }
        t2 = (-b - sqrtb2ac) / (2 * a);
        if (0 < t2 && t2 < 1) {
            tvalues.push(t2);
        }
    }

    var x, y, j = tvalues.length,
        jlen = j,
        mt;
    while (j--) {
        t = tvalues[j];
        mt = 1 - t;
        x = (mt * mt * mt * x0) + (3 * mt * mt * t * x1) + (3 * mt * t * t * x2) + (t * t * t * x3);
        bounds[0][j] = x;

        y = (mt * mt * mt * y0) + (3 * mt * mt * t * y1) + (3 * mt * t * t * y2) + (t * t * t * y3);
        bounds[1][j] = y;
        points[j] = {
            X: x,
            Y: y
        };
    }

    tvalues[jlen] = 0;
    tvalues[jlen + 1] = 1;
    points[jlen] = {
        X: x0,
        Y: y0
    };
    points[jlen + 1] = {
        X: x3,
        Y: y3
    };
    bounds[0][jlen] = x0;
    bounds[1][jlen] = y0;
    bounds[0][jlen + 1] = x3;
    bounds[1][jlen + 1] = y3;
    tvalues.length = bounds[0].length = bounds[1].length = points.length = jlen + 2;

    return {
        left:    min.apply(null, bounds[0]),
        top:     min.apply(null, bounds[1]),
        right:   max.apply(null, bounds[0]),
        bottom:  max.apply(null, bounds[1]),
        points:  points, // local extremes
        tvalues: tvalues // t values of local extremes
    };
};

// Usage:
var bounds = getBoundsOfCurve(532, 333, 117, 305, 28, 93, 265, 42);
//console.log(JSON.stringify(bounds));
// Prints: {"left":135,"top":42,"right":532,"bottom":333,"points":[{"X":135.77684049079755,"Y":144.86387466397255},{"X":532,"Y":333},{"X":265,"Y":42}],"tvalues":[0.6365030674846626,0,1]}

var group = new Group([3,3])

var handle0 = new Point([0, 20])
var handle1 = new Point([0, 20])
var segment0 = new Path.Segment([0, 0], [0, 0], handle0)
var segment1 = new Path.Segment([30, 0], handle1, [0, 0])
var path = new Path([segment0, segment1]);
var bb = path.getBoundingBox$()

group.addChild(path)

var renderer = new Renderer()
renderer.attach(path)

renderer.attachAll(bb, {color: [239, 123, 22]})
renderer.attachAll(path.getBoundingBox(), {color: [239, 123, 222]})

var bounds2 = getBoundsOfCurve(0, 0, 0, 20, 30, 20, 30, 0);
//console.log(JSON.stringify(bounds2));


moveObject(group)
renderer.attach(path.getSegments()[0]._handleOut, {color: [139, 223, 22]})
renderer.attach(path.getSegments()[1]._handleIn, {color: [139, 223, 22]})
renderer.debug = true

function moveObject(obj) {
    var stdin = process.stdin;
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');

    stdin.on('data', function (key) {
        if (key === '[C') {
            //console.log('right');
            obj.position.x += 1
        } else if (key === '[A') {
            //console.log('top');
            obj.position.y += 1
        } else if (key == '[D') {
            //console.log('left');
            obj.position.x -= 1
        } else if (key == '[B') {
            //console.log('down');
            obj.position.y -= 1
        } else if (key == 'r') {
            //console.log(key)
            obj.rotation += 15
        }


        if (key == '' || key == 'q') {
            process.exit();
        }    // ctrl-c
        if (key == 'd') {
            renderer.debug = !renderer.debug;
        }
        renderer.render()
    });
}
renderer.render()
