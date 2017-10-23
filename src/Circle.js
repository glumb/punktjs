import { Shape } from './Shape'
import { Point } from './Point'

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
        this._addChild(this._center)
        this._radius = radius
    }

    set center(point) {
        this._center.set(point)
    }

    get center() {
        //todo this._center * this._positionMatrix (position*rotation*scale) point is responsible for this?

        return this._center
    }

    _setRadius(r) {
        this._radius = r
        this._updateBoundingBoxes()
    }

    set radius(r) {
        this._setRadius(r)
    }

    get radius() {
        return this._radius
    }

    get area() {
        return this._radius * this._radius * Math.PI
    }

    set area(area) {
        this._setRadius(Math.sqrt(area / Math.PI))
    }

    _updateBoundingBox() {
        if (this._boundingBox) { //todo may move this check up into shapes

            this._boundingBox[0].set(this.center._x - this._radius, this.center._y + this._radius)
            this._boundingBox[1].set(this.center._x + this._radius, this.center._y + this._radius)
            this._boundingBox[2].set(this.center._x + this._radius, this.center._y - this._radius)
            this._boundingBox[3].set(this.center._x - this._radius, this.center._y - this._radius)
        }
    }
    _updateBoundingBox$() {
        if (this._boundingBox$) { //todo may move this check up into shapes

            this._boundingBox[0].set$(this.center.x$ - this._radius, this.center.y$ + this._radius)
            this._boundingBox[1].set$(this.center.x$ + this._radius, this.center.y$ + this._radius)
            this._boundingBox[2].set$(this.center.x$ + this._radius, this.center.y$ - this._radius)
            this._boundingBox[3].set$(this.center.x$ - this._radius, this.center.y$ - this._radius)
        }
    }

}

export { Circle }
