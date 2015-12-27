
/**
 * @Class Hierarchy
 */
class Hierarchy {

    constructor(parent = null, children = []) {
        this._parent = parent
        this._children = children

        this._listeners = {}
    }

    _on(types, cb) {
        types = (!Array.isArray(types)) ? [types] : types
        var handles = []
        for (let type of types) {
            if (!this._listeners[type])
                this._listeners[type] = []

            //push returns the length of the array, so the index is length-1
            handles.push(this._listeners[type].push(cb) - 1)
        }
        return handles //todo this may not work when items get removed by splice
    }


    _emit(type, value) {
        var listener = this._listeners[type]
        if (listener)
            for (let cb of listener) {
                cb(value)
            }
    }

    _addChild(child) {
        Hierarchy._link(child, this)
    }

    addChild(child) {
        this._addChild(child)
        return this
    }

    /**
     *
     * @param {Hierarchy} children
     * @returns {Hierarchy}
     */
    addChildren(children) {
        for (let child of children) {
            this._addChild(child)
        }
        return this
    }

    /**
     *
     * @returns {Array<Hierarchy>}
     */
    get children() {
        return this._children
    }

    /**
     *
     * @returns {boolean}
     */
    hasChildren() {
        return this._children.length > 0
    }

    /**
     *
     * @returns {boolean}
     */
    hasParent() {
        return !!this._parent
    }

    /**
     *
     * @private
     */
    _parentChanged(immediate) {
        for (let child of this._children) {
            child._parentChanged(false)
        }
    }

    /**
     *
     * @param child
     * @private
     */
    _childChanged(child) {

    }

    /**
     *
     * @private
     */
    _changed() {
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
     * @param {Hierarchy} parent
     * @private
     */
    _setParent(parent) {//todo fix that. look into shape set
        Hierarchy._link(this, parent)
    }

//todo only set properties in provate methods (_method() => this._property = 1)
    /**
     *
     * @param {Hierarchy} p
     */
    set parent(p) {//todo fix that. look into shape set
        this._setParent(p)
    }

    /**
     *
     * @returns {Hierarchy}
     */
    get parent() {
        return this._parent
    }

    /**
     *
     * @param p
     * @returns {Hierarchy}
     */
    setParent(p) {//todo fix that. look into shape set
        this._setParent(p)
        return this
    }

    /**
     *
     * @param {Hierarchy} child
     */
    removeChild(child) {
        this._removeChild(child)
    }

    /**
     *
     * @param {Array<Hierarchy>} children
     */
    removeChildren(children = this._children.slice(0)) { //copy the children array, since we are removing from it
        for (let child of children) {
            this._removeChild(child)
        }
    }

    _removeChild(child) {
        Hierarchy._unlink(child, this)
    }

    _removeParent() {
        Hierarchy._unlink(this, this._parent)
    }

    /**
     *
     * @param {Hierarchy} child
     * @param {Hierarchy} parent
     * @private
     */
    static _link(child, parent) {
        parent._children.push(child)
        child._parent = parent
        parent._childChanged()
        child._parentChanged()
    }

    /**
     *
     * @param {Hierarchy} child
     * @param {Hierarchy} parent
     * @private
     */
    static _unlink(child, parent) {
        child._parent = null
        child._parentChanged()
        for (var i = 0; i < parent._children.length; i++) {
            let c = parent._children[i];
            if (c === child) {
                parent._children.splice(i, 1)
                parent._childChanged(child)
            }
        }
    }

    _destroy() {
        this._parent._removeChild(this)
        for (var i = 0; i < this._children.length; i++) {
            var child = this._children[i];
            child._destroy()
        }
    }

    destroy() {
        this._destroy()
    }
}

export { Hierarchy }
