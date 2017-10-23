import { Shape } from './Shape'
import { Point } from './Point'
import { Base } from './Base'


class Path extends Shape {

    /**
     *
     * @param {Array|number} [arg0]
     *
     * @example
     * new Path([Segment0, Segment1])
     * new Path([[3, 5], [3, 6]])
     * new Path([3, 5])
     * new Path()
     */
    constructor(arg0 = [0, 0]) {
        let segments = (typeof arg0[0] == 'number') ? [arg0] : arg0
        let position = segments[0]
        super()

        this._curves = []

        if (segments)
            for (let segment of segments) {
                this.appendSegment(segment)
            }
    }

    _appendSegment(segment) {
        if (!(segment instanceof Path.Segment)) {
            segment = new Path.Segment(segment)
        }
        if (this._children.length > 0) { //there are already Segments in the Path
            this._curves.push(new Path.Curve(this._children[this._children.length - 1], segment))
        }
        this._addChild(segment)

        this._updateBoundingBoxes()

        // todo change this: handle changed, recompute the boundingbox
        segment._on('childChanged', child => { //todo check the event system. what happens onremove?
            this._updateBoundingBoxes()
        })
    }

    /**
     * add a segment to the path
     *
     * @param segment
     */
    appendSegment(segment) {
        this._appendSegment(segment)

        return this
    }

    removeSegments(indices = Object.keys(this._children)) {
        function _sortNumber(a, b) {
            return a - b;
        }

        indices.sort(_sortNumber);

        for (var i = 0; i < indices.length; i++) {
            this._removeSegment(indices[i])

            indices = indices.map(function (index) {
                return --index
            })
        }
    }

    _removeSegment(index) {
        if (!this._children[index])
            return

        if (this._curves.length > 0) {
            if (index == 0) { //first
                this._curves.splice(index, 1)
            } else if (index == this._children.length - 1) { //last
                this._curves.splice(index - 1, 1)
            } else { //not last
                this._curves.splice(index - 1, 2, new Path.Curve(this._children[index - 1], this._children[index + 1]))
            }
        }
        this._children.splice(index, 1)

        this._updateBoundingBoxes() //todo add _changedSelf?? or rename Changed => ChangedPosition
    }

    removeSegment(index) {
        this._removeSegment(index)
        return this
    }

    get segments() {
        return this._children
    }

    getSegments() {
        return this._children
    }

    get curves() {
        return this._curves
    }

    _updateBoundingBox() {
        if (this._boundingBox) {
            var top = -Infinity, right = -Infinity
            var bottom = Infinity, left = Infinity

            if (this._children.length == 0) {
                top = right = bottom = left = 0
            } else {
                for (var i = 0; i < this._children.length; i++) {
                    var child = this._children[i];
                    var nextChild = this._children[i + 1];

                    if (!child.hasHandleOut() && (!nextChild || !nextChild.hasHandleIn())) { //straight line

                        //console.log(child$.y, child$.x)
                        if (child.y > top)
                            top = child.y
                        if (child.x > right)
                            right = child.x
                        if (child.y < bottom)
                            bottom = child.y
                        if (child.x < left)
                            left = child.x
                    } else if (nextChild) { //if no nextChild$, the last point is reached

                        let curve = this._curves[i]
                        for (var j = 0; j <= 1; j += 0.05) {
                            let position = curve._positionAt(j)
                            let x = position[0], y = position[1]

                            if (y > top)
                                top = y
                            if (x > right)
                                right = x
                            if (y < bottom)
                                bottom = y
                            if (x < left)
                                left = x
                        }
                    }
                }
            }


            this._boundingBox[0].set(left, top)
            this._boundingBox[1].set(right, top)
            this._boundingBox[2].set(right, bottom)
            this._boundingBox[3].set(left, bottom)
        }
    }

