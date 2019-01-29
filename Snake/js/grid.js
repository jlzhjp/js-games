export default class Grid {
    constructor(game, xLength, yLength) {
        this._background = 'white'
        this._height = game.mapHeight
        this._width = game.mapWidth
        this._xLength = xLength
        this._yLength = yLength
        this._cellWidth = this._width / xLength
        this._cellHeight = this._height / yLength
        this._onrefresh = []

        game.onrefresh.push(context => {
            context.fillStyle = this._background
            context.fillRect(0, 0, this._width, this._height)
            for (let listener of this._onrefresh) {
                listener(this._getDrawingContext(context))
            }
        })
    }

    get onrefresh() {
        return this._onrefresh
    }

    get XLength() {
        return this._xLength
    }

    get YLength() {
        return this._yLength
    }

    _getDrawingContext(context) {
        return {
            set fillStyle(value) {
                context.fillStyle = value
            },
            get fillStyle() {
                return context.fillStyle
            },
            fillCell: (x, y) => {
                context.fillRect(
                    this._cellWidth * x,
                    this._cellHeight * y,
                    this._cellWidth,
                    this._cellHeight
                )
            }
        }
    }
}
