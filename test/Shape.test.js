var assert = require('assert');
var Shape = require('../lib/index').Shape;
var Point = require('../lib/index').Point;
var Path = require('../lib/index').Path;
var Circle = require('../lib/index').Circle;

describe('Shape', function () {
    describe('#instersect', function () {
        describe('Circle Circle', function () {
            it('should be outside', function () {
                var c1 = new Circle([0, 0], 2);
                var c2 = new Circle([5, 5], 2);
                var inters = c1.intersect(c2)
                assert.equal(inters.points.length, 0);
                assert.equal(inters.type, 'OUTSIDE');
                assert.ok(inters.isOutside());
            });
            it('should be inside', function () {
                var c1 = new Circle([0, 0], 2);
                var c2 = new Circle([0, 0], 2.1);
                var inters = c1.intersect(c2)
                assert.equal(inters.points.length, 0);
                assert.ok(inters.isInside());
            });
            it('should return two intersections', function () {
                var c1 = new Circle([0, 0], 2);
                var c2 = new Circle([2, 2], 2);
                var inters = c1.intersect(c2)
                assert.equal(Math.round(inters.points[0].x), 2);
                assert.equal(Math.round(inters.points[0].y), 0);
                assert.equal(Math.round(inters.points[1].x), 0);
                assert.equal(Math.round(inters.points[1].y), 2);
                assert.equal(inters.type, 'INTERSECTION');
                assert.ok(inters.isIntersection());
            });
            it('should return one touch position', function () {
                var c1 = new Circle([0, 0], 2);
                var c2 = new Circle([4, 0], 2);
                var inters = c1.intersect(c2)
                console.log(inters)
                assert.equal(Math.round(inters.points[0].x), 2);
                assert.equal(Math.round(inters.points[0].y), 0);
                assert.equal(inters.points[1], undefined);
                assert.equal(inters.type, 'INTERSECTION');
                assert.ok(inters.isIntersection());

                //test again with fraction values
                var c3 = new Circle([1, 1], 1);
                var c4 = new Circle([3.6, 1], 1.6);
                var inters2 = c3.intersect(c4)
                assert.equal(inters2.points.length, 1);
                assert.ok(inters2.isIntersection());
            });
        });
        describe('Circle Path', function () {
          //todo implement
//             it('should be outside', function () {
//                 var c1 = new Circle([2, 1], 1.5);
//                 var p1 = new Path([[0, 3], [4, 3]]);
//                 var inters = c1.intersect(p1)
//                 assert.equal(inters.points.length, 0);
//                 assert.equal(inters.type, 'OUTSIDE');
//                 assert.ok(inters.isOutside());
//             });
//             it('should be inside', function () {
//                 var c1 = new Circle([20, 10], 15);
//                 var p1 = new Path([[10, 10], [30, 10]]);
//                 var inters = c1.intersect(p1)
//                 assert.equal(inters.points.length, 0);
//                 assert.ok(inters.isInside());
//             });
//             it('should return two intersections', function () {
//                 var c1 = new Circle([20, 10], 15);
//                 var p1 = new Path([[0, 10], [40, 10]]);
//                 var inters = c1.intersect(p1)
// console.log(inters)
//                 assert.equal(Math.round(inters.points[0].x), 35);
//                 assert.equal(Math.round(inters.points[0].y), 10);
//                 assert.equal(Math.round(inters.points[1].x), 5);
//                 assert.equal(Math.round(inters.points[1].y), 10);
//                 assert.equal(inters.type, 'INTERSECTION');
//                 assert.ok(inters.isIntersection());
//             });
//             it('should return one touch position', function () {
//                 var c1 = new Circle([20, 10], 15);
//                 var p1 = new Path([[10, 25], [30, 25]]);
//                 var inters = c1.intersect(p1)
//                 console.log(inters)
//                 assert.equal(Math.round(inters.points[0].x), 20);
//                 assert.equal(Math.round(inters.points[0].y), 25);
//                 assert.equal(inters.points[1], undefined);
//                 assert.equal(inters.type, 'INTERSECTION');
//                 assert.ok(inters.isIntersection());
//             });
        });
    });
});
