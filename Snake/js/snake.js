let Direction = Object.freeze({
    UP: 2,
    RIGHT: 1,
    DOWN: -2,
    LEFT: -1,

    getOpposite: direction => -direction,
    getDirectionByKey: key => {
        switch (key) {
            case "ArrowUp":
                return Direction.UP
            case "ArrowRight":
                return Direction.RIGHT
            case "ArrowDown":
                return Direction.DOWN
            case "ArrowLeft":
                return Direction.LEFT
        }
    }
})

export default class Snake {
    constructor(game, grid) {
        this._game = game
        this._grid = grid
        this._body = [{ x: 0, y: 0 }]
        this._direction = Direction.RIGHT
        this._growSize = 15

        this._game.register('keydown', event => {
            let direction = Direction.getDirectionByKey(event.key)
            if (direction !== Direction.getOpposite(this._direction))
                this._direction = direction
        })

        this._grid.onrefresh.push(context => {
            this.move()
            context.fillStyle = '#B388FF'
            for (let point of this._body) {
                context.fillCell(point.x, point.y)
            }
        })
    }

    get head() {
        return this._body[0]
    }

    _addX(x, n) {
        return (x + n) % this._grid.XLength
    }

    _addY(y, n) {
        return (y + n) % this._grid.YLength
    }

    _reduceX(x, n) {
        if (x - n < 0)
            return this._grid.XLength + (x - n) % this._grid.XLength
        return x - n
    }

    _reduceY(y, n) {
        if (y - n < 0)
            return this._grid.YLength + (y - n) % this._grid.YLength
        return y - n
    }

    move() {
        switch (this._direction) {
            case Direction.UP:
                this._body.unshift({ x: this.head.x, y: this._reduceY(this.head.y, 1) })
                break
            case Direction.RIGHT:
                this._body.unshift({ x: this._addX(this.head.x, 1), y: this.head.y })
                break
            case Direction.DOWN:
                this._body.unshift({ x: this.head.x, y: this._addY(this.head.y, 1) })
                break
            case Direction.LEFT:
                this._body.unshift({ x: this._reduceX(this.head.x, 1), y: this.head.y })
                break
        }

        if (this._growSize === 0) {
            this._body.pop()
        } else {
            --this._growSize
        }
    }

    grow(n) {
        this._growSize += n
    }

    die() {
        this._game.stop()
    }
}
