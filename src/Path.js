import { Shape } from './Shape'
import { Point } from './Point'
import { Base } from './Base'


/**
 * @Class Path
 */
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
        super(position)

        this._curves = []

        if(segments)
        for (let segment of segments) {
            this.appendSegment(segment)
        }
    }

    /**
     * add a segment to the path
     *
     * @param segment
     */
    appendSegment(segment) {
        if (!(segment instanceof Path.Segment)) {
            segment = new Path.Segment(segment)
        }
        if (this._children.length > 0) { //there are already Segments in the Path
            this._curves.push(new Path.Curve(this._children[this._children.length - 1], segment))
        }
        this.addChild(segment)

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
            this._calculatePointAtPosition(pointStart.x, handleStart.x, handleEnd.x, pointEnd.x, t),
            this._calculatePointAtPosition(pointStart.y, handleStart.y, handleEnd.y, pointEnd.y, t)
        ]

    }

    _positionAt$(t) {
        var pointStart = this._segment0.position
        var handleStart = this._segment0._handleOut
        var handleEnd = this._segment1._handleIn
        var pointEnd = this._segment1.position

        return [
            this._calculatePointAtPosition(pointStart.x$, handleStart.x, handleEnd.x, pointEnd.x$, t),
            this._calculatePointAtPosition(pointStart.y$, handleStart.y, handleEnd.y, pointEnd.y$, t)
        ]
    }

    /**
     *
     * @param {Number} p0 - start Point
     * @param {Number} h0o - start Point handle out, relative to p0
     * @param {Number} h1i - end Point handle in, relative to p1
     * @param {Number} p1 - end Point
     * @param {Number} t - value between {0-1} => 0%-100% of the length
     * @returns {number}
     */
    _calculatePointAtPosition(p0, h0o, h1i, p1, t) {
        h0o += p0 // handles need to be absolute for the calculation
        h1i += p1

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

        this.addChild(this._handleIn)
        this.addChild(this._handleOut)
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
