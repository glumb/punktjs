import { Point } from './Point'
import { Matrix } from './Matrix'

class Base extends Point {

    /**
     * Shape
     *
     */
    constructor(position = [0, 0], rotation = 0, scale = 1) {
        super(position)

        this._position = this
        this._rotation = rotation % 360
        this._rotationRad = this._rotation / 180 * Math.PI
        this._scale = scale

        // create matrices here to prevent using a new one when its parameters change
        this._matrix = new Matrix()
        this._matrix$ = new Matrix()
        this._matrixCache = null
        this._matrixCache$ = null
    }

    set scale(scale) {
        this._scale = scale
        this._changed('matrix')
    }

    get scale() {
        return this._scale
    }

    set rotation(rotation) {
        this._rotation = rotation % 360
        this._rotationRad = this._rotation / 180 * Math.PI
        this._changed('matrix')
    }

    get rotation() {
        return this._rotation
    }

    get rotation$() {
        return this.getRotation$()
    }

    /**
     *
     * @param {Number} [levels] - how many levels to travel up the hierarchy
     * @returns {Number}
     */
    getRotation$(levels = null) {
        if (this._parent && (!levels || --levels >= 0)) {

            return this._parent.getRotation$(levels) + this._rotation
        }

        return this._rotation
    }

    /**
     * set the absolute rotation
     *
     * @param angle
     */
    set rotation$(angle) {
        this.rotation = angle - this.rotation$ //todo _setRotation function
    }

    /**
     *
     * @param {Point} p - position passed to Point
     */
    set position(p) {
        this.set(p)
        this._changed('matrix')
    }

    /**
     *
     * @returns {Point}
     */
    get position() {
        return this
    }


    /**
     * fired, when a property of the matrix changed and it needs to be recomputed
     *
     * @private
     */
    _changed(what) {
        this._matrixCache = null

        /**
         *  TODO to be replaced by super._changed() when the super implementations performance is better
         */
        this._positionCache$ = null

        this._emit('changed')
        if (this._parent) {
            this._parent._childChanged(this)
        }
        for (let child of this._children) {
            child._parentChanged(true)
        }
    }

    /**
     *
     * @private
     */
    _parentChanged() {
        this._matrixCache$ = null

        /**
         *  TODO to be replaced by super._parentChanged() when the super implementations performance is better
         */

        this._positionCache$ = null
        for (let child of this._children) {
            child._parentChanged(false)
        }
    }


    /**
     *
     *
     *
     * @param {Number} [levels]
     * @returns {Matrix}
     */
    getMatrix$(levels = null) {
        if (this._matrixCache$) {
            return this._matrixCache$
        } else if (this._parent && (!levels || --levels >= 0)) {
            if (!levels) { //no lvls implies that the returned matrix will be absolute and can thus be cached
                // pre-multiplySelf to not create a new Matrix object, as multiply does
                this._matrixCache$ = this._matrix$.cloneProperties(this._getMatrix()).multiplySelf_(this._parent.getMatrix$(levels))
                return this._matrixCache$
            }
            return this._parent.getMatrix$(levels).multiply(this._getMatrix())
        } else {
            return this._getMatrix()
        }
    }

    /**
     *
     * @returns {Matrix}
     * @private
     */
    _getMatrix() {
        if (!this._matrixCache) {
            this._matrixCache = this._matrix.reset().rotate(this._rotationRad).translate(this._position._x, this._position._y)
        }

        return this._matrixCache
    }

    /**
     *
     * @param {Matrix} m
     */
    set matrix(m) {
        this._matrixCache = m
        this._changed('matrix')
    }

    /**
     *
     * @returns {Matrix}
     */
    get matrix() {
        return this._getMatrix()
    }

    transformBase() {
        if (this._parent) {

        }
    }

}

export { Base }
