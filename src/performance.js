import { Circle, Path, Point, Shape, Base } from './index'
var colors = require('colors');

function test(description, testFunction, iterations = 10000) {
    var test, args = null

    if (typeof testFunction == 'function') {
        test = testFunction
    } else {
        args = testFunction.setup(iterations)
        test = testFunction.run
    }
    for (let tests = 0; tests < 3; tests++) {
        if (tests == 0)
            console.log((description + ', ' + iterations + ' iterations').green)

        var hrTime = process.hrtime()
        for (let i = 0; i < iterations; i++) {
            test(args)
        }
        var diff = process.hrtime(hrTime)

        if (tests == 2) {

            var ms = (diff[0] * 1000 + diff[1] / 1000000)
            console.log(ms + 'ms')
            ms /= iterations
            console.log(((ms*1000).toFixed(2) + 'ns').blue)
            if (ms * 10000 > 100) {
                console.log('#'.repeat(Math.floor(ms * 500)).red)
            } else {
                console.log('#'.repeat(Math.floor(ms * 5000)).blue)
            }
        }
    }
}


test('new Point(10, 10)', function () {
    new Point(10, 10)
})

test('new Point([10, 10])', function () {
    new Point([10, 10])
})

test('new Point({x: 10, y: 10})', function () {
    new Point({x: 10, y: 10})
})

test('new Point()', function () {
    new Point()
})

test('new Path()', function () {
    new Path([[3, 5], [10, 12], [20, 12], [40, 42]])
}, 100)

test('new Circle()', function () {
    new Circle([10, 5], 10)
})

test('get value from Point', {
    setup: function (count) {
        var point = new Point(20, 30)
        return {point: point}
    },
    run:   function (obj) {
        obj.point.y
        obj.point.x
    }
})

test('get value$ from Point', {
    setup: function (count) {
        var point = new Point(20, 30)
        return {point: point}
    },
    run:   function (obj) {
        obj.point.y$
        obj.point.x$
    }
})

test('get value from transformed Point', {
    setup: function (count) {
        var point = new Point(20, 30)
        var shape = new Shape(10, 5, 30)
        shape.addChild(point)
        return {point: point, shape: shape}
    },
    run:   function (obj) {
        obj.shape.rotation += 5
        obj.point.y$
        obj.point.x$
    }
})

test('get value from transformed Point (2 transformations)', {
    setup: function (count) {
        var point = new Point(20, 30)
        var shape = new Shape(10, 5, 30)
        var shape2 = new Shape(16, 5, 40)
        shape.addChild(point)
        shape2.addChild(shape)
        return {point: point, shape: shape}
    },
    run:   function (obj) {
        obj.shape.rotation += 5
        obj.point.y$
        obj.point.x$
    }
})

test('get value from transformed Point (5 transformations)', {
    setup: function (count) {
        var point = new Point(20, 30)
        var shape1 = new Base(10, 5, 30)
        var shape2 = new Base(16, 5, 40)
        var shape3 = new Base(16, 5, 40)
        var shape4 = new Base(16, 5, 40)
        var shape5 = new Base(16, 5, 40)
        shape1.addChild(point)
        shape2.addChild(shape1)
        shape3.addChild(shape2)
        shape4.addChild(shape3)
        shape5.addChild(shape4)

        return {point: point, shape: shape5}
    },
    run:   function (obj) {
        obj.shape.rotation += 5
        obj.point.y$
        obj.point.x$
    }
})

test('get value from transformed Point (5 transformations)', {
    setup: function (count) {
        var point = new Point(20, 30)
        var shape1 = new Base(10, 5, 30)
        var shape2 = new Base(16, 5, 40)
        var shape3 = new Base(16, 5, 40)
        var shape4 = new Base(16, 5, 40)
        var shape5 = new Base(16, 5, 40)
        shape1.addChild(point)
        shape2.addChild(shape1)
        shape3.addChild(shape2)
        shape4.addChild(shape3)
        shape5.addChild(shape4)

        return {point: point, shape: shape5}
    },
    run:   function (obj) {
        obj.shape.rotation += 5
        obj.point.y$
        obj.point.x$
    }
})

