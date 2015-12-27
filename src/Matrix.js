/**
 * @Class Matrix
 */
class Matrix {
    constructor(a = 1, b = 0, c = 0, d = 1, tx = 0, ty = 0) {

        this._a = a.a || a
        this._b = a.b || b
        this._c = a.c || c  //for a.c:0
        this._d = a.d || d
        this._tx = a.tx || tx
        this._ty = a.ty || ty

        //todo decompose no?!
        this._translation = {x: tx, y: ty}
        this._rotation = 0
        this._scale = 0
    }

    reset() {
        this._a = 1
        this._b = 0
        this._c = 0
        this._d = 1
        this._tx = 0
        this._ty = 0

        return this
    }

    cloneProperties(m) {
        this._a = m._a
        this._b = m._b
        this._c = m._c
        this._d = m._d
        this._tx = m._tx
        this._ty = m._ty

        return this
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

    clone() {
        return new Matrix(this._a, this._b, this._c, this._d, this._tx, this._ty)
    }

    /**
     * mul
     *
     * @param {Matrix} m
     *
     * [ a b tx ] [ a b tx ]
     * [ c d ty ] [ c d ty ]
     * [ 0 0 1  ] [ 0 0 1  ]
     */
    multiply(m) {
        return this.clone().multiplySelf(m)
    }

    /**
     * post this * m
     *
     * @param {Matrix} m
     *
     * [ a b tx ] [ a b tx ]
     * [ c d ty ] [ c d ty ]
     * [ 0 0 1  ] [ 0 0 1  ]
     */
    multiplySelf(m) {
        let a = this._a * m._a + this._b * m._c
        let b = this._a * m._b + this._b * m._d
        let c = this._c * m._a + this._d * m._c
        let d = this._c * m._b + this._d * m._d
        let tx = this._a * m._tx + this._b * m._ty + this._tx
        let ty = this._c * m._tx + this._d * m._ty + this._ty

        this._a = a
        this._b = b
        this._c = c
        this._d = d
        this._tx = tx
        this._ty = ty

        return this
    }

    //todo consider using this._calculates$ to cache the values
    //if the values are not calculated, mark them as stale
    setProperties(rotation = 0, translationX = 0, translationY = 0, scale = 1) {

        var cos = Math.cos(rotation)
        var sin = Math.sin(rotation)


        this._a = scale * cos
        this._b = -sin
        this._tx = translationX
        this._c = sin
        this._d = scale * cos
        this._ty = translationY

        return this
    }

    /**
     * pre m * this
     *
     * @param {Matrix} m
     *
     * [ a b tx ] [ a b tx ]
     * [ c d ty ] [ c d ty ]
     * [ 0 0 1  ] [ 0 0 1  ]
     */
    multiplySelf_(m) {
        let a = m._a * this._a + m._b * this._c
        let b = m._a * this._b + m._b * this._d
        let c = m._c * this._a + m._d * this._c
        let d = m._c * this._b + m._d * this._d
        let tx = m._a * this._tx + m._b * this._ty + m._tx
        let ty = m._c * this._tx + m._d * this._ty + m._ty

        this._a = a
        this._b = b
        this._c = c
        this._d = d
        this._tx = tx
        this._ty = ty

        return this
    }

    translate(tx, ty) {
        this._translation = {x: tx, y: ty}

        this.multiplySelf_({
            _a: 1, _b: 0, _tx: tx,
            _c: 0, _d: 1, _ty: ty
        })

        return this
    }

    rotate(rotationRad) {
        this._rotation += rotationRad

        var cos = Math.cos(rotationRad)
        var sin = Math.sin(rotationRad)

        this.multiplySelf_({
            _a: cos, _b: -sin, _tx: 0,
            _c: sin, _d: cos, _ty: 0
        })

        return this
    }

    //todo may lead to incremental errors
    set rotation(rotationRad) {//todo rotation is applied after the other transformations, does this still make sense?
        let rotate = rotationRad - this._rotation
        this._rotation = rotationRad

        var cos = Math.cos(rotate)
        var sin = Math.sin(rotate)

        this.multiplySelf({
            _a: cos, _b: -sin, _tx: 0,
            _c: sin, _d: cos, _ty: 0
        })
    }

    get rotation() {
        return this._rotation
    }

    /**
     *
     * @param {Number} sx - scaling in x, y or only x if no sy given
     * @param {Number} [sy=sx] - scaling in y direction
     */
    scale(sx, sy = sx) {
        this._scale = {x: sx, y: sy}

        this.multiplySelf({
            _a: sx, _b: 0, _tx: 0,
            _c: 0, _d: sy, _ty: 0
        })

        return this
    }

    /**
     *
     * @returns {Matrix}
     */
    inverse() {
        //
        //if (this.isIdentity()) {
        //    return new Matrix();
        //}
        if (!this.isInvertible()) {
            throw "Matrix is not invertible.";
        } else {
            var a = this._a,
                b = this._b,
                tx = this._tx,
                c = this._c,
                d = this._d,
                ty = this._ty

            var det = this.determinant()

            return new Matrix(
                d / det, //a
                -b / det, //b
                -c / det, //c
                a / det, //d
                (b * ty - d * tx) / det, //tx
                -(a * ty - c * tx) / det //ty
            );
        }

    }

    /**
     *
     * @returns {Number}
     */
    determinant() {
        return this._a * this._d - this._b * this._c;
    }

    /**
     * Returns true if matrix is invertible
     * @returns {boolean}
     */
    isInvertible() {
        return !this._eq(this.determinant(), 0)
    }

    /**
     * equals with given precision
     *
     * @param value0
     * @param value1
     * @returns {boolean}
     * @private
     */
    _eq(value0, value1) {
        return Math.abs(value0 - value1) < 1e-14
    }

    toString() {
        return `
         [ ${this._a} ${this._b} ${this._tx} ]
         [ ${this._c} ${this._d} ${this._ty} ]
         [ 0 0 1 ]
        `
    }
}

export { Matrix }
