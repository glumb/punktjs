"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CoordinateSystem = (function () {
    /**
     *
     */

    function CoordinateSystem() {
        _classCallCheck(this, CoordinateSystem);
    }

    _createClass(CoordinateSystem, [{
        key: "createMatrix",
        value: function createMatrix(a, b, c, d, tx, ty) {
            this._matrix = new Matrix(a, b, c, d, tx, ty);
        }
    }]);

    return CoordinateSystem;
})();

var Matrix = function Matrix(a, b, c, d, tx, ty) {
    _classCallCheck(this, Matrix);

    this._a = a;
    this._c = c;
    this._b = b;
    this._d = d;
    this._tx = tx;
    this._ty = ty;
};
//# sourceMappingURL=CoordinateSystem.js.map