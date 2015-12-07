const Matrix = require('./Matrix-compiled')

/**
 *
 */
class Point {

    /**
     * Creates a Point object with the given x and y coordinates.
     *
     * @name Point#constructor
     * @param {Number} [x]
     * @param {Number} [y]
     *
     * @example
     * new Point(5, 7);
     */
    constructor(x = 0, y = 0) {
        this._x = x;
        this._y = y;

        this._parent = null
    }

    set(x, y) {
        this._x = x;
        this._y = y;
    }

    set coordinateSystem(cos) {
        this._parent = cos
    }

    get absolutePosition() {
        if (this._parent) {
            return this.transform(this._parent.getAbsoluteMatrix())
        }
    }

    /**
     *
     * @returns {Number}
     */
    get absoluteX() {
        if (this._parent) {
            return this.absolutePosition._x
        }
        return this._x
    }

    /**
     *
     * @returns {Number}
     */
    get absoluteY() {
        if (this._parent) {
            return this.absolutePosition._y
        }
        return this._y
    }

    /**
     *
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
        return this.absoluteX
    }

    /**
     *
     * @param {Number} x
     */
    set x(x) {
        this._x = x
    }

    /**
     *
     * @returns {Number}
     */
    get y() {
        return this.absoluteY
    }

    /**
     *
     * @param {Number} y
     */
    set y(y) {
        this._y = y
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
        return new Point(this._x, this._y)
    }

    /**
     * returns a new transformed Point
     *
     * @param matrix
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
        return this
    }

    set absolutePosition(pos) {
        //todo
        this._x = pos.x
        this._y = pos.y
    }

    set parent(p){//todo fix that. look into shape set
        this._parent = p
    }

    /**
     * adds and returns a new point
     *
     * @name Point#add
     * @param {Number} x
     * @param {Number} y
     * @returns {Object} Point
     *
     * @example
     * point.add(5, 7);

     */
    add(x, y) {
        return new Point(this._x + x, this._y + y)
    }

    /**
     * adds to the current point
     *
     * @name Point#add
     * @param {Number} x
     * @param {Number} y
     *
     * @example
     * point.add(5, 7);
     */
    addSelf(x, y) {
        this._x += x
        this._y += y
        return this
    }


    /**
     * multiplies
     *
     * @name Point#add
     * @param {Number} x
     * @param {Number} y
     * @returns {Object} Point
     *
     * @example
     * point.add(5, 7);
     */
    multiply(x, y) {
        return new Point(this._x * x, this._y * y)
    }

    distance(x, y) {
        var dx = this.x - x;
        var dy = this.y - y;

        return Math.sqrt(dx * dx + dy * dy);
    }

    lerp(x, y, p) {
        return new Point(
            this.x + (x - this.x) * p,
            this.y + (y - this.y) * p
        )
    }

}


/**
 *
 */
class ExtendedPoint extends Point {

    /**
     * Creates a Point object with the given x and y coordinates.
     *
     * @name Point#constructor
     * @param {Number|Array|Object} arg0
     * @param {Number} [arg1]
     *
     * @example
     * new Point(5, 7);
     * new Point([5, 7]);
     * new Point({x:5, y:7});
     * new Point(new Point(5, 7));
     */
    constructor(arg0, arg1) {
        var point = ExtendedPoint._parseArgs(arguments);
        super(point.x, point.y)
    }

    /**
     * parses the input args and returns a point object with x and y coordinates
     *
     * @param {Number[]|Object[]} args - [[y, x], []] [{x:x, y:y}, []] [x, y] [Point, []]
     * @returns {{x,y}}
     */
    static _parseArgs(args) {
        var arg0 = args[0],
            arg1 = args[1],
            type = typeof arg0,
            res = {}
        if (type === 'number') {
            var hasY = typeof arg1 === 'number'
            res.x = arg0
            res.y = hasY ? arg1 : arg0
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


    /**
     * sets the coordinates
     *
     * @name Point#add
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
    set(arg0, arg1) {
        var point = ExtendedPoint._parseArgs(arguments)
        return super.set(point.x, point.y)
    }

    /**
     * adds and returns a new point
     *
     * @name Point#add
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
    add(arg0, arg1) {
        var point = ExtendedPoint._parseArgs(arguments)
        return super.add(point.x, point.y)
    }

    /**
     * adds to the current point
     *
     * @name Point#add
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
        var point = ExtendedPoint._parseArgs(arguments)
        super.addSelf(point.x, point.y)
        return this
    }


    /**
     * multiplies
     *
     * @name Point#add
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
    multiply(arg0, arg1) {
        var point = ExtendedPoint._parseArgs(arguments)
        return super.multiply(point.x, point.y)
    }

    distance(arg0, arg1) {
        var point = ExtendedPoint._parseArgs(arguments)
        return super.distance(point.x, point.y)
    }

    lerp(arg0, arg1, p) {
        var point = ExtendedPoint._parseArgs(arguments)
        p = p || arg1
        console.log('lerp ', super.lerp(point.x, point.y, p))
        return super.lerp(point.x, point.y, p)
    }


}

module.exports = ExtendedPoint