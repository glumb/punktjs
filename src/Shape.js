import { Point } from './Point'
import { Base } from './Base'
import { Matrix } from './Matrix'
import { Curve } from './Path'


class Shape extends Base {

    /**
     * Shape
     *
     */
    constructor(position = [0, 0], rotation = 0) {
        super(position, rotation)

        this._boundingBox = null //todo move bbox to Group? and recursively calculate it
        this._boundingBox$ = null
    }


    getBoundingBox() {
        return this._getBoundingBox()
    }

    _getBoundingBox() {
        if (!this._boundingBox) { //no bb yet
            this._boundingBox = []

            //this._boundingBox[0] = new Point()
            //this._boundingBox[0]._setParent(this)
            //this._boundingBox[1] = new Point()
            //this._boundingBox[1]._setParent(this)
            //this._boundingBox[2] = new Point()
            //this._boundingBox[2]._setParent(this)
            //this._boundingBox[3] = new Point()
            //this._boundingBox[3]._setParent(this)

            this._boundingBox[0] = new Point()
            this._boundingBox[0]._parent = this
            this._boundingBox[1] = new Point()
            this._boundingBox[1]._parent = this
            this._boundingBox[2] = new Point()
            this._boundingBox[2]._parent = this
            this._boundingBox[3] = new Point()
            this._boundingBox[3]._parent = this

            //todo add different _children. one that are public and internal children that are only helpers like boundingbox

            this._updateBoundingBox()
        }

        return this._boundingBox
    }

    getBoundingBox$() {
        return this._getBoundingBox$()
    }

    _getBoundingBox$() {
        if (!this._boundingBox$) { //no bb yet
            if (!this._boundingBox) { //create bb if its not here yet
                this._getBoundingBox()
            }

            this._boundingBox$ = []

            this._boundingBox$[0] = new Point()
            //this._boundingBox$[0]._parent = this
            this._boundingBox$[1] = new Point()
            //this._boundingBox$[1]._parent = this
            this._boundingBox$[2] = new Point()
            //this._boundingBox$[2]._parent = this
            this._boundingBox$[3] = new Point()
            //this._boundingBox$[3]._parent = this

            //todo add different _children. one that are public and internal children that are only helpers like boundingbox

            this._updateBoundingBox()
        }

        return this._boundingBox$
    }

    /**
     *
     * @abstract
     * @private
     */
    _updateBoundingBox() {
        throw new Error('must be implemented by subclass!');
    }

    /**
     *
     * @abstract
     * @private
     */
    _updateBoundingBox$() {
        throw new Error('must be implemented by subclass!');
    }

    _updateBoundingBoxes() {
        this._updateBoundingBox()
        this._updateBoundingBox$()
    }

    /**
     *
     * @private
     */
    _parentChanged() {

        /**
         *  TODO to be replaced by super._parentChanged() when the super implementations performance is better
         */
        this._matrixCache$ = null
        this._positionCache$ = null

        for (let child of this._children) {
            child._parentChanged(false)
        }
        /**
         * end
         */

        if (this._boundingBox) {
            this._boundingBox[0]._parentChanged()
            this._boundingBox[1]._parentChanged()
            this._boundingBox[2]._parentChanged()
            this._boundingBox[3]._parentChanged()
        }
        if (this._boundingBox$) {
            this._updateBoundingBox$()
        }


    }

    _changed(what) {


        /**
         *  TODO to be replaced by super._changed() when the super implementations performance is better
         */
        this._matrixCache = null
        this._positionCache$ = null
        this._matrixCache$ = null

        this._emit('changed')
        if (this._parent) {
            this._parent._childChanged(this)
        }
        for (let child of this._children) {
            child._parentChanged(true)
        }
        /**
         * end
         */

        if (this._boundingBox) {
            this._boundingBox[0]._parentChanged()
            this._boundingBox[1]._parentChanged()
            this._boundingBox[2]._parentChanged()
            this._boundingBox[3]._parentChanged()
        }
        if (this._boundingBox$) {
            this._updateBoundingBox$()
        }
    }

