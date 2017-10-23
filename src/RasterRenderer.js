/**
 * todo
 * - rectangle
 * - bezier curve
 *
 */

class RasterRenderer {
    constructor() {
        this.test = ''

        this._Items = []
        this._rasterizeFeatures = true //add center and coordinates
    }

    /**
     * renders all attached items or just the one given
     *
     * @param {Object} [Item]
     */
    render(Item) {
        if (!Item) {
            //render all attached
            this._emit('frame')
            for (let _Item of this._Items) {
                if (_Item) //prevent endless loop whe _Item is null
                    this.render(_Item, _Item._style)
            }
        } else if (Item.constructor.name == 'Circle') {
            this._rasterizeCircle(Item)
            if (this._rasterizeFeatures)
                this._rasterizePoint(Item.center)
        } else if (Item.constructor.name == 'Point' || Item.constructor.name == 'ExtendedPoint') {
            this._rasterizePoint(Item)
        } else if (Item.constructor.name == 'Path') {
            this._rasterizeCurve(Item)
        }
    }

    /**
     *
     * @param {Object} Item - Geometry Item
     * @param {Object} [data] - e.g Array [R, G, B] colors range 0-255
     */
    _add(Item, data = {}) {
        //todo check if is already attached
        Item._style = Object.assign({}, data) //copy the data object to not reference it
        return this._Items.push(Item)
    }

    attach(Item, data) {
        this._add(Item, data)
        return Item
    }

    attachAll(Items, data) {
        if (!Array.isArray(Items)) {
            Items = [Items]
        }
        var itemsReturn = []
        for (var obj of Items) {
            this._traverseRecursive(obj, (Item)=> {
                itemsReturn.push(Item)
                this._add(Item, data)
            })
        }

        return itemsReturn
    }

    _traverseRecursive(Item, cb) {
        if ('hasChildren' in Item && Item.hasChildren()) {
            for (var child of Item.children) {
                this._traverseRecursive(child, cb)
            }
        }
        cb(Item)
    }

    _remove(Item) {
        for (var i = 0; i < this._Items.length; i++) {
            var testItem = this._Items[i];
            if (testItem === Item) {
                this._Items.splice(i, 1)
            }
        }
    }

    detachAll(Items) {
        if (!Items) {
            return
        }
        if (!Array.isArray(Items)) {
            Items = [Items]
        }
        for (var obj of Items) {
            this._traverseRecursive(obj, (Item)=> {
                this._remove(Item)
            })
        }
    }

    _rasterizePoint(point) {
        this._colorPoint(point.x$, point.y$)
    }

    _rasterizeCircle(circle) {
        var xm = circle.center.x$,
            ym = circle.center.y$,
            r = circle.radius
        var x = -r, y = 0, err = 2 - 2 * r;
        /* bottom left to top right */
        do {
            this._colorPoint(xm - x, ym + y);
            this._colorPoint(xm - y, ym - x);
            this._colorPoint(xm + x, ym - y);
            this._colorPoint(xm + y, ym + x);
            r = err;
            if (r <= y) err += ++y * 2 + 1;
            if (r > x || err > y)   /* e_xy+e_x > 0 or no 2nd y-step */
                err += ++x * 2 + 1;
            /* -> x-step now */
        } while (x < 0);
    }

    _rasterizeLine(line) {
        var x0 = Math.floor(line.x0)//todo line.start.x$, whatever
        var y0 = Math.floor(line.y0) //todo use algorithm that ccan handle non integer input
        var x1 = Math.floor(line.x1)
        var y1 = Math.floor(line.y1)

        if (y0 % 1 != y1 % 1)//todo hack
            y0 -= .5

        var dx = Math.abs(x1 - x0),
            sx = x0 < x1 ? 1 : -1;
        var dy = -Math.abs(y1 - y0),
            sy = y0 < y1 ? 1 : -1;
        var err = dx + dy, e2;
        for (; ;) {
            this._colorPoint(x0, y0);
            e2 = 2 * err;
            if (e2 >= dy) {
                if (x0 == x1) break;
                err += dy;
                x0 += sx;
            }
            if (e2 <= dx) {
                if (y0 == y1) break;
                err += dx;
                y0 += sy;
            }
        }


    }

    _rasterizeCurve(Path) {
        var accuracy = 0.01;
        for (let Curve of Path.curves) {
            for (var dt = accuracy; dt <= 1; dt += accuracy) { // start Point is already defined

                var pos = Curve._positionAt$(dt)
                this._colorPoint(pos[0], pos[1]);
            }
        }
    }

    _colorPoint(x, y) {

    }

    /**
     *
     * @param {Path} Path
     * @private
     */
    _rasterizePath(Path) {
        for (var i = 0, Segments = Path.getSegments(); i < Segments.length; i++) {
            var Segment = Segments[i];
            if (!Segment.hasHandleOut() && i + 1 < Segments.length && !Segments[i + 1].hasHandleIn())
                this._rasterizeLine({
                    x0: Segment.position.x$,
                    y0: Segment.position.y$,
                    x1: Segments[i + 1].position.x$,
                    y1: Segments[i + 1].position.y$
                })
        }
    }

    on(types, cb) {
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
}

export { RasterRenderer }
