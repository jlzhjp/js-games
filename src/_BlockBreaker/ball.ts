import { EventArgs, RedrawEventArgs, UpdateEventArgs } from '../eventArgs'
import Events from '../events'
import { BallMoveEventArgs } from './eventArgs'

export default class Ball {
  private _events: Events
  private _speedX: number = -1
  private _speedY: number = 1
  private _x: number = 100
  private _y: number = 150
  private _r: number = 5
  private _color: string = 'blue'

  public constructor(events: Events) {
    this._events = events

    this._events.registerDefault<BallMoveEventArgs>('ballmove')
    this._events.get<UpdateEventArgs>('update').subscribe({ next: this.update })
    this._events.get<RedrawEventArgs>('redraw').subscribe({ next: this.draw })
  }

  protected update(args: UpdateEventArgs) {
    const { width, height } = args

    this._x += this._speedX
    this._y += this._speedY

    if (this._x - this._r <= 0 || this._x + this._r >= width) {
      this._speedX = -this._speedX
    } else if (this._y - this._r <= 0) {
      this._speedY = -this._speedY
    } else if (this._y + this._r >= height) {
      this._events.emitDefault('over', new EventArgs())
    }

    this._events.emitDefault<BallMoveEventArgs>('ballmove',
      new BallMoveEventArgs(width, height, this._x, this._y, this._r))
  }

  protected draw(args: RedrawEventArgs) {
    let ctx = args.context
    ctx.beginPath()
    ctx.arc(this._x, this._y, this._r, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.fillStyle = this._color
    ctx.fill()
  }
}