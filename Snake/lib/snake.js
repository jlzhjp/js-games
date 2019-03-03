import Coordinate from '../../extensions/coordinate.js'
import Enum from '../../extensions/enum.js'

let Direction = Enum({
  UP: 2,
  RIGHT: 1,
  DOWN: -2,
  LEFT: -1
})

export default class Snake {
  constructor (event) {
    this.__body = [ new Coordinate(0, 0) ]
    this.__direction = Direction.RIGHT
    this.__growSize = 3
    this.__killed = false
    this.__color = '#9AC9E7'
    this.__keyLock = false
    this.__event = event

    this.__event.register('snakemove')

    this.__event.listen('gridupdate', (args) => this.update(args))
    this.__event.listen('gridredraw', (args) => this.draw(args))

    window.addEventListener('keydown', event => {
      if (this.__keyLock || !this.__isArrowKey(event.key)) {
        return
      }
      let direction = this.__getDirectionByArrowKey(event.key)
      if (direction !== this.__getOppositeDirection(this.__direction)) {
        this.__direction = direction
      }
      this.__keyLock = true
    })
  }

  get head () {
    return this.__body[0]
  }
  get body () {
    return this.__body
  }
  get length () {
    return this.__body.length
  }

  update (args) {
    if (this.__killed) {
      args.game.stop()
      return
    }
    this.move(args)
    if (this.__body.slice(1).findIndex(p => p.equals(this.head)) > -1) {
      this.kill()
    }
    this.__keyLock = false
  }

  draw (args) {
    args.context.fillStyle = this.__color
    for (let point of this.__body) {
      args.context.fillCell(point.x, point.y)
    }
  }

  move (args) {
    let maxWidth = args.gridWidth
    let maxHeight = args.gridHeight
    let newHead = null
    switch (this.__direction) {
      case Direction.UP:
        newHead = new Coordinate(this.head.x, this.__reduceY(this.head.y, 1, maxHeight))
        break
      case Direction.RIGHT:
        newHead = new Coordinate(this.__addX(this.head.x, 1, maxWidth), this.head.y)
        break
      case Direction.DOWN:
        newHead = new Coordinate(this.head.x, this.__addY(this.head.y, 1, maxHeight))
        break
      case Direction.LEFT:
        newHead = new Coordinate(this.__reduceX(this.head.x, 1, maxWidth), this.head.y)
        break
      default:
        throw new Error('Unkdown enum value.')
    }

    this.__body.unshift(newHead)
    this.__event.trigger('occupycell', { cell: newHead })
    this.__event.trigger('snakemove', {
      snake: this,
      maxWidth,
      maxHeight,
      occupiedCells: args.occupiedCells
    })

    if (this.__growSize === 0) {
      this.__event.trigger('releasecell', { cell: this.__body.pop() })
    } else {
      --this.__growSize
    }
  }

  grow (n) {
    this.__growSize += n
  }

  kill () {
    this.__killed = true
  }

  __isArrowKey (key) {
    return /^Arrow\w+$/.test(key)
  }

  __addX (x, n, max) {
    return (x + n) % max
  }

  __addY (y, n, max) {
    return (y + n) % max
  }

  __reduceX (x, n, max) {
    if (x - n < 0) {
      return max + ((x - n) % max)
    }
    return x - n
  }

  __reduceY (y, n, max) {
    if (y - n < 0) {
      return max + ((y - n) % max)
    }
    return y - n
  }

  __getOppositeDirection (direction) {
    return -direction
  }

  __getDirectionByArrowKey (key) {
    switch (key) {
      case 'ArrowUp':
        return Direction.UP
      case 'ArrowRight':
        return Direction.RIGHT
      case 'ArrowDown':
        return Direction.DOWN
      case 'ArrowLeft':
        return Direction.LEFT
      default:
        throw new Error('Is not an arrow key.')
    }
  }
}
