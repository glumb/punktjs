import {Base} from './Base'
import {Intersection} from './Shape'

class Group extends Base {

    constructor(position = [0, 0], rotation = 0, scale = 1) {
        super(position, rotation, scale)
    }

    addChild(child) {
        this._addChild(child)
        return this
    }

    /**
     *
     * @param {Hierarchy} children
     * @returns {Group}
     */
    addChildren(children) {
        this._addChildren(children)
        return this
    }

    intersect(testShape) {
        var testResult = new Intersection()
        for (let child of this._children) {
            testResult.merge(child.intersect(testShape))
        }
    }
}

export { Group }
