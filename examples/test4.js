import { Circle } from '../src/index'
import { TerminalRenderer as Renderer } from '../src/TerminalRenderer'

var circle = new Circle([5, 30], 10)
var circle2 = new Circle([20, 20], 10)

var renderer = new Renderer()
renderer.attachAll([circle, circle2], {color: [12, 44, 222]})
renderer.debug = false

var intersec = null
var t = 1

setInterval(()=> {
    circle.x += t
    circle.y = 30 - 3 / 4 * circle.x
    if (circle.x >= 40) {
        t = -2
    } else if (circle.x < 10) {
        t = 1
    }

    var inters = circle.intersect(circle2)
    renderer.detachAll(intersec)
    if (inters.isIntersection()) {
        circle._style.color = [255, 12, 33]
        intersec = renderer.attachAll(inters.points, {color: [255, 160, 23], char: '*'})
    } else {
        circle._style.color = [25, 252, 33]
    }

    renderer.render()
}, 100)

renderer.render()
