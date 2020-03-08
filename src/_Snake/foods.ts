import _ from 'lodash'
import Events from '../events'
import Coordinate from '../utils/coordinate'
import { randomItem } from '../utils/random'
import { GridRedrawEventArgs, SnakeGrowEventArgs, SnakeMoveEventArgs } from './eventArgs'

export default class Foods {
  private _events: Events
  private _color: string = '#FFCDD2'
  private _currentPos: Coordinate = new Coordinate(0, 0)
  private _posUpdated: boolean = false

  constructor(events: Events) {
    this._events = events

    this._events.get<GridRedrawEventArgs>('gridredraw').subscribe({
      next: args => this.draw(args)
    })
    this._events.get<SnakeMoveEventArgs>('snakemove').subscribe({
      next: args => {
        if (!this._posUpdated) {
          this.updateFoodPosition(args)
        }
        if (this._currentPos.equals(args.head)) {
          this._events.emitDefault('snakegrow', new SnakeGrowEventArgs(1))
          // Since the snake head has overried the food, there is no need to released it.
          // this._events.emitDefault('releasecell', new CellChangedEventArgs(this._currentPos))
          this._events.emitDefault('score', { score: 10 })
          this.updateFoodPosition(args)
        }
      }
    })
  }

  protected draw(ctx: GridRedrawEventArgs) {
    if (!this._posUpdated) return
    ctx.fillStyle = this._color
    ctx.fillCell(this._currentPos.x, this._currentPos.y)
  }

  private updateFoodPosition(args: SnakeMoveEventArgs) {
    if (!this._posUpdated) this._posUpdated = true
    let { occupiedCells, column, row } = args
    let xs = _.difference(_.range(0, column), occupiedCells.map(x => x.x))
    let ys = _.difference(_.range(0, row), occupiedCells.map(x => x.y))
    this._currentPos = new Coordinate(randomItem(xs), randomItem(ys))
  }
}
