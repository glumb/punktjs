var assert = require('assert');
var Group = require('../lib/index').Group;
//todo split in group base
describe('Group', function () {
    describe('#construct', function () {

        it('should be constructable from a position, rotation and scale', function () {
            var group = new Group([2, 4], 6, 2);
            assert.equal(group.position.x, 2);
            assert.equal(group.rotation, 6);
            assert.equal(group.scale, 2);
        });
    });

    describe('#rotation', function () {

        it('should set the rotation in degree', function () {
            var group = new Group();
            group.rotation = 180
            assert.equal(group.rotation, 180);
            assert.equal(group._rotationRad, Math.PI);
        });
    });
    describe('#rotation$', function () {

        it('should set the absolute rotation in degree', function () {
            var group0 = new Group();
            var group1 = new Group();
            var group2 = new Group();
            group0.rotation = 45
            group0.addChild(group1)
            group1.rotation = 30
            group1.addChild(group2)
            group2.rotation$ = 180
            assert.equal(group2.rotation$, 180);
            assert.notEqual(group2.rotation, 180)
        });
    });
    describe('#position', function () {

        it('should set the absolute position in degree', function () {
            var group0 = new Group();
            var group1 = new Group();
            var group2 = new Group();
            group0.position = [40, 10]
            group0.addChild(group1)
            group1.position = [20, 44]
            group1.addChild(group2)
            group2.position.set$(5, 6)
            assert.equal(group2.position.x$, 5);
            assert.notEqual(group2.position.x, 5);
            assert.equal(group2.position.y$, 6);
            assert.notEqual(group2.position.y, 6);
        });
    });

    describe('+children', function () {

        it('should update the children\'s coordinates when the parent changes', function () {
            var group0 = new Group();
            var group1 = new Group();
            var group2 = new Group();
            var testGroup = new Group();
            group0.position = [40, 10]
            group0.addChild(group1)
            group1.position = [20, 44]
            group1.addChild(group2)
            group1.addChild(testGroup)

            group0.rotation = 34
            assert.equal(group2.position.x$, testGroup.position.x$)
            group2.parent = group0
            assert.notEqual(group2.position.x$, testGroup.position.x$)
            group0.rotation = 0

            assert.notEqual(group2.position.x$, 5);

        });
    });
});
