/**
 *
 */
class Hierarchy {

    constructor() {
        this._parent = null
        this._children = []

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
        this._children.push(child)
        child._parent = this
        this._childChanged()
    }

    addChild(child) {
        this._addChild(child)
        return this
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

    _childChanged(child){

    }

    _changed() {
        this._emit('changed')
        if (this._parent) {
            this._parent._childChanged(this)
        }
        for (let child of this._children) {
            child._parentChanged(true)
        }
    }


    _setParent(p) {//todo fix that. look into shape set
        this._parent = p
        p._children.push(this)
        this._changed() //todo only set properties in provate methods (_method() => this._property = 1)
    }

    set parent(p) {//todo fix that. look into shape set
        this._setParent(p)
    }

    setParent(p) {//todo fix that. look into shape set
        this._setParent(p)
        return this
    }

    _removeChild(child) {
        for (var i = 0; i < this._children.length; i++) {
            let c = this._children[i];
            if (c === child) {
                this._children.splice(i, 1)
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
