import { Matrix } from './Matrix'
import { Hierarchy } from './Hierarchy'

/**
 * @Class Point
 */
class Point extends Hierarchy {

    /**
     * Creates a Point object with the given x and y coordinates.
     *
     * @name Point#constructor
     * @param {Number|Array|Object} [arg0=0]
     * @param {Number} [arg1]
     *
     * @example
     * new Point(5, 7);
     * new Point([5, 7]);
     * new Point({x:5, y:7});
     * new Point(new Point(5, 7));
     */
    constructor(arg0 = 0, arg1) {
        super()

        let pos = Point._parsePositionArgs(arg0, arg1)

        this._x = pos.x;
        this._y = pos.y;

        this._parent = null
        this._positionCache$ = null
    }

    /**
     * sets the coordinates
     *
     * @name Point#set
     * @param {Number|Array|Object} arg0 - x
     * @param {Number} [arg1] - y
     * @returns {Object} Point
     *
     * @example
     * point.add(5, 7);
     * point.add([5, 7]);
     * point.add({x:5, y:7});
     * point.add(new Point(5, 7));
     */
    set(arg0, arg1) {
        let pos = Point._parsePositionArgs(arg0, arg1)
        this._x = pos.x;
        this._y = pos.y;
        this._changed('matrix')

        return this
    }

    /**
     * sets the absolute coordinates
     *
     * @name Point#set$
     * @param {Number|Array|Object} arg0 - x
     * @param {Number} [arg1] - y
     * @returns {Object} Point
     *
     * @example
     * point.add(5, 7);
     * point.add([5, 7]);
     * point.add({x:5, y:7});
     * point.add(new Point(5, 7));
     */
    set$(arg0, arg1) {
        let pos = Point._parsePositionArgs(arg0, arg1)
        this._x = pos.x
        this._y = pos.y
        if (this._parent) {
            this.transformSelf(this._parent.getMatrix$().inverse())
        }
        this._changed('matrix')

        return this
    }

    /**
     *
     * @param cos
     */
    set coordinateSystem(cos) {
        this._parent = cos
    }

    _parentChanged() {
        this._positionCache$ = null
    }

    _changed(what) {
        this._positionCache$ = null


        /**
         *  TODO to be replaced by super._changed() when the super implementations performance is better
         */

        this._emit('changed')
        if (this._parent) {
            this._parent._childChanged(this)
        }
        for (let child of this._children) {
            child._parentChanged(true)
        }
    }

    /**
     *
     * @returns {Point}
     */
    get position$() {
        if (!this._parent) {
            return this
        } else if (!this._positionCache$) {
            this._positionCache$ = this._transformPoint(this._x, this._y, this._parent.getMatrix$())
        }

        return this._positionCache$
    }

    /**
     *
     * @returns {Number}
     */
    get absoluteX() {
        return this.position$.x
    }

    /**
     *
     * @returns {Number}
     */
    get absoluteY() {
        return this.position$.y
    }

    /**
     *  todo relative coordinates with capital chars
     * @returns {Number}
     */
    get relativeX() {

        return this._x
    }

    /**
     *
     * @returns {Number}
     */
    get relativeY() {

        return this._y
    }

    /**
     *
     * @returns {Number}
     */
    get x() {
        return this._x
    }

    /**
     *
     * @param {Number} x
     */
    set x(x) {
        this._x = x

        this._changed('matrix')
    }

    /**
     *
     * @returns {Number}
     */
    get x$() {
        return this.absoluteX
    }

    /**
     *
     * @param {Number} x$
     */
    set x$(x$) {
        if (this._parent) {
            this._x = x$
            this._y = this.y$ //y also gets transformed, so save it and set it later
            this.transformSelf(this._parent.getMatrix$().inverse())
        } else {
            this._x = x$
        }
        this._changed('matrix')
    }

    /**
     *
     * @returns {Number}
     */
    get y$() {
        return this.absoluteY
    }

    /**
     *
     * @param {Number} y$
     */
    set y$(y$) {
        if (this._parent) {
            this._y = y$
            this._x = this.x$ //y also gets transformed, so save it and set it later
            this.transformSelf(this._parent.getMatrix$().inverse())
        } else {
            this._y = y$
        }
        this._changed('matrix')
    }

    /**
     *
     * @returns {Number}
     */
    get y() {
        return this._y
    }

    /**
     *
     * @param {Number} y
     */
    set y(y) {
        this._y = y
        this._changed('matrix')
    }

