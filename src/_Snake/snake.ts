import Coordinate from '../utils/coordinate'
import Events from '../events'
import { SnakeMoveEventArgs, SnakeGrowEventArgs, GridUpdateEventArgs, GridRedrawEventArgs, CellChangedEventArgs } from './eventArgs'
import { DOMEventArgs, EventArgs } from '../eventArgs'

const enum Direction {
  Up = 1,
  Right = 2,
  Down = -1,
  Left = -2
}

export default class Snake {
  public _body: Coordinate[] = [new Coordinate(0, 0)]
  public _direction: Direction = Direction.Right
  public _growSize = 3
  public _killed = false
  public _color = '#9AC9E7'
  public _keyLock = false
  public _events: Events
  public _size: number = 3

  public constructor(events: Events) {
    this._events = events

    this._events.registerDefault<SnakeMoveEventArgs>('snakemove')
    this._events.registerDefault<SnakeGrowEventArgs>('snakegrow')
      .subscribe({
        next: args => {
          this._growSize += args.growSize
          this._size += args.growSize
        }
      })
    this._events.get<GridUpdateEventArgs>('gridupdate').subscribe({
      next: args => this.update(args)
    })
    this._events.get<GridRedrawEventArgs>('gridredraw').subscribe({
      next: args => this.draw(args)
    })

    this._events.get<DOMEventArgs<KeyboardEvent>>('keydown').subscribe({
      next: args => this.handleKeyDown(args)
    })
  }

  public get head(): Coordinate { return this._body[0] }
  public get body(): Coordinate[] { return this._body }
  public get length(): number { return this._body.length }

  protected update(args: GridUpdateEventArgs): void {
    this.move(args)
    if (this._body.slice(1).findIndex(p => p.equals(this.head)) > -1) {
      this._events.emitDefault('over', new EventArgs())
    }
    this._keyLock = false
  }

  protected draw(ctx: GridRedrawEventArgs): void {
    ctx.fillStyle = this._color
    for (let point of this._body) {
      ctx.fillCell(point.x, point.y)
    }
  }

  private move(args: GridUpdateEventArgs): void {
    let { row, column, occupiedCells } = args
    let newHead = null
    switch (this._direction) {
      case Direction.Up:
        newHead = new Coordinate(this.head.x, this.reduceY(this.head.y, 1, row))
        break
      case Direction.Right:
        newHead = new Coordinate(this.addX(this.head.x, 1, column), this.head.y)
        break
      case Direction.Down:
        newHead = new Coordinate(this.head.x, this.addY(this.head.y, 1, row))
        break
      case Direction.Left:
        newHead = new Coordinate(this.reduceX(this.head.x, 1, column), this.head.y)
        break
      default:
        throw new Error('Unexpected enum value.')
    }

    this._body.unshift(newHead)

    this._events.emitDefault('celloccupied', new CellChangedEventArgs(newHead))
    this._events.emitDefault('snakemove',
      new SnakeMoveEventArgs(row, column, this._body, occupiedCells))

    if (this._growSize === 0) {
      this._events.emitDefault('cellreleased',
        new CellChangedEventArgs(<Coordinate>this._body.pop()))
    } else {
      --this._growSize
    }
  }

  private handleKeyDown(args: DOMEventArgs<KeyboardEvent>) {
    let e = args.native
    if (this._keyLock || !this.isArrowKey(e.key)) {
      return
    }
    let direction = this.getDirectionByArrowKey(e.key)
    if (direction !== this.getOppositeDirection(this._direction)) {
      this._direction = direction
    }
    this._keyLock = true
  }

  private isArrowKey(key: string): boolean { return /^Arrow\w+$/.test(key) }

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

  private getOppositeDirection(direction: Direction): Direction {
    return -direction
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
}
