import { jsonEquals, randomInt } from '../../shared/utils.js'

export default class Food {
  constructor (snake) {
    this.__snake = snake
    this.__color = '#FFCDD2'
    this.__foodPosition = null
  }

  // Game Object
  get occupiedCells () {
    return [this.__foodPosition]
  }

  draw (context) {
    if (!this.__foodPosition) {
      return
    }
    context.fillStyle = this.__color
    context.fillCell(this.__foodPosition.x, this.__foodPosition.y)
  }

  update (args) {
    if (!this.__foodPosition) {
      this.__updateFoodPosition(args)
    } else if (jsonEquals(this.__foodPosition, this.__snake.head)) {
      this.__snake.grow(1)
      this.__updateFoodPosition(args)
      args.game.score += 10
    }
  }

  __updateFoodPosition (args) {
    while (true) {
      let pos = {
        x: randomInt(0, args.gridWidth),
        y: randomInt(0, args.gridHeight)
      }
      if (!this.__isOccupied(pos, args)) {
        this.__foodPosition = pos
        break
      }
    }
  }

  __isOccupied (pos, args) {
    return args.occupiedCells.findIndex(x => jsonEquals(x, pos)) > -1
  }
}
