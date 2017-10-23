import { RasterRenderer } from './RasterRenderer'
import ansi from 'ansi'
import { Shape } from './Shape'
import { Group } from './Group'

class TerminalRenderer extends RasterRenderer {
    /**
     *
     * @param {Number} width - Width of the canvas
     * @param {Number} height - Height of the canvas
     * @param {Number} scale - Scale of the canvas
     */
    constructor(width, height, scale = 1) {
        if (!process.stdout) throw 'A stdout is needed for this renderer'

        super()

        this._width = width
        this._height = height

        this._scale = scale //todo also change rendering based on upscaling
        this._ansi = ansi
        this._cursor = this._ansi(process.stdout) //todo rename to brush?
        this._stdo = process.stdout
        this._cols = this._stdo.columns
        this._rows = this._stdo.rows

        this._defaultColor = [130, 0, 22]
        this._currentColor = this._defaultColor
        this._defaultChar = '+'
        this._currentChar = this._defaultChar

        this._debug = false
        this._margin = 2
        this._doRenderGlobalCos = true
        this._renderGlobalCos()

        this._listeners = []
        this._listeners = []
    }

    render(Item, data) {
        //hide the cursor to prevent jitter
        this._cursor.hide()

        if (!Item) { //if all items should be rendered
            this.clear()
        } else {
            if (data) {
                if (data.color)
                    this.setColor(data.color[0], data.color[1], data.color[2])
                this._currentChar = data.char || this._defaultChar
            }
            if (this._debug && (Item instanceof Shape || Item instanceof Group))//todo if debug
                this.drawCoordinateSystem(Item.position.x$, Item.position.y$, Item.rotation$ || 0, 10, true)
        }

        super.render(Item)

        this._resetCursor()
    }

    clear() {
        this._cursor.reset()

        for (let y = 1; y < this._rows; y++) {
            this._cursor.goto(1, y)
            this._cursor.eraseLine()
        }

        if (this._doRenderGlobalCos)
            this._renderGlobalCos()
    }

    /**
     *
     * @param {Boolean} debug
     */
    set debug(debug) {
        this._debug = !!debug
    }

    /**
     *
     * @returns {Boolean}
     */
    get debug() {
        return this._debug
    }

    // Changes foreground color
    setColor(r, g, b) {
        this._cursor.fg.rgb(r, g, b);
    }

    // Changes background color
    backgroundColor(r, g, b) {
        this._cursor.bg.rgb(r, g, b);
    }

    _rasterizePoint(Point) {
        if (this._currentChar == this._defaultChar) {
            this._currentChar = 'x'
        }
        if (this._debug)
            this._text(Point.x$ + 2, Point.y$, Point.x$.toFixed(1) + ':' + Point.y$.toFixed(1))
        super._rasterizePoint(Point)
    }

    _colorPoint(x, y, char) {
        y /= 2

        if (this._doRenderGlobalCos) { //the cos offsets the rest by 2
            x += 2
            y += 1
        }

        if (!(
                x < 0 || y < 0 ||
                x > this._stdo.columns || y > this._stdo.rows ||
                x < 0 || y < 0 ||
                x > this._stdo.columns || y > this._stdo.rows
            )) {

            //add margin. +1 since rows, columns are indexed from 1
            x += this._margin + 1
            y += this._margin - 1 + 1

            x *= this._scale
            y *= this._scale

            //flip y
            y = this._rows - y

            this._cursor.goto(Math.floor(x), Math.floor(y)).write(char || this._currentChar);
        }
    }

    _text(x, y, text) {
        this._colorPoint(x, y, text.toString())
    }

    drawCoordinateSystem(x, y, rotation, length, label) {
        rotation %= 360
        var rotationRad = rotation / 180 * Math.PI || 0
        var origin = {x: x, y: y};
        var targetX = {x: (x + Math.cos(rotationRad) * length), y: (y + Math.sin(rotationRad) * length)};
        var targetY = {x: (x - Math.sin(rotationRad) * length), y: (y + Math.cos(rotationRad) * length)};


        this._currentChar = (rotation % 180 == 90) ? '│' : (rotation % 180 == 0) ? '─' : '·';
        this._rasterizeLine({
            x0: origin.x,
            y0: origin.y,
            x1: targetX.x,
            y1: targetX.y
        })
        this._currentChar = (rotation % 180 == 0) ? '│' : (rotation % 180 == 90) ? '─' : '·';
        this._rasterizeLine({
            x0: origin.x,
            y0: origin.y,
            x1: targetY.x,
            y1: targetY.y
        })
        this._currentChar = this._defaultChar

        this._colorPoint(Math.floor(origin.x), Math.floor(origin.y), (rotation == 0) ? '└' : (rotation == 90) ? '┘' : (rotation == 180) ? '┐' : (rotation == 270) ? '┌' : '·' + rotation)
        this._colorPoint(Math.floor(targetX.x), Math.floor(targetX.y),
            (rotation > 337.5) ? '>x' :
                (rotation > 292.5) ? '┘x' :
                    (rotation > 247.5) ? 'vx' :
                        (rotation > 202.5) ? 'x└' :
                            (rotation > 157.5) ? 'x<' :
                                (rotation > 112.5) ? 'x┌' :
                                    (rotation > 67.5) ? '^x' :
                                        (rotation > 22.5) ? '┐x' :
                                            '>x')

        this._colorPoint(Math.floor(targetY.x), Math.floor(targetY.y),
            ((rotation + 90) % 360 > 337.5) ? '>y' :
                ((rotation + 90) % 360 > 292.5) ? '┘y' :
                    ((rotation + 90) % 360 > 247.5) ? 'vy' :
                        ((rotation + 90) % 360 > 202.5) ? 'y└' :
                            ((rotation + 90) % 360 > 157.5) ? 'y<' :
                                ((rotation + 90) % 360 > 112.5) ? 'y┌' :
                                    ((rotation + 90) % 360 > 67.5) ? '^y' :
                                        ((rotation + 90) % 360 > 22.5) ? '┐y' :
                                            '>y')

        if (!rotation)
            for (var mark = 10; mark < length; mark += 10) {
                this._colorPoint(x + mark, y, '┬')
                this._colorPoint(x, y + mark, '┼')

                if (label) {

                    this._text(x + mark, y - 2, mark) //x
                    this._text(x - 2, y + mark, mark) //y
                }
            }
        this._resetCursorPosition()

    }

    _renderGlobalCos() {
        this.drawCoordinateSystem(0, 0, 0, (this._cols / 2 > this._rows) ? (this._rows - this._margin - 3) * 2 : this._cols - this._margin - 2, true)
    }

    _resetCursor() {
        //restore the initial cursor to keep it when the script ends
        this._cursor.reset()
        this._cursor.show()
        this._cursor.goto(this._cols, this._rows - 1);
    }

    _resetCursorPosition() {
        //restore the initial cursor to keep it when the script ends
        this._cursor.goto(this._cols, this._rows - 1);
    }

    handleInput() {
        var stdin = process.stdin;
        stdin.setRawMode(true);
        stdin.resume();
        stdin.setEncoding('utf8');

        stdin.on('data', (key) => {
            if (key === '[C') {
                this._emit('key.right')
            } else if (key === '[A') {
                this._emit('key.up')
            } else if (key == '[D') {
                this._emit('key.left')
            } else if (key == '[B') {
                this._emit('key.down')
            }
            this._emit('key.' + key)

            if (key == '' || key == 'q') {
                process.exit();
            }    // ctrl-c
            if (key == 'd') {
                this.debug = !this.debug;
            }
            this.render()
        });
    }

}

export { TerminalRenderer }
