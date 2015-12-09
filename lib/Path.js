'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Path = undefined;

var _Shape2 = require('./Shape');

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
     */

    function Path(arg0, arg1, arg2) {
        _classCallCheck(this, Path);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Path).call(this));
    }

    return Path;
})(_Shape2.Shape);

Path.Segment = (function () {
    function _class() {
        _classCallCheck(this, _class);
    }

    return _class;
})();

exports.Path = Path;
//# sourceMappingURL=Path.js.map