"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Matrix = (function () {
    function Matrix(a, b, c, d, tx, ty) {
        _classCallCheck(this, Matrix);

        this._a = a.a;
        this._b = a.b || b || 0;
        this._c = a.c || c || 0; //for a.c:0
        this._d = a.d || d || 0;
        this._tx = a.tx || tx || 0;
        this._ty = a.ty || ty || 0;
    }

    /**
     *
     * @returns {Number} - a
     */

    _createClass(Matrix, [{
        key: "multiply",

        /**
         *
         * @param {Matrix} m
         *
         * [ a b tx ] [ a b tx ]
         * [ c d ty ] [ c d ty ]
         * [ 0 0 1  ] [ 0 0 1  ]
         */
        value: function multiply(m) {
            return new Matrix({
                a: this._a * m._a + this._b * m._c,
                b: this._a * m._b + this._b * m._d,
                c: this._c * m._a + this._d * m._c,
                d: this._c * m._b + this._d * m._d,
                tx: this._a * m._tx + this._b * m._ty + this._tx,
                ty: this._c * m._tx + this._d * m._ty + this._ty
            });
        }
    }, {
        key: "a",
        get: function get() {
            return this._a;
        }

        /**
         *
         * @returns {Number} - b
         */

    }, {
        key: "b",
        get: function get() {
            return this._b;
        }

        /**
         *
         * @returns {Number} - c
         */

    }, {
        key: "c",
        get: function get() {
            return this._c;
        }

        /**
         *
         * @returns {Number} - d
         */

    }, {
        key: "d",
        get: function get() {
            return this._d;
        }

        /**
         *
         * @returns {Number} - tx
         */

    }, {
        key: "tx",
        get: function get() {
            return this._tx;
        }

        /**
         *
         * @returns {Number} - ty
         */

    }, {
        key: "ty",
        get: function get() {
            return this._ty;
        }
    }]);

    return Matrix;
})();

module.exports = Matrix;

//# sourceMappingURL=Matrix-compiled.js.map