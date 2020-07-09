import * as _ from 'lodash'
import Coordinate from '../coordinate'
import EventBus from '../eventBus'
import { randomItem } from '../random'
import {
  SnakeGrowEventArgs,
  SnakeMoveEventArgs,
  GridUpdateEventArgs,
} from './eventArgs'
import SimpleGameSubject from '../simpleGameSubject'
import { ScoreEventArgs } from '../eventArgs'
import BreathEffect from '../effects/breathEffect'
import { Layer } from '../effect'

export default class Foods implements SimpleGameSubject {
  private _color: string = '#FFCDD2'
  private _currentPos: Coordinate | null = null
  private _shouldUpdate: boolean = false
  private _currentEffect: BreathEffect | null = null

  public connect(eventBus: EventBus): void {
    eventBus.get<GridUpdateEventArgs>('gridupdate').subscribe((args) => {
      if (this._shouldUpdate) {
        this._currentEffect?.cancel()
        this._currentEffect = new BreathEffect(
          new Coordinate(
            this._currentPos!.x * args.cellWidth + args.cellWidth / 2,
            this._currentPos!.y * args.cellHeight + args.cellHeight / 2
          ),
          Layer.Bottom,
          args.cellWidth / 4,
          args.cellWidth / 2,
          this._color
        )
        args.addEffect(this._currentEffect)
        this._shouldUpdate = false
      }
    })

    eventBus.get<SnakeMoveEventArgs>('snakemove').subscribe((args) => {
      if (!this._currentPos) {
        this._currentPos = this.getNewFoodPosition(args)
        this._shouldUpdate = true
      }
      if (this._currentPos.equals(args.head)) {
        eventBus.emitDefault('snakegrow', new SnakeGrowEventArgs(1))
        // Since the snake head has overried the food,
        // there is no need to released it.
        eventBus.emitDefault('score', new ScoreEventArgs(10))
        this._currentPos = this.getNewFoodPosition(args)
        this._shouldUpdate = true
      }
    })
  }

  private getNewFoodPosition(args: SnakeMoveEventArgs): Coordinate {
    const { occupiedCells, column, row } = args
    const positions = Array.from(
      (function* positions() {
        for (const x of _.range(0, column)) {
          for (const y of _.range(0, row)) {
            yield new Coordinate(x, y)
          }
        }
      })()
    )
    const availablePositions = _.differenceWith(
      positions,
      occupiedCells,
      (x, y) => x.equals(y)
    )
    return randomItem(availablePositions)
  }
}
