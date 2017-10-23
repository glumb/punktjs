var assert = require('assert');
var Path = require('../lib/index').Path
var Group = require('../lib/index').Group
var Point = require('../lib/index').Point

describe('position cache invalidation', function () {

    it('should invalidate the cache and change position', function () {
        var group = new Group([3, 3])

        var path = new Path([[20, 23], [2, 4]]);
        path.position = [20, 23]

        assert.equal(path.position.x$, 20)
        assert.equal(path.getSegments()[0].x$, 40)
        path.position.x += 10
        assert.equal(path.getSegments()[0].x$, 50)
        assert.equal(path.position.x$, 30)

        group.addChild(path)

        path.position.x -= 10

        assert.equal(path.position.x$, 23)
        assert.equal(path.getSegments()[0].x$, 43)
        path.position.x += 10
        assert.equal(path.getSegments()[0].x$, 53)
        assert.equal(path.position.x$, 33)
    });

});


