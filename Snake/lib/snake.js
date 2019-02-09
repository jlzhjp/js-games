import { jsonEquals } from '../../shared/utils.js'

let Direction = Object.freeze({
  UP: 2,
  RIGHT: 1,
  DOWN: -2,
  LEFT: -1,

  getOpposite: direction => -direction,
  getDirectionByArrowKey: key => {
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
        return null
    }
  }
})

export default class Snake {
  constructor (initLen) {
    this.__body = [{ x: 0, y: 0 }]
    this.__direction = Direction.RIGHT
    this.__growSize = initLen
    this.__killed = false
    this.__color = '#9AC9E7'
    this.__keyLock = false

    window.addEventListener('keydown', event => {
      if (this.__keyLock || !this.__isArrowKey(event.key)) {
        return
      }
      let direction = Direction.getDirectionByArrowKey(event.key)
      if (direction !== Direction.getOpposite(this.__direction)) {
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

  // Game Object
  get occupiedCells () {
    return this.body
  }

  update (args) {
    if (this.__killed) {
      args.game.stop()
      return
    }
    this.move(args.gridWidth, args.gridHeight)
    if (this.__body.slice(1).findIndex(p => jsonEquals(this.head, p)) > -1) {
      this.kill()
    }
    this.__keyLock = false
  }

  draw (context) {
    context.fillStyle = this.__color
    for (let point of this.__body) {
      context.fillCell(point.x, point.y)
    }
  }

  move (maxWidth, maxHeight) {
    switch (this.__direction) {
      case Direction.UP:
        this.__body.unshift({
          x: this.head.x,
          y: this.__reduceY(this.head.y, 1, maxHeight)
        })
        break
      case Direction.RIGHT:
        this.__body.unshift({
          x: this.__addX(this.head.x, 1, maxWidth),
          y: this.head.y
        })
        break
      case Direction.DOWN:
        this.__body.unshift({
          x: this.head.x,
          y: this.__addY(this.head.y, 1, maxHeight)
        })
        break
      case Direction.LEFT:
        this.__body.unshift({
          x: this.__reduceX(this.head.x, 1, maxWidth),
          y: this.head.y
        })
        break
      default:
        throw new Error('Unkdown enum value.')
    }

    if (this.__growSize === 0) {
      this.__body.pop()
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
}
