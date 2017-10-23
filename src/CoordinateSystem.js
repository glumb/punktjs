class CoordinateSystem {
    /**
     *
     */
    constructor() {

    }

    createMatrix(a, b, c, d, tx, ty) {
        this._matrix = new Matrix(a, b, c, d, tx, ty)
    }
}

class Matrix {
    constructor(a, b, c, d, tx, ty) {
        this._a = a
        this._c = c
        this._b = b
        this._d = d
        this._tx = tx
        this._ty = ty
    }
}