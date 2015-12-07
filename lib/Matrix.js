class Matrix {
    constructor(a, b, c, d, tx, ty) {

        this._a = a.a
        this._b = a.b || b || 0
        this._c = a.c || c || 0 //for a.c:0
        this._d = a.d || d || 0
        this._tx = a.tx || tx || 0
        this._ty = a.ty || ty || 0
    }

    /**
     *
     * @returns {Number} - a
     */
    get a() {
        return this._a
    }

    /**
     *
     * @returns {Number} - b
     */
    get b() {
        return this._b
    }

    /**
     *
     * @returns {Number} - c
     */
    get c() {
        return this._c
    }

    /**
     *
     * @returns {Number} - d
     */
    get d() {
        return this._d
    }

    /**
     *
     * @returns {Number} - tx
     */
    get tx() {
        return this._tx
    }

    /**
     *
     * @returns {Number} - ty
     */
    get ty() {
        return this._ty
    }

    /**
     *
     * @param {Matrix} m
     *
     * [ a b tx ] [ a b tx ]
     * [ c d ty ] [ c d ty ]
     * [ 0 0 1  ] [ 0 0 1  ]
     */
    multiply(m) {
        return new Matrix({
            a:  this._a * m._a + this._b * m._c,
            b:  this._a * m._b + this._b * m._d,
            c:  this._c * m._a + this._d * m._c,
            d:  this._c * m._b + this._d * m._d,
            tx: this._a * m._tx + this._b * m._ty + this._tx,
            ty: this._c * m._tx + this._d * m._ty + this._ty
        })
    }


}

module.exports = Matrix