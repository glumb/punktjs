'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Path = undefined;

var _Shape3 = require('./Shape');

var _Point = require('./Point');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 *
 */

var Path = (function (_Shape) {
    _inherits(Path, _Shape);

    /**
     *
     * @param {Array|number} arg0
     * @param arg1
     * @param arg2
     *
     * @example
     * var path = new Path([[3,5],[3,6]])
     */

    function Path(arg0, arg1, arg2) {
        _classCallCheck(this, Path);

        var position = [0, 0];

        if (Array.isArray(arg0) && Array.isArray(arg0[0])) {
            position = arg0[0];
        }

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Path).call(this, position));

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {

            for (var _iterator = arg0[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var segment = _step.value;

                _this.appendSegment(new Path.Segment(segment));
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        return _this;
    }

    _createClass(Path, [{
        key: 'appendSegment',
        value: function appendSegment(segment) {
            if (!(segment instanceof Path.Segment)) {
                segment = new Path.Segment(segment);
            }
            this.addChild(segment);
        }
    }, {
        key: 'getSegments',
        value: function getSegments() {
            return this._children;
        }
    }]);

    return Path;
})(_Shape3.Shape);

Path.Segment = (function (_Shape2) {
    _inherits(_class, _Shape2);

    /**
     *
     * @param {Point} position
     * @param {Point} [handleIn]
     * @param {Point} [handleOut]
     */

    function _class(position, handleIn, handleOut) {
        _classCallCheck(this, _class);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this, position));

        _this2._handleIn = handleIn ? new _Point.ExtendedPoint(handleIn) : null;
        _this2._handleOut = handleOut ? new _Point.ExtendedPoint(handleOut) : null;

        if (_this2._handleIn) _this2.addChild(_this2._handleIn);
        if (_this2._handleOut) _this2.addChild(_this2._handleOut);
        return _this2;
    }

    _createClass(_class, [{
        key: 'hasHandleIn',

        /**
         *
         * @returns {boolean}
         */
        value: function hasHandleIn() {
            return !!this._handleIn;
        }
    }, {
        key: 'hasHandleOut',
        value: function hasHandleOut() {
            return !!this._handleOut;
        }
    }, {
        key: 'position',
        get: function get() {
            return this._position;
        },
        set: function set(position) {
            this._position.set(position);
        }
    }, {
        key: 'handleIn',
        get: function get() {
            return this._handleIn;
        },
        set: function set(handle) {
            this._handleIn.set(handle);
        }
    }, {
        key: 'handleOut',
        get: function get() {
            return this._handleOut;
        },
        set: function set(handle) {
            this._handleOut.set(handle);
        }
    }]);

    return _class;
})(_Shape3.Shape);

exports.Path = Path;
//# sourceMappingURL=Path.js.map