    /**
     * returns an Intersection object
     * @param testShape
     * @param {Boolean} [testBB=true] test BoundingBox intersection first
     * @returns {Intersection}
     */
    intersect(testShape, testBB = true) {
        if (testBB) {

            var boundingBox0 = this._getBoundingBox$()
            var boundingBox1 = testShape._getBoundingBox$()

            //todo may introduce width and height in bb as property
            //todo may increase performance, if we break after the first condition matches
            var left0 = boundingBox0[0].x$
            var top0 = boundingBox0[0].y$
            var right0 = boundingBox0[2].x$
            var bottom0 = boundingBox0[2].y$

            var left1 = boundingBox1[0].x$
            var top1 = boundingBox1[0].y$
            var right1 = boundingBox1[2].x$
            var bottom1 = boundingBox1[2].y$

            if (left0 > right1 || top0 < bottom1 || right0 < left1 || bottom0 > top1) {
                return new Intersection(TestResult.OUTSIDE)
            }
        }

        //or add the type to the object this.type - nah
        if (this.constructor.name == 'Circle' && testShape.constructor.name == 'Circle') {
            return Shape._intersectCircleCircle(testShape.center, testShape._radius, this.center, this._radius)
        } else if (this.constructor.name == 'Circle' && testShape.constructor.name == 'Path' || this.constructor.name == 'Path' && testShape.constructor.name == 'Circle') {
            let Circle = (this.constructor.name == 'Circle') ? this : testShape
            let Path = (this.constructor.name == 'Path') ? this : testShape
            return Shape._intersectCirclePath(Circle, Path)
        }
    }

    isOutside(Shape) {
        return this.intersect(Shape).isOutside()
    }

