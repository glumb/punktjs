import { ExtendedPoint as Point } from './Point'
import { Matrix } from './Matrix'

/**
 *
 */
class Shape {

    /**
     * Shape
     *
     */
    constructor(position = [0, 0], rotation = 0) {
        this._position = new Point(position)
        this.rotation = rotation
        this._children = []
    }

    set scale(scale) {
        this._scale = scale
    }

    set rotation(rotation) {
        this._rotation = rotation % 360
        this._rotationRad = this._rotation / 180 * Math.PI
    }

    get rotation() {
        return this._rotation
    }

    get absRotation() {
        if(this._parent){
            return this._parent.absRotation + this._rotation
        }

        return this._rotation
    }

    set position(p) {
        this._position.set(p)
    }

    get position() {
        return this._position
    }

    set parent(parent){ //todo a COS may extend a Point: Point+rotation=COS
        this._parent = parent //remove this and rely on position.parent only?
        this._position._parent = parent//todo check if thats right. or just add the parent to the PositionPoint
    }

    getBoundingBox() {

    }

    /**
     *
     * @returns {Matrix}
     */
    getAbsoluteMatrix() {
        if (this._parent) {
            return this._parent.getAbsoluteMatrix().multiply(this.getMatrix())
        } else {
            return this.getMatrix()
        }
    }

    getMatrix() {
        //todo cache matrix?
        var rotation = new Matrix({
            a: Math.cos(this._rotationRad), b: -Math.sin(this._rotationRad), tx: 0,
            c: Math.sin(this._rotationRad), d: Math.cos(this._rotationRad), ty: 0
        })

        var translation = new Matrix({
            a: 1, b: 0, tx: this._position._x,
            c: 0, d: 1, ty: this._position._y
        })



        return translation.multiply(rotation)
    }

    addChild(child) {
        this.link(child, this)
        return this
    }

    setParent(parent) {
        this.link(this, parent)
        return this
    }

    /**
     *
     * @param {Shape|Point} child
     * @param {Shape} parent
     */
    link(child, parent) {
        parent._children.push(child)
        child.parent = parent
    }

    transformBase() {
        if (this._parent) {

        }
    }

    intersect(Shape) {
        //or add the type to the object this.type - nah
        if (this.constructor.name == 'Circle' && Shape.constructor.name == 'Circle') {
            return this._intersectCircleCircle(Shape.center, Shape._radius, this.center, this._radius)
        }
    }

    isOutside(Shape) {
        return this.intersect(Shape).isOutside()
    }

    _intersectCircleCircle(c1, r1, c2, r2) {
        var result

        // Determine minimum and maximum radii where circles can intersect
        var r_max = r1 + r2
        var r_min = Math.abs(r1 - r2)

        // Determine actual distance between circle circles
        var c_dist = c1.distance(c2)

        if (c_dist > r_max) {
            result = new Intersection(TestResult.OUTSIDE)
        } else if (c_dist < r_min) {
            result = new Intersection(TestResult.INSIDE)
        } else {
            var points = []

            var a = (r1 * r1 - r2 * r2 + c_dist * c_dist) / ( 2 * c_dist )
            var h = Math.sqrt(r1 * r1 - a * a)
            var tmp = (c_dist == 0) ? 0 : a / c_dist
            var p = c1.lerp(c2, tmp)
            var b = (c_dist == 0) ? 0 : h / c_dist


            points.push(
                new Point(
                    p.x - b * (c2.y - c1.y),
                    p.y + b * (c2.x - c1.x)
                )
            )

            if (b !== 0) //on.y one touching point
                points.push(
                    new Point(
                        p.x + b * (c2.y - c1.y),
                        p.y - b * (c2.x - c1.x)
                    )
                )

            result = new Intersection(TestResult.INTERSECTION, points)
        }

        return result
    }

}

class TestResult {

    constructor(type) {
        this.type = type
    }

    is(str) {
        return this.type == str
    }

    isInside() {
        return this.is(TestResult.INSIDE)
    }

    isOutside() {
        return this.is(TestResult.OUTSIDE)
    }

    isIntersection() {
        return this.is(TestResult.INTERSECTION)
    }
}

TestResult.INTERSECTION = 'INTERSECTION'
TestResult.INSIDE = 'INSIDE'
TestResult.OUTSIDE = 'OUTSIDE'

class Intersection extends TestResult {
    constructor(type, points) {
        super(type)
        this.points = points
    }
}

export { Shape }