import Coordinate from '../coordinate'
import { DOMEventArgs, EventArgs } from '../eventArgs'
import EventBus from '../eventBus'
import {
  CellChangedEventArgs,
  GridRedrawEventArgs,
  GridUpdateEventArgs,
  SnakeGrowEventArgs,
  SnakeMoveEventArgs,
} from './eventArgs'
import SimpleGameSubject from '../simpleGameSubject'

enum Direction {
  Up = 1,
  Right = 2,
  Down = -1,
  Left = -2,
}

export default class Snake implements SimpleGameSubject {
  public _body: Coordinate[] = [new Coordinate(0, 0)]
  public _direction: Direction = Direction.Right
  public _growSize = 3
  public _killed = false
  public _color = '#9AC9E7'
  public _keyLock = false
  public _size: number = 3

  public get head(): Coordinate {
    return this._body[0]
  }
  public get body(): Coordinate[] {
    return this._body
  }
  public get length(): number {
    return this._body.length
  }

  public connect(eventBus: EventBus): void {
    eventBus.registerDefault<SnakeMoveEventArgs>('snakemove')
    eventBus
      .registerDefault<SnakeGrowEventArgs>('snakegrow')
      .subscribe((args) => {
        this._growSize += args.growSize
        this._size += args.growSize
      })

    eventBus.get<GridUpdateEventArgs>('gridupdate').subscribe((args) => {
      const { row, column, occupiedCells } = args

      this._body.unshift(this.getNextHeadPosition(this._direction, row, column))

      eventBus.emitDefault(
        'celloccupied',
        new CellChangedEventArgs(this._body[0])
      )
      eventBus.emitDefault(
        'snakemove',
        new SnakeMoveEventArgs(row, column, this._body, occupiedCells)
      )

      if (this._growSize === 0) {
        eventBus.emitDefault(
          'cellreleased',
          new CellChangedEventArgs(this._body.pop()!)
        )
      } else {
        --this._growSize
      }

      if (this._body.slice(1).findIndex((p) => p.equals(this.head)) > -1) {
        eventBus.emitDefault('over', new EventArgs())
      }
      this._keyLock = false
    })

    eventBus.get<GridRedrawEventArgs>('gridredraw').subscribe((args) => {
      args.context.fillStyle = this._color
      for (const point of this._body) {
        args.fillCell(point.x, point.y)
      }
    })

    eventBus.get<DOMEventArgs<KeyboardEvent>>('keydown').subscribe((args) => {
      const e = args.native
      if (this._keyLock || !this.isArrowKey(e.key)) {
        return
      }
      const direction = this.getDirectionByArrowKey(e.key)
      if (direction !== this.getOppositeDirection(this._direction)) {
        this._direction = direction
      }
      this._keyLock = true
    })
  }

  private getDirectionByArrowKey(key: string): Direction {
    switch (key) {
      case 'ArrowUp':
        return Direction.Up
      case 'ArrowRight':
        return Direction.Right
      case 'ArrowDown':
        return Direction.Down
      case 'ArrowLeft':
        return Direction.Left
      default:
        throw new Error(`'${key}' is not an arrow key.`)
    }
  }

  private getNextHeadPosition(
    direction: Direction,
    row: number,
    column: number
  ) {
    switch (direction) {
      case Direction.Up:
        return new Coordinate(this.head.x, this.reduceY(this.head.y, 1, row))
      case Direction.Right:
        return new Coordinate(this.addX(this.head.x, 1, column), this.head.y)
      case Direction.Down:
        return new Coordinate(this.head.x, this.addY(this.head.y, 1, row))
      case Direction.Left:
        return new Coordinate(this.reduceX(this.head.x, 1, column), this.head.y)
    }
  }

  private addX(x: number, n: number, max: number): number {
    return (x + n) % max
  }

  private addY(y: number, n: number, max: number): number {
    return (y + n) % max
  }

  private reduceX(x: number, n: number, max: number): number {
    if (x - n < 0) {
      return max + ((x - n) % max)
    }
    return x - n
  }

  private reduceY(y: number, n: number, max: number): number {
    if (y - n < 0) {
      return max + ((y - n) % max)
    }
    return y - n
  }

  private isArrowKey(key: string): boolean {
    return /^Arrow\w+$/.test(key)
  }

  private getOppositeDirection(direction: Direction): Direction {
    return -direction
  }
}