    /**
     * returns a new transformed Point
     *
     * @param matrix
     * @returns {Point}
     */
    transform(matrix) {
        return this.clone().transformSelf(matrix)
    }

    /**
     * returns a copy of the point
     *
     * @returns {Point}
     */
    clone() {
        return new Point(this._x, this._y).setParent(this._parent)
    }

    /**
     * returns a new transformed Point
     *
     * @param m
     * @returns {Point}
     *
     * [a b tx] [ x ]
     * [c d ty] [ y ]
     * [0 0 1 ] [ 1 ]
     */
    transformSelf(m) {
        //var matrix = matrix.multiply(new Matrix(1,0,0,1,this._x,this._y))

        var x = m.a * this._x + m.b * this._y + m.tx
        var y = m.c * this._x + m.d * this._y + m.ty
        this._x = x
        this._y = y
        this._changed('matrix')

        return this
    }

    _transformPoint(x, y, m) {
        return {
            x: m.a * x + m.b * y + m.tx,
            y: m.c * x + m.d * y + m.ty
        }
    }

    /**
     * @name Point#position
     * @param {{x: Number, y: Number}|Number|Array|Object|Point} pos
     *
     * @example
     * Point.position = [5, 7];
     * Point.position = {x:5, y:7};
     * Point.position = new Point(5, 7);
     */
    set position(pos) {
        pos = Point._parsePositionArgs(pos)
        this._x = pos.x
        this._y = pos.y
        this._changed('matrix')
    }

    /**
     *
     * @returns {{x: Number, y: Number}|Number|Array|Object|Point}
     */
    get position() {
        return this //todo check if that breaks anything
    }

    rotate(deg) {
        let l = this.length,
            angle = Math.tanh(this._y / this._x),
            rad = deg * 2 * Math.PI / 360,
            newAngle = angle + rad
        this._x = l * Math.cos(newAngle)
        this._y = l * Math.sin(newAngle)

        return this
    }

    /**
     * The the vector to given length
     *
     * @param {Number} l - target length of the vector
     */
    set length(l) {
        if (this._x == 0 && this._y == 0) {
            this.set(1, 1)
        }
        let length = this.length
        this._x = l / length * this._x
        this._y = l / length * this._y
        this._changed('matrix')
    }

    /**
     * returns the current length
     *
     * @returns {Number}
     */
    get length() {
        return Math.sqrt(this._x * this._x + this._y * this._y)
    }

    /**
     * adds and returns a new point
     *
     * @name Point#add
     * @param {Number} arg0
     * @param {Number} arg1
     * @returns {Object} Point
     *
     * @example
     * point.add(5, 7);
     */
    add(arg0, arg1) {
        let pos = Point._parsePositionArgs(arg0, arg1)
        return new Point(this._x + pos.x, this._y + pos.y)
    }

    /**
     * adds to the current point
     *
     * @name Point#addSelf
     * @param {Number|Array|Object} arg0
     * @param {Number} [arg1]
     * @returns {Object} Point
     *
     * @example
     * point.add(5, 7);
     * point.add([5, 7]);
     * point.add({x:5, y:7});
     * point.add(new Point(5, 7));
     */
    addSelf(arg0, arg1) {
        let pos = Point._parsePositionArgs(arg0, arg1)
        this._x += pos.x
        this._y += pos.y
        this._changed('matrix')
        return this
    }


    /**
     * multiplies
     *
     * @name Point#add
     * @param {Number} arg0
     * @param {Number} arg1
     * @returns {Object} Point
     *
     * @example
     * point.add(5, 7);
     */
    multiply(arg0, arg1) {
        let pos = Point._parsePositionArgs(arg0, arg1)
        return new Point(this._x * pos.x, this._y * pos.y)
    }

    /**
     *
     * @param arg0 - x
     * @param arg1 - y
     * @returns {Point}
     */
    multiplySelf(arg0, arg1) {
        let pos = Point._parsePositionArgs(arg0, arg1)
        this._x = pos.x
        this._y = pos.y
        this._changed('matrix')
        return this
    }

