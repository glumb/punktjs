import { Path } from './index'
import { TerminalRenderer as Renderer } from './TerminalRenderer'

//creating a path
var path = new Path([[3, 5], [10, 12], [20, 12], [40, 32], [22, 4]])


//create renderer and attaching path
var renderer = new Renderer()

renderer.attach(path, {color: [20, 40, 203]})
renderer.render()

renderer.handleInput()
renderer.on('key.c', ()=> {
    path._style.color = [Math.random() * 255, Math.random() * 255, Math.random() * 255]
})
