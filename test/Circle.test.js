var assert = require('assert');
var Circle = require('../lib/index').Circle;
var Path = require('../lib/index').Path;

describe('Circle', function () {
    describe('#construct', function () {

        it('should be constructable from a Point and a radius', function () {
            var circle = new Circle([2, 4], 6);
            assert.equal(circle.position.x, 2);
            assert.equal(circle.position.y, 4);
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
        describe('#x$', function () {

            it('shoud return the absolut x value', function () {
                var circle = new Circle([2, 4], 6);
                assert.equal(circle.center.x$, 2);
            });
            it('shoud change the absolut x value', function () {
                var circle = new Circle([2, 4], 6);
                circle.center = [3, 5]
                assert.equal(circle.center.x$, 5);
            });
        });
        describe('#y$', function () {

            it('shoud return the absolut y value', function () {
                var circle = new Circle([2, 4], 6);
                assert.equal(circle.center.y$, 4);
            });
            it('shoud change the absolut y value', function () {
                var circle = new Circle([2, 4], 6);
                circle.center = [3, 5]
                assert.equal(circle.center.y$, 9);
            });
        });
        describe('#relativeX', function () {

            it('shoud return the relative x value', function () {
                var circle = new Circle([2, 4], 6);
                assert.equal(circle.center.relativeX, 0);
                assert.equal(circle.center.x, 0);
            });
            it('shoud not change the relative x value', function () {
                var circle = new Circle([2, 4], 6);
                circle.position = [33, 56]
                assert.equal(circle.center.relativeX, 0);
                assert.equal(circle.center.x, 0);
            });
            it('shoud change the relative x value', function () {
                var circle = new Circle([2, 4], 6);
                circle.center = [33, 56]
                assert.equal(circle.center.relativeX, 33);
                assert.equal(circle.center.x, 33);
            });
        });
        describe('#relativeY', function () {

            it('shoud return the relative y value', function () {
                var circle = new Circle([2, 4], 6);
                assert.equal(circle.center.relativeY, 0);
                assert.equal(circle.center.y, 0);
            });
            it('shoud not change the relative y value', function () {
                var circle = new Circle([2, 4], 6);
                circle.position = [33, 56]
                assert.equal(circle.center.relativeY, 0);
                assert.equal(circle.center.y, 0);
            });
            it('shoud change the relative y value', function () {
                var circle = new Circle([2, 4], 6);
                circle.center = [33, 56]
                assert.equal(circle.center.relativeY, 56);
                assert.equal(circle.center.y, 56);
            });
        });
    });
    describe('#getBoundingBox', function () {

        it('should return 4 points', function () {
            var c1 = new Circle([0, 0], 2);
            var bb = c1.getBoundingBox();
            assert.equal(bb[0].x, -2);
            assert.equal(bb[0].y, 2);
            assert.equal(bb[1].x, 2);
            assert.equal(bb[1].y, 2);
            assert.equal(bb[2].x, 2);
            assert.equal(bb[2].y, -2);
            assert.equal(bb[3].x, -2);
            assert.equal(bb[3].y, -2);
        });
    });

});
