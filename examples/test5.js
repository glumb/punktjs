import { Circle, Path } from '../src/index'
import { TerminalRenderer as Renderer } from '../src/TerminalRenderer'

var c1 = new Circle([20, 10], 15);
var p1 = new Path([[0, 10], [40, 10]]);

var renderer = new Renderer()
renderer.attachAll([c1, p1], {color: [12, 44, 222]})
renderer.debug = true

renderer.render()
console.log(p1.position.x$)
