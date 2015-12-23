var assert = require('assert');
var Path = require('../lib/index').Path;

describe('Path', function () {
    describe('#construct', function () {

        //it('should be constructable from Points', function () {
        //    var path = new Path([[3, 5], [3, 6]]);
        //    assert.equal(path.position.x, 3);
        //    assert.equal(path.position.y, 5);
        //});
    });
    describe('#construct', function () {

        it('should be constructable from Points', function () {
            var path = new Path([0, 0]);
            var segment = new Path.Segment([2, 2], [3, 1]);
            path.appendSegment(segment);
            console.log(path.curves[0].length)
        });
    });
    describe('#segments', function () {

        it('should return the segments', function () {
            var path = new Path([[2, 2], [3, 1]]);
            var segments = path.segments;
            console.log(segments)
        });
    });
    describe('#curves', function () {

        it('should return one curve', function () {
            var path = new Path([[2, 2], [3, 1]]);
            var curve = path.curves;
            console.log(curve)
            assert.equal(curve.length, 1)
        });
        it('should return no curve', function () {
            var path = new Path([[3, 1]]);
            var curve = path.curves;
            assert.equal(curve.length, 0)
        });
        it('should change the curve length', function () {
            var segment1 = new Path.Segment([2, 2], null, [3, 1]);
            var segment2 = new Path.Segment([2, 6], [4, 4]);
            var path = new Path([segment1, segment2]);
            var curve = path.curves[0];
            var l1 = curve.length
            console.log(curve.length)
            segment1.handleOut.x = 1
            assert.notEqual(l1, curve.length)
            console.log(curve.length)
        });
        it('should return the curve length', function () {
            var segment1 = new Path.Segment([2, 2], null, [0, 0]);
            var segment2 = new Path.Segment([3, 2], [0, 0]);
            var path = new Path([segment1, segment2]);
            var curve = path.curves[0];
            var l1 = curve.length
            console.log(curve.length)
            segment1.handleOut.x = 1

            console.log(curve.length)
        });
    });
});
