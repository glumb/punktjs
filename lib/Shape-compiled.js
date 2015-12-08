'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Point = require('./Point-compiled');
var Matrix = require('./Matrix-compiled');

/**
 *
 */

var Shape = (function () {

    /**
     * Shape
     *
     */

    function Shape() {
        var position = arguments.length <= 0 || arguments[0] === undefined ? [0, 0] : arguments[0];
        var rotation = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

        _classCallCheck(this, Shape);

        this._position = new Point(position);
        this.rotation = rotation;
        this._children = [];
    }

    _createClass(Shape, [{
        key: 'getBoundingBox',
        //todo check if thats right. or just add the parent to the PositionPoint
        value: function getBoundingBox() {}

        /**
         *
         * @returns {Matrix}
         */

    }, {
        key: 'getAbsoluteMatrix',
        value: function getAbsoluteMatrix() {
            if (this._parent) {
                return this._parent.getAbsoluteMatrix().multiply(this.getMatrix());
            } else {
                return this.getMatrix();
            }
        }
    }, {
        key: 'getMatrix',
        value: function getMatrix() {
            //todo cache matrix?
            var rotation = new Matrix({
                a: Math.cos(this._rotationRad), b: -Math.sin(this._rotationRad), tx: 0,
                c: Math.sin(this._rotationRad), d: Math.cos(this._rotationRad), ty: 0
            });

            var translation = new Matrix({
                a: 1, b: 0, tx: this._position._x,
                c: 0, d: 1, ty: this._position._y
            });

            return translation.multiply(rotation);
        }
    }, {
        key: 'addChild',
        value: function addChild(child) {
            this.link(child, this);
            return this;
        }
    }, {
        key: 'setParent',
        value: function setParent(parent) {
            this.link(this, parent);
            return this;
        }

        /**
         *
         * @param {Shape|Point} child
         * @param {Shape} parent
         */

    }, {
        key: 'link',
        value: function link(child, parent) {
            parent._children.push(child);
            child.parent = parent;
        }
    }, {
        key: 'transformBase',
        value: function transformBase() {
            if (this._parent) {}
        }
    }, {
        key: 'intersect',
        value: function intersect(Shape) {
            //or add the type to the object this.type - nah
            if (this.constructor.name == 'Circle' && Shape.constructor.name == 'Circle') {
                return this._intersectCircleCircle(Shape.center, Shape._radius, this.center, this._radius);
            }
        }
    }, {
        key: 'isOutside',
        value: function isOutside(Shape) {
            return this.intersect(Shape).isOutside();
        }
    }, {
        key: '_intersectCircleCircle',
        value: function _intersectCircleCircle(c1, r1, c2, r2) {
            var result;

            // Determine minimum and maximum radii where circles can intersect
            var r_max = r1 + r2;
            var r_min = Math.abs(r1 - r2);

            // Determine actual distance between circle circles
            var c_dist = c1.distance(c2);

            if (c_dist > r_max) {
                result = new Intersection(TestResult.OUTSIDE);
            } else if (c_dist < r_min) {
                result = new Intersection(TestResult.INSIDE);
            } else {
                var points = [];

                var a = (r1 * r1 - r2 * r2 + c_dist * c_dist) / (2 * c_dist);
                var h = Math.sqrt(r1 * r1 - a * a);
                var tmp = c_dist == 0 ? 0 : a / c_dist;
                var p = c1.lerp(c2, tmp);
                var b = c_dist == 0 ? 0 : h / c_dist;

                points.push(new Point(p.x - b * (c2.y - c1.y), p.y + b * (c2.x - c1.x)));

                if (b !== 0) //on.y one touching point
                    points.push(new Point(p.x + b * (c2.y - c1.y), p.y - b * (c2.x - c1.x)));

                result = new Intersection(TestResult.INTERSECTION, points);
            }

            return result;
        }
    }, {
        key: 'scale',
        set: function set(scale) {
            this._scale = scale;
        }
    }, {
        key: 'rotation',
        set: function set(rotation) {
            this._rotation = rotation % 360;
            this._rotationRad = this._rotation / 180 * Math.PI;
        },
        get: function get() {
            return this._rotation;
        }
    }, {
        key: 'absRotation',
        get: function get() {
            if (this._parent) {
                return this._parent.absRotation + this._rotation;
            }

            return this._rotation;
        }
    }, {
        key: 'position',
        set: function set(p) {
            this._position.set(p);
        },
        get: function get() {
            return this._position;
        }
    }, {
        key: 'parent',
        set: function set(parent) {
            //todo a COS may extend a Point: Point+rotation=COS
            this._parent = parent; //remove this and rely on position.parent only?
            this._position._parent = parent;
        }
    }]);

    return Shape;
})();

var TestResult = (function () {
    function TestResult(type) {
        _classCallCheck(this, TestResult);

        this.type = type;
    }

    _createClass(TestResult, [{
        key: 'is',
        value: function is(str) {
            return this.type == str;
        }
    }, {
        key: 'isInside',
        value: function isInside() {
            return this.is(TestResult.INSIDE);
        }
    }, {
        key: 'isOutside',
        value: function isOutside() {
            return this.is(TestResult.OUTSIDE);
        }
    }, {
        key: 'isIntersection',
        value: function isIntersection() {
            return this.is(TestResult.INTERSECTION);
        }
    }]);

    return TestResult;
})();

TestResult.INTERSECTION = 'INTERSECTION';
TestResult.INSIDE = 'INSIDE';
TestResult.OUTSIDE = 'OUTSIDE';

var Intersection = (function (_TestResult) {
    _inherits(Intersection, _TestResult);

    function Intersection(type, points) {
        _classCallCheck(this, Intersection);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Intersection).call(this, type));

        _this.points = points;
        return _this;
    }

    return Intersection;
})(TestResult);

module.exports = Shape;

//# sourceMappingURL=Shape-compiled.js.map