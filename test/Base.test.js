var assert = require('assert');
var Base = require('../lib/index').Base;

describe('Base', function () {
    describe('#construct', function () {

        it('should be constructable from a position, rotation and scale', function () {
            var base = new Base([2, 4], 6, 2);
            assert.equal(base.position.x, 2);
            assert.equal(base.rotation, 6);
            assert.equal(base.scale, 2);
        });
    });

    describe('#rotation', function () {

        it('should set the rotation in degree', function () {
            var base = new Base();
            base.rotation = 180
            assert.equal(base.rotation, 180);
            assert.equal(base._rotationRad, Math.PI);
        });
    });
    describe('#rotation$', function () {

        it('should set the absolute rotation in degree', function () {
            var base0 = new Base();
            var base1 = new Base();
            var base2 = new Base();
            base0.rotation = 45
            base0.addChild(base1)
            base1.rotation = 30
            base1.addChild(base2)
            base2.rotation$ = 180
            assert.equal(base2.rotation$, 180);
            assert.notEqual(base2.rotation, 180)
        });
    });
    describe('#position', function () {

        it('should set the absolute position in degree', function () {
            var base0 = new Base();
            var base1 = new Base();
            var base2 = new Base();
            base0.position = [40, 10]
            base0.addChild(base1)
            base1.position = [20, 44]
            base1.addChild(base2)
            base2.position.set$(5, 6)
            assert.equal(base2.position.x$, 5);
            assert.notEqual(base2.position.x, 5);
            assert.equal(base2.position.y$, 6);
            assert.notEqual(base2.position.y, 6);
        });
    });
});
