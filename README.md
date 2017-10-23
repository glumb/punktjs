# punktjs ![travis ci](https://img.shields.io/travis/glumb/punktjs.svg) ![travis ci](https://img.shields.io/coveralls/glumb/punktjs.svg)

Draw Shapes in the Terminal 

# Usage

```js
import { Circle, Path, Point, Group } from './index'
import { TerminalRenderer as Renderer } from './TerminalRenderer'

// create a new Path 
var path = new Path([[3, 5], [10, 12], [20, 12], [40, 42]])

// create a new Circle at x:10, y:5, r:10
var circle = new Circle([10, 5], 10)
circle.center = [10, 10]

// create Groups at position x:15, y:15; x:20, y:20
var group1 = new Group([15, 15])
var group2 = new Group([20, 20])

group1.addChild(circle)
group2.addChild(group1)

//create renderer and attach shapes
var renderer = new Renderer()
renderer.attach(group1, {color: [122, 222, 56]})
renderer.attach(circle, {color: [200, 30, 23]})

// or attach all elements in a group
renderer.attachAll(group2)

// listen for keyboard input
renderer.handleInput()

// move the Path
renderer.on('key.left', () => {
    path.position.x += 1
})

//rotating the circle group
setInterval(() => {
    group1.rotation += 1
    renderer.render()
}, 150)
```

See `/examples` for more examples 😅

# Examples

<img width="1001" alt="bildschirmfoto 2017-10-23 um 10 43 55" src="https://user-images.githubusercontent.com/3062564/31881105-cad1f454-b7e2-11e7-8d15-730ba2ce056a.png">

# Show Path and Handles
<img width="833" alt="bildschirmfoto 2017-10-23 um 10 50 16" src="https://user-images.githubusercontent.com/3062564/31881106-cae7bc76-b7e2-11e7-8418-1e9356d1d211.png">

# Rotate Path
<img width="833" alt="bildschirmfoto 2017-10-23 um 10 52 22" src="https://user-images.githubusercontent.com/3062564/31881107-cafc8354-b7e2-11e7-97d0-6f86fab5a4d5.png">

# Display Intersections
<img width="833" alt="bildschirmfoto 2017-10-23 um 10 52 42" src="https://user-images.githubusercontent.com/3062564/31881108-cb136880-b7e2-11e7-9cf3-316f3fbc6dee.png">
