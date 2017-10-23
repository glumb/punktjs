import { Circle, Path, Point, Group, Base } from './index'
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
        var group = new Group(10, 5, 30)
        group.addChild(point)
        return {point: point, group: group}
    },
    run:   function (obj) {
        obj.group.rotation += 5
        obj.point.y$
        obj.point.x$
    }
})

test('get value from transformed Point (2 transformations)', {
    setup: function (count) {
        var point = new Point(20, 30)
        var group = new Group(10, 5, 30)
        var group2 = new Group(16, 5, 40)
        group.addChild(point)
        group2.addChild(group)
        return {point: point, group: group}
    },
    run:   function (obj) {
        obj.group.rotation += 5
        obj.point.y$
        obj.point.x$
    }
})

test('get value from transformed Point (5 transformations)', {
    setup: function (count) {
        var point = new Point(20, 30)
        var group1 = new Base(10, 5, 30)
        var group2 = new Base(16, 5, 40)
        var group3 = new Base(16, 5, 40)
        var group4 = new Base(16, 5, 40)
        var group5 = new Base(16, 5, 40)
        group1.addChild(point)
        group2.addChild(group1)
        group3.addChild(group2)
        group4.addChild(group3)
        group5.addChild(group4)

        return {point: point, group: group5}
    },
    run:   function (obj) {
        obj.group.rotation += 5
        obj.point.y$
        obj.point.x$
    }
})

test('get value from transformed Point (5 transformations)', {
    setup: function (count) {
        var point = new Point(20, 30)
        var group1 = new Base(10, 5, 30)
        var group2 = new Base(16, 5, 40)
        var group3 = new Base(16, 5, 40)
        var group4 = new Base(16, 5, 40)
        var group5 = new Base(16, 5, 40)
        group1.addChild(point)
        group2.addChild(group1)
        group3.addChild(group2)
        group4.addChild(group3)
        group5.addChild(group4)

        return {point: point, group: group5}
    },
    run:   function (obj) {
        obj.group.rotation += 5
        obj.point.y$
        obj.point.x$
    }
})

