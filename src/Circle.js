import { Shape } from './Shape'
import { Point } from './Point'

/**
 * @Class Circle
 */
class Circle extends Shape {

    /**
     * Shape
     *
     * @param {Array|Object} position - Point
     * @param {Number} radius - _radius
     */
    constructor(position, radius) {
        super(position)

        this._center = new Point(0, 0)
        this.addChild(this._center)
        this._radius = radius
    }

    set center(point) {
        this._center.set(point)
    }

    get center() {
        //todo this._center * this._positionMatrix (position*rotation*scale) point is responsible for this?

        return this._center
    }


    set radius(r) {
        this._radius = r
    }

    get radius() {
        return this._radius
    }

    get area() {
        return this._radius * this._radius * Math.PI
    }

    set area(area) {
        this._radius = Math.sqrt(area / Math.PI)
    }

    getBoundingBox() {

        var pointTl = new Point(this.center._x - this._radius, this.center._y + this._radius)
        var pointTr = new Point(this.center._x + this._radius, this.center._y + this._radius)
        var pointBr = new Point(this.center._x + this._radius, this.center._y - this._radius)
        var pointBl = new Point(this.center._x - this._radius, this.center._y - this._radius)

        pointTl._parent = this
        pointTr._parent = this
        pointBr._parent = this
        pointBl._parent = this


        ;
        return [
            pointTl,
            pointTr,
            pointBr,
            pointBl
        ];
    }

}

export { Circle }
