import { randomInt } from '../../shared/utils.js'
import Coordinate from '../../extensions/coordinate.js'

export default class Food {
  constructor (event) {
    this.__color = '#FFCDD2'
    this.__foodPosition = null
    this.__event = event

    this.__event.listen('gridredraw', (args) => this.draw(args))
    this.__event.listen('snakemove', (args) => {
      if (!this.__foodPosition) {
        this.__updateFoodPosition(args)
      }
      if (this.__foodPosition.equals(args.snake.head)) {
        args.snake.grow(1)
        this.__event.trigger('releasecell', { cell: this.__foodPosition })
        this.__event.trigger('score', { score: 10 })
        this.__updateFoodPosition(args)
      }
    })
  }

  draw (args) {
    if (!this.__foodPosition) {
      return
    }
    args.context.fillStyle = this.__color
    args.context.fillCell(this.__foodPosition.x, this.__foodPosition.y)
  }

  __updateFoodPosition (args) {
    while (true) {
      let pos = new Coordinate(randomInt(0, args.maxWidth), randomInt(0, args.maxHeight))
      if (!this.__isOccupied(pos, args)) {
        this.__foodPosition = pos
        this.__event.trigger('occupycell', { cell: pos })
        break
      }
    }
  }

  __isOccupied (pos, args) {
    return args.occupiedCells.findIndex(x => x.equals(pos)) > -1
  }
}
