var assert = require('assert');
var Hierarchy = require('../lib/index').Hierarchy;

describe('Hierarchy', function () {
    describe('#construct', function () {
        it('should be constructable without arguments', function () {
            new Hierarchy()
        })
        it('should be constructable with parents and children', function () {
            var parent = new Hierarchy()
            var child1 = new Hierarchy()
            var child2 = new Hierarchy()

            var h = new Hierarchy(parent, [child1, child2])
            assert.equal(h.children.length, 2)
            assert.equal(h.parent, parent)
        })
    })
    describe('#_addChild', function () {
        it('should be possible to add a child', function () {
            var h = new Hierarchy()
            var child = new Hierarchy()

            h._addChild(new Hierarchy())
            h._addChild(new Hierarchy())
            h._addChild(child)

            assert.equal(h.children[2], child)
            assert.equal(h.children.length, 3)
        })
    })
    describe('#removeChild', function () {
        it('should be possible to remove a child', function () {
            var h = new Hierarchy()
            var child = new Hierarchy()

            h._addChildren([new Hierarchy(), new Hierarchy(), child])

            h.removeChild(child)

            assert.equal(h.children[2], undefined)
            assert.equal(h.children.length, 2)
        })
    })
    describe('#_addChildren', function () {
        it('should be possible to add children', function () {
            var h = new Hierarchy()
            var child = new Hierarchy()

            h._addChildren([new Hierarchy(), new Hierarchy(), child])

            assert.equal(h.children[2], child)
            assert.equal(child.parent, h)
            assert.equal(h.children.length, 3)
        })
    })
    describe('#removeChildren', function () {
        it('should be possible to remove children', function () {
            var h = new Hierarchy()
            var child1 = new Hierarchy()
            var child2 = new Hierarchy()

            h._addChildren([new Hierarchy(), child1, child2])

            h.removeChildren([child1, child2])

            assert.equal(h.children[2], undefined)
            assert.equal(h.children.length, 1)
        })
        it('should be possible to remove all children', function () {
            var h = new Hierarchy()
            var child1 = new Hierarchy()
            var child2 = new Hierarchy()

            h._addChildren([new Hierarchy(), child1, child2])

            h.removeChildren()

            assert.equal(h.children[2], undefined)
            assert.equal(h.children.length, 0)
        })
    })
    describe('#hasChildren', function () {
        it('should return whether the item has children', function () {
            var h = new Hierarchy()

            assert.equal(h.hasChildren(), false)

            h._addChildren([new Hierarchy()])

            assert.ok(h.hasChildren())
        })
    })
    describe('#hasParent', function () {
        it('should return whether the item has a parent', function () {
            var h = new Hierarchy()

            assert.equal(h.hasParent(), false)

            h.setParent(new Hierarchy())

            assert.ok(h.hasParent())
        })
    })
});