    /**
     *
     * @param c1
     * @param r1
     * @param c2
     * @param r2
     * @returns {*}
     * @private
     */
    static _intersectCircleCircle(c1, r1, c2, r2) { //todo use r1, r2 from the circles c1._radius...
        var result

        // Determine minimum and maximum radii where circles can intersect
        var r_max = r1 + r2
        var r_min = Math.abs(r1 - r2)

        // Determine actual distance between circle circles
        var c_dist = c1.distance$(c2)

        if (c_dist > r_max) {
            result = new Intersection(TestResult.OUTSIDE)
        } else if (c_dist < r_min) {
            result = new Intersection(TestResult.INSIDE)
        } else {
            var points = []

            var a = (r1 * r1 - r2 * r2 + c_dist * c_dist) / ( 2 * c_dist )
            var h = Math.sqrt(r1 * r1 - a * a)
            var tmp = (c_dist == 0) ? 0 : a / c_dist
            var p = c1.lerp$(c2, tmp)
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


    static _intersectCirclePath(Circle, Path) {
        var testResult = new Intersection()
        for (var Curve of Path.curves) {
            testResult.merge(Shape._intersectCircleCurve(Circle, Curve))
        }

        return testResult
    }

    /**
     *
     * @param Circle
     * @param {Curve} Curve
     * @returns {Intersection}
     * @private
     */
    static _intersectCircleCurve(Circle, Curve) {
        if (Curve.isLine() && false) {
            //todo handle this different
            let pa = Curve._segment0.position,
                pb = Curve._segment1.position
            v = pb.subtract(pa)
            //todo use a line
            let line = new Line(Circle._center.position$, Circle._center.add$(v.rotate(90).normalize(Circle._radius)))
            line.intersect(Curve)
        }

        let p1 = Curve._segment0.position,
            p2 = Curve._segment0._handleOut.position,
            p3 = Curve._segment1._handleIn.position,
            p4 = Curve._segment1.position,
            ec = Circle.center,
            rx = Circle._radius,
            ry = Circle._radius

        var a, b, c, d;       // temporary variables
        var c3, c2, c1, c0;   // coefficients of cubic


        // Calculate the coefficients of cubic polynomial
        a = p1.multiply(-1);
        b = p2.multiply(3);
        c = p3.multiply(-3);
        d = a.add(b.add(c.add(p4)));
        c3 = new Point(d.x, d.y);

        a = p1.multiply(3);
        b = p2.multiply(-6);
        c = p3.multiply(3);
        d = a.add(b.add(c));
        c2 = new Point(d.x, d.y);

        a = p1.multiply(-3);
        b = p2.multiply(3);
        c = a.add(b);
        c1 = new Point(c.x, c.y);

        c0 = new Point(p1.x, p1.y);

        var rxrx = rx * rx;
        var ryry = ry * ry;
        var poly = new Polynomial(
            c3.x * c3.x * ryry + c3.y * c3.y * rxrx,
            2 * (c3.x * c2.x * ryry + c3.y * c2.y * rxrx),
            2 * (c3.x * c1.x * ryry + c3.y * c1.y * rxrx) + c2.x * c2.x * ryry + c2.y * c2.y * rxrx,
            2 * c3.x * ryry * (c0.x - ec.x) + 2 * c3.y * rxrx * (c0.y - ec.y) +
            2 * (c2.x * c1.x * ryry + c2.y * c1.y * rxrx),
            2 * c2.x * ryry * (c0.x - ec.x) + 2 * c2.y * rxrx * (c0.y - ec.y) +
            c1.x * c1.x * ryry + c1.y * c1.y * rxrx,
            2 * c1.x * ryry * (c0.x - ec.x) + 2 * c1.y * rxrx * (c0.y - ec.y),
            c0.x * c0.x * ryry - 2 * c0.y * ec.y * rxrx - 2 * c0.x * ec.x * ryry +
            c0.y * c0.y * rxrx + ec.x * ec.x * ryry + ec.y * ec.y * rxrx - rxrx * ryry
        );
        var roots = poly.getRootsInInterval(0, 1);

        var result
        if (roots.length > 0) {
            result = new Intersection(TestResult.INTERSECTION)

            for (var i = 0; i < roots.length; i++) {
                var t = roots[i];

                result.points.push(
                    c3.multiply(t * t * t).add(c2.multiply(t * t).add(c1.multiply(t).add(c0)))
                );
            }
        } else {
            result = new Intersection(TestResult.OUTSIDE);
            //todo or inside
        }

        return result;

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
    constructor(type = TestResult.OUTSIDE, points = []) {
        super(type)
        this._points = points
    }

    get points() {
        return this._points
    }

    /**
     *
     * @param {Intersection} Intersection
     */
    merge(Intersection) {
        if (Intersection.isIntersection()) { //todo may check for INSODE OUT, too. OUTSIDE wins
            this.type = TestResult.INTERSECTION
        }

        this._points.concat(Intersection._points)
    }
}


/*****
 *
 *   interpolate - class method
 *
 *****/
class Polynomial {
    /*****
     *
     *   constructor
     *
     *****/
    constructor() {
        this.init(arguments);
    }


    interpolate(xs, ys, n, offset, x) {
        if (xs.constructor !== Array || ys.constructor !== Array)
            throw new Error("Polynomial.interpolate: xs and ys must be arrays");
        if (isNaN(n) || isNaN(offset) || isNaN(x))
            throw new Error("Polynomial.interpolate: n, offset, and x must be numbers");

        var y = 0;
        var dy = 0;
        var c = new Array(n);
        var d = new Array(n);
        var ns = 0;
        var result;

        var diff = Math.abs(x - xs[offset]);
        for (var i = 0; i < n; i++) {
            var dift = Math.abs(x - xs[offset + i]);

            if (dift < diff) {
                ns = i;
                diff = dift;
            }
            c[i] = d[i] = ys[offset + i];
        }
        y = ys[offset + ns];
        ns--;

        for (var m = 1; m < n; m++) {
            for (var i = 0; i < n - m; i++) {
                var ho = xs[offset + i] - x;
                var hp = xs[offset + i + m] - x;
                var w = c[i + 1] - d[i];
                var den = ho - hp;

                if (den == 0.0) {
                    result = {y: 0, dy: 0};
                    break;
                }

                den = w / den;
                d[i] = hp * den;
                c[i] = ho * den;
            }
            dy = (2 * (ns + 1) < (n - m)) ? c[ns + 1] : d[ns--];
            y += dy;
        }

        return {y: y, dy: dy};
    };


    /*****
     *
     *   init
     *
     *****/
    init(coefs) {
        this.coefs = new Array();

        for (var i = coefs.length - 1; i >= 0; i--)
            this.coefs.push(coefs[i]);

        this._variable = "t";
        this._s = 0;
    };


    /*****
     *
     *   eval
     *
     *****/
    eval(x) {
        if (isNaN(x))
            throw new Error("Polynomial.eval: parameter must be a number");

        var result = 0;

        for (var i = this.coefs.length - 1; i >= 0; i--)
            result = result * x + this.coefs[i];

        return result;
    };


    /*****
     *
     *   add
     *
     *****/
    add(that) {
        var result = new Polynomial();
        var d1 = this.getDegree();
        var d2 = that.getDegree();
        var dmax = Math.max(d1, d2);

        for (var i = 0; i <= dmax; i++) {
            var v1 = (i <= d1) ? this.coefs[i] : 0;
            var v2 = (i <= d2) ? that.coefs[i] : 0;

            result.coefs[i] = v1 + v2;
        }

        return result;
    };


    /*****
     *
     *   multiply
     *
     *****/
    multiply(that) {
        var result = new Polynomial();

        for (var i = 0; i <= this.getDegree() + that.getDegree(); i++)
            result.coefs.push(0);

        for (var i = 0; i <= this.getDegree(); i++)
            for (var j = 0; j <= that.getDegree(); j++)
                result.coefs[i + j] += this.coefs[i] * that.coefs[j];

        return result;
    };


    /*****
     *
     *   divide_scalar
     *
     *****/
    divide_scalar(scalar) {
        for (var i = 0; i < this.coefs.length; i++)
            this.coefs[i] /= scalar;
    };


    /*****
     *
     *   simplify
     *
     *****/
    simplify() {
        for (var i = this.getDegree(); i >= 0; i--) {
            if (Math.abs(this.coefs[i]) <= Polynomial.TOLERANCE)
                this.coefs.pop();
            else
                break;
        }
    };


    /*****
     *
     *   bisection
     *
     *****/
    bisection(min, max) {
        var minValue = this.eval(min);
        var maxValue = this.eval(max);
        var result;

        if (Math.abs(minValue) <= Polynomial.TOLERANCE)
            result = min;
        else if (Math.abs(maxValue) <= Polynomial.TOLERANCE)
            result = max;
        else if (minValue * maxValue <= 0) {
            var tmp1 = Math.log(max - min);
            var tmp2 = Math.LN10 * Polynomial.ACCURACY;
            var iters = Math.ceil((tmp1 + tmp2) / Math.LN2);

            for (var i = 0; i < iters; i++) {
                result = 0.5 * (min + max);
                var value = this.eval(result);

                if (Math.abs(value) <= Polynomial.TOLERANCE) {
                    break;
                }

                if (value * minValue < 0) {
                    max = result;
                    maxValue = value;
                } else {
                    min = result;
                    minValue = value;
                }
            }
        }

        return result;
    };


    /*****
     *
     *   toString
     *
     *****/
    toString() {
        var coefs = new Array();
        var signs = new Array();

        for (var i = this.coefs.length - 1; i >= 0; i--) {
            var value = Math.round(this.coefs[i] * 1000) / 1000;
            //var value = this.coefs[i];

            if (value != 0) {
                var sign = ( value < 0 ) ? " - " : " + ";

                value = Math.abs(value);
                if (i > 0)
                    if (value == 1)
                        value = this._variable;
                    else
                        value += this._variable;
                if (i > 1) value += "^" + i;

                signs.push(sign);
                coefs.push(value);
            }
        }

        signs[0] = ( signs[0] == " + " ) ? "" : "-";

        var result = "";
        for (var i = 0; i < coefs.length; i++)
            result += signs[i] + coefs[i];

        return result;
    };


    /*****
     *
     *   trapezoid
     *   Based on trapzd in "Numerical Recipes in C", page 137
     *
     *****/
    trapezoid(min, max, n) {
        if (isNaN(min) || isNaN(max) || isNaN(n))
            throw new Error("Polynomial.trapezoid: parameters must be numbers");

        var range = max - min;
        var TOLERANCE = 1e-7;

        if (n == 1) {
            var minValue = this.eval(min);
            var maxValue = this.eval(max);
            this._s = 0.5 * range * ( minValue + maxValue );
        } else {
            var it = 1 << (n - 2);
            var delta = range / it;
            var x = min + 0.5 * delta;
            var sum = 0;

            for (var i = 0; i < it; i++) {
                sum += this.eval(x);
                x += delta;
            }
            this._s = 0.5 * (this._s + range * sum / it);
        }

        if (isNaN(this._s))
            throw new Error("Polynomial.trapezoid: this._s is NaN");

        return this._s;
    };


    /*****
     *
     *   simpson
     *   Based on trapzd in "Numerical Recipes in C", page 139
     *
     *****/
    simpson(min, max) {
        if (isNaN(min) || isNaN(max))
            throw new Error("Polynomial.simpson: parameters must be numbers");

        var range = max - min;
        var st = 0.5 * range * ( this.eval(min) + this.eval(max) );
        var t = st;
        var s = 4.0 * st / 3.0;
        var os = s;
        var ost = st;
        var TOLERANCE = 1e-7;

        var it = 1;
        for (var n = 2; n <= 20; n++) {
            var delta = range / it;
            var x = min + 0.5 * delta;
            var sum = 0;

            for (var i = 1; i <= it; i++) {
                sum += this.eval(x);
                x += delta;
            }

            t = 0.5 * (t + range * sum / it);
            st = t;
            s = (4.0 * st - ost) / 3.0;

            if (Math.abs(s - os) < TOLERANCE * Math.abs(os))
                break;

            os = s;
            ost = st;
            it <<= 1;
        }

        return s;
    };


    /*****
     *
     *   romberg
     *
     *****/
    romberg(min, max) {
        if (isNaN(min) || isNaN(max))
            throw new Error("Polynomial.romberg: parameters must be numbers");

        var MAX = 20;
        var K = 3;
        var TOLERANCE = 1e-6;
        var s = new Array(MAX + 1);
        var h = new Array(MAX + 1);
        var result = {y: 0, dy: 0};

        h[0] = 1.0;
        for (var j = 1; j <= MAX; j++) {
            s[j - 1] = this.trapezoid(min, max, j);
            if (j >= K) {
                result = Polynomial.interpolate(h, s, K, j - K, 0.0);
                if (Math.abs(result.dy) <= TOLERANCE * result.y) break;
            }
            s[j] = s[j - 1];
            h[j] = 0.25 * h[j - 1];
        }

        return result.y;
    };


    /*****
     *
     *   get/set methods
     *
     *****/

    /*****
     *
     *   get degree
     *
     *****/
    getDegree() {
        return this.coefs.length - 1;
    };


    /*****
     *
     *   getDerivative
     *
     *****/
    getDerivative() {
        var derivative = new Polynomial();

        for (var i = 1; i < this.coefs.length; i++) {
            derivative.coefs.push(i * this.coefs[i]);
        }

        return derivative;
    };


    /*****
     *
     *   getRoots
     *
     *****/
    getRoots() {
        var result;

        this.simplify();
        switch (this.getDegree()) {
            case 0:
                result = new Array();
                break;
            case 1:
                result = this.getLinearRoot();
                break;
            case 2:
                result = this.getQuadraticRoots();
                break;
            case 3:
                result = this.getCubicRoots();
                break;
            case 4:
                result = this.getQuarticRoots();
                break;
            default:
                result = new Array();
            // should try Newton's method and/or bisection
        }

        return result;
    };


    /*****
     *
     *   getRootsInInterval
     *
     *****/
    getRootsInInterval(min, max) {
        var roots = new Array();
        var root;

        if (this.getDegree() == 1) {
            root = this.bisection(min, max);
            if (root != null) roots.push(root);
        } else {
            // get roots of derivative
            var deriv = this.getDerivative();
            var droots = deriv.getRootsInInterval(min, max);

            if (droots.length > 0) {
                // find root on [min, droots[0]]
                root = this.bisection(min, droots[0]);
                if (root != null) roots.push(root);

                // find root on [droots[i],droots[i+1]] for 0 <= i <= count-2
                for (var i = 0; i <= droots.length - 2; i++) {
                    root = this.bisection(droots[i], droots[i + 1]);
                    if (root != null) roots.push(root);
                }

                // find root on [droots[count-1],xmax]
                root = this.bisection(droots[droots.length - 1], max);
                if (root != null) roots.push(root);
            } else {
                // polynomial is monotone on [min,max], has at most one root
                root = this.bisection(min, max);
                if (root != null) roots.push(root);
            }
        }

        return roots;
    };


    /*****
     *
     *   getLinearRoot
     *
     *****/
    getLinearRoot() {
        var result = new Array();
        var a = this.coefs[1];

        if (a != 0)
            result.push(-this.coefs[0] / a);

        return result;
    };


    /*****
     *
     *   getQuadraticRoots
     *
     *****/
    getQuadraticRoots() {
        var results = new Array();

        if (this.getDegree() == 2) {
            var a = this.coefs[2];
            var b = this.coefs[1] / a;
            var c = this.coefs[0] / a;
            var d = b * b - 4 * c;

            if (d > 0) {
                var e = Math.sqrt(d);

                results.push(0.5 * (-b + e));
                results.push(0.5 * (-b - e));
            } else if (d == 0) {
                // really two roots with same value, but we only return one
                results.push(0.5 * -b);
            }
        }

        return results;
    };


    /*****
     *
     *   getCubicRoots
     *
     *   This code is based on MgcPolynomial.cpp written by David Eberly.  His
     *   code along with many other excellent examples are avaiable at his site:
     *   http://www.magic-software.com
     *
     *****/
    getCubicRoots() {
        var results = new Array();

        if (this.getDegree() == 3) {
            var c3 = this.coefs[3];
            var c2 = this.coefs[2] / c3;
            var c1 = this.coefs[1] / c3;
            var c0 = this.coefs[0] / c3;

            var a = (3 * c1 - c2 * c2) / 3;
            var b = (2 * c2 * c2 * c2 - 9 * c1 * c2 + 27 * c0) / 27;
            var offset = c2 / 3;
            var discrim = b * b / 4 + a * a * a / 27;
            var halfB = b / 2;

            if (Math.abs(discrim) <= Polynomial.TOLERANCE) disrim = 0;

            if (discrim > 0) {
                var e = Math.sqrt(discrim);
                var tmp;
                var root;

                tmp = -halfB + e;
                if (tmp >= 0)
                    root = Math.pow(tmp, 1 / 3);
                else
                    root = -Math.pow(-tmp, 1 / 3);

                tmp = -halfB - e;
                if (tmp >= 0)
                    root += Math.pow(tmp, 1 / 3);
                else
                    root -= Math.pow(-tmp, 1 / 3);

                results.push(root - offset);
            } else if (discrim < 0) {
                var distance = Math.sqrt(-a / 3);
                var angle = Math.atan2(Math.sqrt(-discrim), -halfB) / 3;
                var cos = Math.cos(angle);
                var sin = Math.sin(angle);
                var sqrt3 = Math.sqrt(3);

                results.push(2 * distance * cos - offset);
                results.push(-distance * (cos + sqrt3 * sin) - offset);
                results.push(-distance * (cos - sqrt3 * sin) - offset);
            } else {
                var tmp;

                if (halfB >= 0)
                    tmp = -Math.pow(halfB, 1 / 3);
                else
                    tmp = Math.pow(-halfB, 1 / 3);

                results.push(2 * tmp - offset);
                // really should return next root twice, but we return only one
                results.push(-tmp - offset);
            }
        }

        return results;
    };


    /*****
     *
     *   getQuarticRoots
     *
     *   This code is based on MgcPolynomial.cpp written by David Eberly.  His
     *   code along with many other excellent examples are avaiable at his site:
     *   http://www.magic-software.com
     *
     *****/
    getQuarticRoots() {
        var results = new Array();

        if (this.getDegree() == 4) {
            var c4 = this.coefs[4];
            var c3 = this.coefs[3] / c4;
            var c2 = this.coefs[2] / c4;
            var c1 = this.coefs[1] / c4;
            var c0 = this.coefs[0] / c4;

            var resolveRoots = new Polynomial(
                1, -c2, c3 * c1 - 4 * c0, -c3 * c3 * c0 + 4 * c2 * c0 - c1 * c1
            ).getCubicRoots();
            var y = resolveRoots[0];
            var discrim = c3 * c3 / 4 - c2 + y;

            if (Math.abs(discrim) <= Polynomial.TOLERANCE) discrim = 0;

            if (discrim > 0) {
                var e = Math.sqrt(discrim);
                var t1 = 3 * c3 * c3 / 4 - e * e - 2 * c2;
                var t2 = ( 4 * c3 * c2 - 8 * c1 - c3 * c3 * c3 ) / ( 4 * e );
                var plus = t1 + t2;
                var minus = t1 - t2;

                if (Math.abs(plus) <= Polynomial.TOLERANCE) plus = 0;
                if (Math.abs(minus) <= Polynomial.TOLERANCE) minus = 0;

                if (plus >= 0) {
                    var f = Math.sqrt(plus);

                    results.push(-c3 / 4 + (e + f) / 2);
                    results.push(-c3 / 4 + (e - f) / 2);
                }
                if (minus >= 0) {
                    var f = Math.sqrt(minus);

                    results.push(-c3 / 4 + (f - e) / 2);
                    results.push(-c3 / 4 - (f + e) / 2);
                }
            } else if (discrim < 0) {
                // no roots
            } else {
                var t2 = y * y - 4 * c0;

                if (t2 >= -Polynomial.TOLERANCE) {
                    if (t2 < 0) t2 = 0;

                    t2 = 2 * Math.sqrt(t2);
                    t1 = 3 * c3 * c3 / 4 - 2 * c2;
                    if (t1 + t2 >= Polynomial.TOLERANCE) {
                        var d = Math.sqrt(t1 + t2);

                        results.push(-c3 / 4 + d / 2);
                        results.push(-c3 / 4 - d / 2);
                    }
                    if (t1 - t2 >= Polynomial.TOLERANCE) {
                        var d = Math.sqrt(t1 - t2);

                        results.push(-c3 / 4 + d / 2);
                        results.push(-c3 / 4 - d / 2);
                    }
                }
            }
        }

        return results;
    };

}

/*****
 *
 *   Polynomial.js
 *
 *   copyright 2002, Kevin Lindsey
 *
 *****/

Polynomial.TOLERANCE = 1e-6;
Polynomial.ACCURACY = 6;


export { Shape }


