import { Circle, Path, Point, Group } from '../src/index'
import { TerminalRenderer as Renderer } from '../src/TerminalRenderer'


//console.log(circle.center)
//console.log(circle.center.addSelf(new Point([20, 18])))
//
//console.log(circle.intersect(circle2))
//
//console.log(circle.radius)
//console.log(circle.area)
//console.log(circle.area = 110)
//console.log(circle.radius)


//drawElipsisAngle(40, 11, 4, 2,1.5, [13, 88, 140])
//drawRectangle({position: {x: 5, y: 14}}, [52, 109, 158])
//drawCoordinateSystem(circle.center.x, circle.center.y, 0, 8, true)
//drawCircle(circle, [0, 255, 0]);
//drawCircle(circle2, [255, 0, 0]);
//drawElipsis(20, 11, 4, 4, [13, 88, 140])

//drawCircle2(new Circle([30, 12], 5), [245, 133, 67])
//drawCircle(new Circle([11, 12], 5), [15, 133, 67])
//drawPoint(2, 2, [155, 14, 222])
//drawCircle2(new Circle([50, 13], 5), [245, 133, 67])

//var ci = new Circle([width*2/3, height*2/3], 5);
//var ci2 = new Circle([width*1/3, height*1/3], 5);
//var dir = {x: 1, y: 1};
//var dir2 = {x: -1, y: 0.5};
//setInterval(function () {
//    ctx.clear();
//    var inters = ci.intersect(ci2);
//    console.log(inters)
//    var isInters = inters.isIntersection();
//    if (isInters || ci.center.x + ci.radius >= width || ci.center.x - ci.radius <= 0)
//        dir.x *= -1;
//    if (isInters || ci.center.y + ci.radius >= height * 2 || ci.center.y - ci.radius <= 0)
//        dir.y *= -1;
//    if (isInters || ci2.center.x + ci2.radius >= width || ci2.center.x - ci2.radius <= 0)
//        dir2.x *= -1;
//    if (isInters || ci2.center.y + ci2.radius >= height * 2 || ci2.center.y - ci2.radius <= 0)
//        dir2.y *= -1;
//
//    ci.position.x += dir.x;
//    ci.position.y += dir.y;
//    ci2.position.x += dir2.x;
//    ci2.position.y += dir2.y;
//    if (ci.radius < 10)
//        ci.radius++;
//    //console.log(ci)
//    drawCircle2(ci, [245, 133, 67])
//    drawCircle2(ci2, [145, 133, 237])
//    ctx.cursor.restore();
//}, 100)


//renderer.attach(new Circle([10, 10], 6), {color: [32, 240, 56]})

//renderer.attach(circle, {color: [234, 233, 12], char: '*'})


var dir = {x: .5, y: 1.5}

//setInterval(function () {
//    if (circle.center.x + circle.radius >= width || circle.center.x - circle.radius <= 0)
//        dir.x *= -1;
//    if (circle.center.y + circle.radius >= height * 2 - 8 || circle.center.y - circle.radius <= 0)
//        dir.y *= -1;
//
//
//    circle.position.x += dir.x;
//    circle.position.y += dir.y;
//
//    renderer.render()
//
//    //renderer.drawCoordinateSystem(circle.position.x, circle.position.y, 0, 10)
//    //renderer.drawCoordinateSystem(circle2.position.x, circle2.position.y, 0, 10)
//
//    //renderer.render(new Point(circle.center.x, 1), {color: [234, 233, 12]})
//    //renderer.render(new Point(1, circle.center.y), {color: [234, 233, 12]})
//}, 500)
//todo add children to named object children:{ center: Point, boundingBox: [Point, Point]}


var path = new Path([[3, 5], [10, 12], [20, 12], [40, 42]])
var renderer = new Renderer()
renderer.debug = false

var circle2 = new Circle([10, 5], 10)

renderer.attach(path, {color: [20, 40, 203]})
renderer.attach(circle2, {color: [200, 30, 23]})
circle2.center = [10, 10]

//var bb = circle2.getBoundingBox()
//renderer.attach(bb[0])
//renderer.attach(bb[1])
//renderer.attach(bb[2])
//renderer.attach(bb[3])
var group = new Group([10, 10], 30)
var group2 = new Group([20, 20], 45)
group.addChild(circle2)
group2.addChild(group)


renderer.attach(group, {color: [122, 222, 56]})
renderer.attach(group2, {color: [222, 222, 56]})
moveObject(path)

setInterval(function () {
    path.rotation -= 1
    group2.rotation += 2
    circle2.rotation += 1

    renderer.render()
}, 150)


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
