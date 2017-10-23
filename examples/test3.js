import { Circle, Path, Point, Shape, Group } from '../src/index'
import { TerminalRenderer as Renderer } from '../src/TerminalRenderer'

var group = new Group([3,3])

var handle0 = new Point([0, 20])
var handle1 = new Point([0, 20])
var segment0 = new Path.Segment([10, 0], [0, 0], handle0)
var segment1 = new Path.Segment([30, 0], handle1, [0, 0])
var path = new Path([segment0, segment1]);


group.addChild(path)

var renderer = new Renderer()

renderer.attach(group)
renderer.attach(path)
renderer.attach(path.getSegments()[0]._handleOut, {color: [139, 223, 22]})
renderer.attach(path.getSegments()[1]._handleIn, {color: [139, 223, 22]})
renderer.debug = true
var point = new Point(10,10)
renderer.attach(point)
group.addChild(point)
renderer.handleInput()
var obj = path

renderer.on('key.left', () => {
    obj.position.x -= 1
})
renderer.on('key.right', ()=> {
    obj.position.x += 1
})
renderer.on('key.up', ()=> {
    obj.position.y += 1
})
renderer.on('key.down', ()=> {
    obj.position.y -= 1
})

renderer.on('key.r', ()=> {
    obj.rotation += 10
})
renderer.render()
