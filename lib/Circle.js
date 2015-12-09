'use strict';

var _set = function set(object, property, value, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent !== null) { set(parent, property, value, receiver); } } else if ("value" in desc && desc.writable) { desc.value = value; } else { var setter = desc.set; if (setter !== undefined) { setter.call(receiver, value); } } return value; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Circle = undefined;

var _Shape2 = require('./Shape');

var _Point = require('./Point');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @Class Circle
 */

var Circle = (function (_Shape) {
    _inherits(Circle, _Shape);

    /**
     * Shape
     *
     * @param {Array|Object} position - Point
     * @param {Number} radius - _radius
     */

    function Circle(position, radius) {
        _classCallCheck(this, Circle);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Circle).call(this, position));

        _this._center = new _Point.ExtendedPoint(0, 0);
        _this.addChild(_this._center);
        _this._radius = radius;
        return _this;
    }

    _createClass(Circle, [{
        key: 'getBoundingBox',
        value: function getBoundingBox() {

            var pointTl = new _Point.ExtendedPoint(this.center._x - this._radius, this.center._y + this._radius);
            var pointTr = new _Point.ExtendedPoint(this.center._x + this._radius, this.center._y + this._radius);
            var pointBr = new _Point.ExtendedPoint(this.center._x + this._radius, this.center._y - this._radius);
            var pointBl = new _Point.ExtendedPoint(this.center._x - this._radius, this.center._y - this._radius);

            pointTl._parent = this;
            pointTr._parent = this;
            pointBr._parent = this;
            pointBl._parent = this;
            return [pointTl, pointTr, pointBr, pointBl];
        }
    }, {
        key: 'center',
        set: function set(point) {
            this._center.set(point);
        },
        get: function get() {
            //todo this._center * this._positionMatrix (position*rotation*scale) point is responsible for this?

            return this._center;
        }
    }, {
        key: 'radius',
        set: function set(r) {
            this._radius = r;
        },
        get: function get() {
            return this._radius;
        }
    }, {
        key: 'area',
        get: function get() {
            return this._radius * this._radius * Math.PI;
        },
        set: function set(area) {
            this._radius = Math.sqrt(area / Math.PI);
        }
    }]);

    return Circle;
})(_Shape2.Shape);

var cachedCircle = (function (_Circle) {
    _inherits(cachedCircle, _Circle);

    /**
     * Shape
     *
     * @param {Array|Object} arg0 - Point
     * @param {Number} arg1 - _radius
     */

    function cachedCircle(arg0, arg1) {
        _classCallCheck(this, cachedCircle);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(cachedCircle).call(this, arg0, arg1));

        _this2.cache = {};
        _this2.cache.area = _this2.area;
        return _this2;
    }

    _createClass(cachedCircle, [{
        key: 'radius',
        set: function set(r) {
            this.cache.area = null;
            _set(Object.getPrototypeOf(cachedCircle.prototype), 'radius', r, this);
        }
    }, {
        key: 'area',
        get: function get() {
            return this.cache.area ? this.cache.area : this._radius * this._radius * Math.PI;
        }
    }]);

    return cachedCircle;
})(Circle);

// new Cached.Circle()
// new Friendly.Point()

exports.Circle = Circle;
//# sourceMappingURL=Circle.js.map