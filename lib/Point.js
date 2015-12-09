'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ExtendedPoint = exports.Point = undefined;

var _Matrix = require('./Matrix');

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *
 */

var Point = (function () {

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

    function Point() {
        var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
        var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

        _classCallCheck(this, Point);

        this._x = x;
        this._y = y;

        this._parent = null;
    }

    _createClass(Point, [{
        key: 'set',
        value: function set(x, y) {
            this._x = x;
            this._y = y;
        }
    }, {
        key: 'transform',

        /**
         * returns a new transformed Point
         *
         * @param matrix
         * @returns {Point}
         */
        value: function transform(matrix) {
            return this.clone().transformSelf(matrix);
        }

        /**
         * returns a copy of the point
         *
         * @returns {Point}
         */

    }, {
        key: 'clone',
        value: function clone() {
            return new Point(this._x, this._y);
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

    }, {
        key: 'transformSelf',
        value: function transformSelf(m) {
            //var matrix = matrix.multiply(new Matrix(1,0,0,1,this._x,this._y))

            var x = m.a * this._x + m.b * this._y + m.tx;
            var y = m.c * this._x + m.d * this._y + m.ty;
            this._x = x;
            this._y = y;
            return this;
        }
    }, {
        key: 'add',

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
        value: function add(x, y) {
            return new Point(this._x + x, this._y + y);
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

    }, {
        key: 'addSelf',
        value: function addSelf(x, y) {
            this._x += x;
            this._y += y;
            return this;
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

    }, {
        key: 'multiply',
        value: function multiply(x, y) {
            return new Point(this._x * x, this._y * y);
        }
    }, {
        key: 'distance',
        value: function distance(x, y) {
            var dx = this.x - x;
            var dy = this.y - y;

            return Math.sqrt(dx * dx + dy * dy);
        }
    }, {
        key: 'lerp',
        value: function lerp(x, y, p) {
            return new Point(this.x + (x - this.x) * p, this.y + (y - this.y) * p);
        }
    }, {
        key: 'coordinateSystem',
        set: function set(cos) {
            this._parent = cos;
        }
    }, {
        key: 'absolutePosition',
        get: function get() {
            if (this._parent) {
                return this.transform(this._parent.getAbsoluteMatrix());
            }
        }

        /**
         *
         * @returns {Number}
         */
        ,
        set: function set(pos) {
            //todo
            this._x = pos.x;
            this._y = pos.y;
        }
    }, {
        key: 'absoluteX',
        get: function get() {
            if (this._parent) {
                return this.absolutePosition._x;
            }
            return this._x;
        }

        /**
         *
         * @returns {Number}
         */

    }, {
        key: 'absoluteY',
        get: function get() {
            if (this._parent) {
                return this.absolutePosition._y;
            }
            return this._y;
        }

        /**
         *
         * @returns {Number}
         */

    }, {
        key: 'relativeX',
        get: function get() {

            return this._x;
        }

        /**
         *
         * @returns {Number}
         */

    }, {
        key: 'relativeY',
        get: function get() {

            return this._y;
        }

        /**
         *
         * @returns {Number}
         */

    }, {
        key: 'x',
        get: function get() {
            return this.absoluteX;
        }

        /**
         *
         * @param {Number} x
         */
        ,
        set: function set(x) {
            this._x = x;
        }

        /**
         *
         * @returns {Number}
         */

    }, {
        key: 'y',
        get: function get() {
            return this.absoluteY;
        }

        /**
         *
         * @param {Number} y
         */
        ,
        set: function set(y) {
            this._y = y;
        }
    }, {
        key: 'parent',
        set: function set(p) {
            //todo fix that. look into shape set
            this._parent = p;
        }
    }]);

    return Point;
})();

/**
 *
 */

var ExtendedPoint = (function (_Point) {
    _inherits(ExtendedPoint, _Point);

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

    function ExtendedPoint(arg0, arg1) {
        _classCallCheck(this, ExtendedPoint);

        var point = ExtendedPoint._parseArgs(arguments);
        return _possibleConstructorReturn(this, Object.getPrototypeOf(ExtendedPoint).call(this, point.x, point.y));
    }

    /**
     * parses the input args and returns a point object with x and y coordinates
     *
     * @param {Number[]|Object[]} args - [[y, x], []] [{x:x, y:y}, []] [x, y] [Point, []]
     * @returns {{x,y}}
     */

    _createClass(ExtendedPoint, [{
        key: 'set',

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
        value: function set(arg0, arg1) {
            var point = ExtendedPoint._parseArgs(arguments);
            return _get(Object.getPrototypeOf(ExtendedPoint.prototype), 'set', this).call(this, point.x, point.y);
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

    }, {
        key: 'add',
        value: function add(arg0, arg1) {
            var point = ExtendedPoint._parseArgs(arguments);
            return _get(Object.getPrototypeOf(ExtendedPoint.prototype), 'add', this).call(this, point.x, point.y);
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

    }, {
        key: 'addSelf',
        value: function addSelf(arg0, arg1) {
            var point = ExtendedPoint._parseArgs(arguments);
            _get(Object.getPrototypeOf(ExtendedPoint.prototype), 'addSelf', this).call(this, point.x, point.y);
            return this;
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

    }, {
        key: 'multiply',
        value: function multiply(arg0, arg1) {
            var point = ExtendedPoint._parseArgs(arguments);
            return _get(Object.getPrototypeOf(ExtendedPoint.prototype), 'multiply', this).call(this, point.x, point.y);
        }
    }, {
        key: 'distance',
        value: function distance(arg0, arg1) {
            var point = ExtendedPoint._parseArgs(arguments);
            return _get(Object.getPrototypeOf(ExtendedPoint.prototype), 'distance', this).call(this, point.x, point.y);
        }
    }, {
        key: 'lerp',
        value: function lerp(arg0, arg1, p) {
            var point = ExtendedPoint._parseArgs(arguments);
            p = p || arg1;
            console.log('lerp ', _get(Object.getPrototypeOf(ExtendedPoint.prototype), 'lerp', this).call(this, point.x, point.y, p));
            return _get(Object.getPrototypeOf(ExtendedPoint.prototype), 'lerp', this).call(this, point.x, point.y, p);
        }
    }], [{
        key: '_parseArgs',
        value: function _parseArgs(args) {
            var arg0 = args[0],
                arg1 = args[1],
                type = typeof arg0 === 'undefined' ? 'undefined' : _typeof(arg0),
                res = {};
            if (type === 'number') {
                var hasY = typeof arg1 === 'number';
                res.x = arg0;
                res.y = hasY ? arg1 : arg0;
            } else if (type === 'undefined' || arg0 === null) {
                res.x = res.y = 0;
            } else {
                if (Array.isArray(arg0)) {
                    res.x = arg0[0];
                    res.y = arg0.length > 1 ? arg0[1] : arg0[0];
                } else if (arg0.x != null) {
                    res.x = arg0.x;
                    res.y = arg0.y;
                }
            }

            return res;
        }
    }]);

    return ExtendedPoint;
})(Point);

exports.Point = Point;
exports.ExtendedPoint = ExtendedPoint;
//# sourceMappingURL=Point.js.map