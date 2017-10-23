import { Circle, Path, Point, Group } from './index'
import { TerminalRenderer as Renderer } from './TerminalRenderer'

//creating shapes and groups
var path = new Path([[3, 5], [10, 12], [20, 12], [40, 42]])

var circle = new Circle([10, 5], 10)
circle.center = [10, 10]

var group1 = new Group([15, 15])
var group2 = new Group([20, 20])

group1.addChild(circle)
group2.addChild(group1)

//create renderer and attach shapes
var renderer = new Renderer()
renderer.attach(group1, {color: [122, 222, 56]})
renderer.attach(group2, {color: [222, 222, 56]})
renderer.attach(path, {color: [20, 40, 203]})
renderer.attach(circle, {color: [200, 30, 23]})

renderer.render()

//moving the circle
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

//rotating the circle

setInterval(() => {
    group1.rotation += 1
    group2.rotation += 2

    circle.rotation += 3

    renderer.render()
}, 150)