    /**
     * returns the distance between the absolute coordinates and a given point
     *
     * @name Point#distance
     * @param {Number|Array|Object} arg0
     * @param {Number} [arg1]
     * @returns {Point}
     *
     * @example
     * Point.distance(5, 7);
     * Point.distance([5, 7]);
     * Point.distance({x:5, y:7});
     * Point.distance(new Point(5, 7)); //relative x,y of Point
     * Point.distance((new Point(5, 7)).position$); //absolute x,y of Point
     */
    distance(arg0, arg1) {
        let pos = Point._parsePositionArgs(arg0, arg1)

        var dx = this.x - pos.x;
        var dy = this.y - pos.y;

        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * returns the distance between the absolute coordinates and a given point
     *
     * @name Point#distance$
     * @param {Number|Array|Object} arg0$
     * @param {Number} [arg1$]
     * @returns {Point}
     *
     * @example
     * Point.distance$(5, 7);
     * Point.distance$([5, 7]);
     * Point.distance$({x:5, y:7});
     * Point.distance$(new Point(5, 7)); //relative x,y of Point
     * Point.distance$((new Point(5, 7)).position$); //absolute x,y of Point
     */
    distance$(arg0$, arg1$) {
        let pos
        if (arg0$ instanceof Point) { //use the absolute position if a Point is given
            pos = arg0$.position$
        } else {
            pos = Point._parsePositionArgs(arg0$, arg1$)
        }

        var dx = this.x$ - pos.x;
        var dy = this.y$ - pos.y;

        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     *
     * @name Point#lerp
     * @param {Number|Array|Object} arg0
     * @param {Number} [arg1]
     * @param p
     * @returns {Point}
     *
     * @example
     * Point.lerp(5, 7);
     * Point.lerp([5, 7]);
     * Point.lerp({x:5, y:7});
     * Point.lerp(new Point(5, 7));
     * todo check with lerp$
     */
    lerp(arg0, arg1, p) {
        let pos = Point._parsePositionArgs(arg0, arg1)
        p = p || arg1
        return new Point().set$(
            this.x$ + (pos.x - this.x$) * p,
            this.y$ + (pos.y - this.y$) * p
        )
    }

    /**
     *
     * @name Point#lerp$
     * @param {Number|Array|Object} arg0
     * @param {Number} [arg1]
     * @param p
     * @returns {Point}
     *
     * @example
     * Point.lerp(5, 7);
     * Point.lerp([5, 7]);
     * Point.lerp({x:5, y:7});
     * Point.lerp(new Point(5, 7));
     */
    lerp$(arg0, arg1, p) {
        let pos
        if (arg0 instanceof Point) { //use the absolute position if a Point is given
            pos = arg0.position$
        } else {
            pos = Point._parsePositionArgs(arg0, arg1)
        }

        p = p || arg1
        return new Point().set(
            this.x$ + (pos.x - this.x$) * p,
            this.y$ + (pos.y - this.y$) * p
        )
    }

    /**
     *
     * @name Point#lerpSelf
     * @param {Number|Array|Object} arg0
     * @param {Number} [arg1]
     * @param p
     * @returns {Point}
     *
     * @example
     * Point.lerpSelf(5, 7);
     * Point.lerpSelf([5, 7]);
     * Point.lerpSelf({x:5, y:7});
     * Point.lerpSelf(new Point(5, 7));
     */
    lerpSelf(arg0, arg1, p) {
        let pos = Point._parsePositionArgs(arg0, arg1)

        p = p || arg1

        this._x = this._x + (pos.x - this._x) * p
        this._y = this._y + (pos.y - this._y) * p

        this._changed('matrix')
        return this
    }

    /**
     * parses the input args and returns a point object with x and y coordinates
     *
     * @name Point#_parsePositionArgs
     * @static
     * @param {Number|Array|Object} arg0
     * @param {Number} [arg1]
     * @returns {{x,y}}
     *
     * @example
     * _parsePositionArgs(5, 7);
     * _parsePositionArgs([5, 7]);
     * _parsePositionArgs({x:5, y:7});
     * _parsePositionArgs(new Point(5, 7));
     */
    static _parsePositionArgs(arg0, arg1) {
        var type = typeof arg0,
            res = {}
        if (type === 'number') {
            var hasY = typeof arg1 === 'number'
            res.x = arg0
            res.y = hasY ? arg1 : arg0
        } else if (arg0 instanceof Point) {
            //todo may return the point, check if that breaks something
            //todo may also return x$ and y$ along x,y
            res.x = arg0._x
            res.y = arg0._y
        } else if (type === 'undefined' || arg0 === null) {
            res.x = res.y = 0
        } else {
            if (Array.isArray(arg0)) {
                res.x = arg0[0]
                res.y = arg0.length > 1 ? arg0[1] : arg0[0]
            } else if (arg0.x != null) {
                res.x = arg0.x
                res.y = arg0.y
            }
        }

        return res;
    }
}

export { Point }
