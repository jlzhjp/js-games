import { DOMEventArgs, EventArgs, RedrawEventArgs, UpdateEventArgs } from '../eventArgs'
import Events from '../events'
import { BallMoveEventArgs } from './eventArgs'

export default class Baffle {
  private _events: Events
  private _speed: number = 2
  private _delta: number = 0
  private _height: number = 2
  private _width: number = 80
  private _left: number = 0
  private _lost: boolean = false

  public constructor(events: Events) {
    this._events = events

    this._events.get<RedrawEventArgs>('redraw').subscribe({
      next: args => this.draw(args)
    })

    this._events.get<UpdateEventArgs>('update').subscribe({
      next: _ => this.update()
    })
    this._events.get<DOMEventArgs<KeyboardEvent>>('keydown').subscribe({
      next: args => {
        const { key } = args.native
        if (key === 'ArrowLeft') {
          this._delta = -this._speed
        } else if (key === 'ArrowRight') {
          this._delta = this._speed
        }
      }
    })
    this._events.get<DOMEventArgs<KeyboardEvent>>('keyup').subscribe({
      next: args => {
        const { key } = args.native
        if (key === 'ArrowLeft' || key === 'ArrowRight') {
          this._delta = 0
        }
      }

    })
    this._events.get<BallMoveEventArgs>('ballmove').subscribe({
      next: args => {
        if (args.y + args.r >= args.height &&
          (args.x < this._left || args.x > this._left + this._width)) {
          this._lost = true
        }
      }
    })
  }

  protected update() {
    if (this._lost) {
      this._events.emitDefault('over', new EventArgs())
    }

    this._left += this._delta
  }

  protected draw(args: RedrawEventArgs) {
    let ctx = args.context
    let canvasHeight = ctx.canvas.height
    ctx.fillStyle = 'red'
    ctx.fillRect(this._left, canvasHeight - this._height, this._width, this._height)
  }
}