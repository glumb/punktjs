var assert = require('assert');
var Point = require('../lib/Point').ExtendedPoint;

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
    describe('#y', function () {
        it('should be possible to set the absolute y coordinate', function () {
            var point = new Point(2, 4);
            point.y = 10
            assert.equal(point.x, 2);
            assert.equal(point.y, 10);
        });
    });
    describe('#_parseArgs', function () {
        var tests = [
            {args: [2, 4], name: 'two coordinates'},
            {args: [[2, 4]], name: 'an array'},
            {args: [new Point(2, 4)], name: 'another Point'},
            {args: [{x: 2, y: 4}], name: 'an Object'}
        ];

        tests.forEach(function (test) {
            it('should be callable from ' + test.name + ' ' + test.args.toString(), function () {
                var point = Point._parseArgs.apply(null, [test.args]);
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
});