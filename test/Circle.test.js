var assert = require('assert');
var Circle = require('../libNew/Circle-compiled');

describe('Circle', function () {
    describe('#construct', function () {

        it('should be constructable from a Point and a radius', function () {
            var circle = new Circle([2, 4], 6);
            assert.equal(circle.center.x, 2);
            assert.equal(circle.center.y, 4);
        });
    });
    describe('#area', function () {

        it('shoud change the radius to match the area', function () {
            var circle = new Circle([2, 4], 6);
            var r = 19
            circle.area = Math.PI * r * r
            assert.equal(circle.radius, r);
        });
        it('shoud return the area of the circle', function () {
            var r = 19
            var circle = new Circle([2, 4], r);
            var area = Math.PI * r * r
            assert.equal(circle.area, area);
        });
    });
    describe('#center', function () {
        describe('#x', function () {

            it('shoud return the absolut x value', function () {
                var circle = new Circle([2, 4], 6);
                assert.equal(circle.center.x, 2);
            });
            it('shoud change the absolut x value', function () {
                var circle = new Circle([2, 4], 6);
                circle.center = [3, 5]
                assert.equal(circle.center.x, 5);
            });
        });
        describe('#y', function () {

            it('shoud return the absolut y value', function () {
                var circle = new Circle([2, 4], 6);
                assert.equal(circle.center.y, 4);
            });
            it('shoud change the absolut y value', function () {
                var circle = new Circle([2, 4], 6);
                circle.center = [3, 5]
                assert.equal(circle.center.y, 9);
            });
        });
        describe('#relativeX', function () {

            it('shoud return the relative x value', function () {
                var circle = new Circle([2, 4], 6);
                assert.equal(circle.center.relativeX, 0);
            });
            it('shoud not change the relative x value', function () {
                var circle = new Circle([2, 4], 6);
                circle.position = [33, 56]
                assert.equal(circle.center.relativeX, 0);
            });
            it('shoud change the relative x value', function () {
                var circle = new Circle([2, 4], 6);
                circle.center = [33, 56]
                assert.equal(circle.center.relativeX, 33);
            });
        });
        describe('#relativeY', function () {

            it('shoud return the relative y value', function () {
                var circle = new Circle([2, 4], 6);
                assert.equal(circle.center.relativeY, 0);
            });
            it('shoud not change the relative y value', function () {
                var circle = new Circle([2, 4], 6);
                circle.position = [33, 56]
                assert.equal(circle.center.relativeY, 0);
            });
            it('shoud change the relative y value', function () {
                var circle = new Circle([2, 4], 6);
                circle.center = [33, 56]
                assert.equal(circle.center.relativeY, 56);
            });
        });
    });
    describe('#instersect', function () {

        it('should be outside', function () {
            var c1 = new Circle([0, 0], 2);
            var c2 = new Circle([5, 5], 2);
            var inters = c1.intersect(c2)
            assert.equal(inters.points, undefined);
            assert.equal(inters.type, 'OUTSIDE');
            assert.ok(inters.isOutside());
        });
        it('should be inside', function () {
            var c1 = new Circle([0, 0], 2);
            var c2 = new Circle([0, 0], 2.1);
            var inters = c1.intersect(c2)
            assert.equal(inters.points, undefined);
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

});