import { Point } from './Point'
import { Base } from './Base'
import { Matrix } from './Matrix'

/**
 * @Class Shape
 */
class Shape extends Base {

    /**
     * Shape
     *
     */
    constructor(position = [0, 0], rotation = 0) {
        super(position, rotation)
    }

    getBoundingBox() {

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
        var c_dist = c1.distance$(c2.position$)

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


            var px = p.x$
            var py = p.y$
            var c1x = c1.x$
            var c1y = c1.y$
            var c2x = c2.x$
            var c2y = c2.y$

            points.push(
                new Point(
                    px - b * (c2y - c1y),
                    py + b * (c2x - c1x)
                )
            )

            if (b !== 0) //only one touching point
                points.push(
                    new Point(
                        px + b * (c2y - c1y),
                        py - b * (c2x - c1x)
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
