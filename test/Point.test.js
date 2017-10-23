var assert = require('assert');
var Point = require('../lib/index').Point;
var Group = require('../lib/index').Group;

describe('Point', function () {
    describe('#construct', function () {
        it('should be constructable from two coordinates', function () {
            var point = new Point(2, 4);
            assert.equal(point.x, 2);
            assert.equal(point.y, 4);
        });
        it('should be constructable from an array', function () {
            var point = new Point([2, 4]);
            assert.equal(point.x, 2);
            assert.equal(point.y, 4);
        });
        it('should be constructable from another Point', function () {
            var point = new Point(new Point(2, 4));
            assert.equal(point.x, 2);
            assert.equal(point.y, 4);
        });
        it('should be constructable from an Object', function () {
            var point = new Point({x: 2, y: 4});
            assert.equal(point.x, 2);
            assert.equal(point.y, 4);
        });
    });
    describe('#x', function () {
        it('should be possible to set the absolute x coordinate', function () {
            var point = new Point(2, 4);
            point.x = 10
            assert.equal(point.x, 10);
            assert.equal(point.y, 4);
        });
    });
    describe('#x$', function () {
        it('should be possible to set the absolute x$ coordinate', function () {
            var point = new Point(2, 4);
            (new Group([10, 10], 0)).addChild(point)
            assert.equal(point.x, 2);

            point.x$ = 15

            assert.equal(point.absoluteX, 15);
            assert.equal(point.absoluteY, 14);
        });
        it('should be possible to set the absolute x$ coordinate', function () {
            var point = new Point(2, 4);
            var group = (new Group([10, 10], 0)).addChild(point);
            (new Group([5, 5], 45)).addChild(group);

            point.x$ = 20

            assert.ok(point.absoluteX - 20 < 1e-14);
        });
    });
    describe('#y', function () {
        it('should be possible to set the absolute y coordinate', function () {
            var point = new Point(2, 4);
            point.y = 10
            assert.equal(point.x, 2);
            assert.equal(point.y, 10);
        });
    });
    describe('#_parsePositionArgs', function () {
        var tests = [
            {args: [2, 4], name: 'two coordinates'},
            {args: [[2, 4]], name: 'an array'},
            {args: [new Point(2, 4)], name: 'another Point'},
            {args: [{x: 2, y: 4}], name: 'an Object'}
        ];

        tests.forEach(function (test) {
            it('should be callable from ' + test.name + ' ' + test.args.toString(), function () {
                var point = Point._parsePositionArgs.apply(null, test.args);
                assert.equal(point.x, 2);
                assert.equal(point.y, 4);
            });
        });
    });
    describe('#add', function () {
        it('should add to x and y and return a new Point', function () {
            var point = new Point(2, 4);
            point = point.add(2, 4);
            assert.equal(point.x, 4);
            assert.equal(point.y, 8);
        });
    });
    describe('#addSelf', function () {
        it('should add to x and y to the same Point', function () {
            var point = new Point(2, 4);
            point.addSelf(2, 4);
            assert.equal(point.x, 4);
            assert.equal(point.y, 8);
        });
    });
    describe('#multiply', function () {
        it('should multiply x and y', function () {
            var point = new Point(2, 4);
            point = point.multiply(3, 4);
            assert.equal(point.x, 6);
            assert.equal(point.y, 16);
        });
    });
    describe('#length', function () {
        it('should return the length of the vector', function () {
            var point = new Point(2, 4);
            var length = point.length;
            assert.equal(length.toFixed(5), 4.47214);
        });
        it('should set the vector length to 5', function () {
            var point = new Point(2, 4);
            point.length = 5;
            assert.equal(point.length, 5);
        });
        it('should be able to set a length of a null vector - should it?', function () {
            var point = new Point();
            point.length = 5;
            assert.equal(point.length, 5);
        });
    });
    describe('#rotate', function () {
        it('should rotate the vector by 90 deg', function () {
            var point = new Point(1, 0);
            point.rotate(90);
            assert.ok(point.x < 1e-15);
            assert.equal(point.y, 1);
        });
        it('should rotate the vector by 180 deg', function () {
            var point = new Point(1, 0);
            point.rotate(180);
            assert.equal(point.x, -1);
            assert.ok(point.y < 1e-15);
        });
        it('should rotate the vector by -45 deg', function () {
            var point = new Point(1, 0);
            point.rotate(-45);
            assert.ok(point.x > 0.7070 && point.x < 0.7072);
            assert.ok(point.y < -0.7070 && point.y > -0.7072);
        });
    });
});
