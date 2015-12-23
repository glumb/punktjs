var assert = require('assert');
var Matrix = require('../lib/index').Matrix;

describe('Matrix', function () {
    describe('#construct', function () {

        //it('should be constructable from Points', function () {
        //    var path = new Path([[3, 5], [3, 6]]);
        //    assert.equal(path.position.x, 3);
        //    assert.equal(path.position.y, 5);
        //});
    });
    describe('#inverse', function () {

        it('should be invertible', function () {
            var matrix = new Matrix({
                a: 2, b: -2, tx: 7,
                c: -3, d: 7, ty: 2
            });
            console.log(matrix.toString())
            var inverse = matrix.inverse()
            console.log(inverse.toString())
            assert.equal(inverse.a,7/8);
            assert.equal(inverse.b,1/4);
            assert.equal(inverse.tx,-53/8);
            assert.equal(inverse.c,3/8);
            assert.equal(inverse.d,1/4);
            assert.equal(inverse.ty,-25/8);
        });
    });
});