    _updateBoundingBox$() {
        if (this._boundingBox$) { //todo check if bb (-$) is created
            var top = -Infinity, right = -Infinity
            var bottom = Infinity, left = Infinity

            if (!this._boundingBox) {
                this._getBoundingBox()
            }

            for (let bb of this._boundingBox) {
                if (bb.y$ > top)
                    top = bb.y$
                if (bb.x$ > right)
                    right = bb.x$
                if (bb.y$ < bottom)
                    bottom = bb.y$
                if (bb.x$ < left)
                    left = bb.x$
            }

            this._boundingBox$[0].set$(left, top)
            this._boundingBox$[1].set$(right, top)
            this._boundingBox$[2].set$(right, bottom)
            this._boundingBox$[3].set$(left, bottom)
        }

    }
}
Path.Curve = class {
    constructor(segment0, segment1) {
        this._segment0 = segment0
        this._segment1 = segment1
        this._lengthCache = null

        this._segment0._handleOut._on('changed', v => {
            this._lengthCache = null
        })
        this._segment1._handleIn._on('changed', v => {
            this._lengthCache = null
        })
    }

    set length(l) {

    }

    isLine() {
        return (!this._segment0.hasHandleOut() && !this._segment1.hasHandleIn())
    }

    get length() {
        if (!this._lengthCache) {
            this._lengthCache = this._calculateLength()
        }
        return this._lengthCache
    }

    positionAt(length) {
        if (length > this.length)
            throw 'can not return position at ' + length + ', max length is ' + this.length

        return new Point(this._positionAt(length / this.length))
    }

    _calculateLength(accuracy = 0.01) {
        var sqrt = Math.sqrt
        var pos0 = [this._segment0.position._y, this._segment0.position._y]
        var length = 0
        for (var dt = accuracy; dt <= 1; dt += accuracy) { // start Point is already defined

            var pos = this._positionAt(dt)
            let dx = pos[0] - pos0[0]
            let dy = pos[1] - pos0[1]
            length += sqrt(dx * dx + dy * dy)

            pos0 = pos
        }

        return length
    }

//todo give point a position property, that holds only x and y. -> calculation absolute positions does not need to return a new Point ?!
    _positionAt(t) {
        var pointStart = this._segment0.position
        var handleStart = this._segment0._handleOut
        var handleEnd = this._segment1._handleIn
        var pointEnd = this._segment1.position

        return [
            this._calculatePointAtPosition(pointStart.x, handleStart.x + pointStart.x, handleEnd.x + pointEnd.x, pointEnd.x, t),
            this._calculatePointAtPosition(pointStart.y, handleStart.y + pointStart.y, handleEnd.y + pointEnd.y, pointEnd.y, t)
        ]

    }

    _positionAt$(t) {
        var pointStart = this._segment0.position
        var handleStart = this._segment0._handleOut
        var handleEnd = this._segment1._handleIn
        var pointEnd = this._segment1.position

        return [
            this._calculatePointAtPosition(pointStart.x$, handleStart.x$, handleEnd.x$, pointEnd.x$, t),
            this._calculatePointAtPosition(pointStart.y$, handleStart.y$, handleEnd.y$, pointEnd.y$, t)
        ]
    }

    /**
     *
     * @param {Number} p0 - start Point
     * @param {Number} h0o - start Point handle out, absolute
     * @param {Number} h1i - end Point handle in, absolute
     * @param {Number} p1 - end Point
     * @param {Number} t - value between {0-1} => 0%-100% of the length
     * @returns {number}
     */
    _calculatePointAtPosition(p0, h0o, h1i, p1, t) {
        if (h0o == 0 && h1i == 0) { //straight line
            //todo add lerp function
        }

        // simplified (1-t)*(1-t)*(1-t)*a+3*(1-t)*(1-t)*t*b+3*(1-t)*t*t*c+t*t*t*d
        return p0 + (p0 * (-3 + t * (3 - t)) + h0o * (3 + t * (-6 + 3 * t)) + (h1i * ( 3 - 3 * t) + p1 * t) * t) * t;

    }
}

Path.Segment = class extends Base {

    /**
     *
     * @param {Point} position
     * @param {Point} [handleIn]
     * @param {Point} [handleOut]
     */
    constructor(position, handleIn = [0, 0], handleOut = [0, 0]) {
        super(position)
        this._handleIn = new Point(handleIn)
        this._handleOut = new Point(handleOut)

        this._addChild(this._handleIn)
        this._addChild(this._handleOut)
    }

    _childChanged(child) { //send the event up to redraw the boundingbox,when a handle changes
        this._emit('childChanged', child)
    }

    get handleIn() {
        return this._handleIn
    }

    getHandleIn() {
        return this._handleIn
    }

    set handleIn(handle) {
        this._handleIn.set(handle)
    }

    get handleOut() {
        return this._handleOut
    }

    set handleOut(handle) {
        this._handleOut.set(handle)
    }

    /**
     *
     * @returns {boolean}
     */
    hasHandleIn() {
        return (this._handleIn._x != 0 || this._handleIn._y != 0)
    }

    hasHandleOut() {
        return (this._handleOut._x != 0 || this._handleOut._y != 0)
    }
}

export { Path }

