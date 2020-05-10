import { RedrawEventArgs } from '../eventArgs'
import Events from '../events'
import { BallMoveEventArgs } from './eventArgs'

class Brick {
  public width: number = 30
  public height: number = 20
  public x: number = 0
  public y: number = 0
  public score: number = 10
  public color: string = '#000000'

  public constructor(init?: Partial<Brick>) {
    Object.assign(this, init)
  }
}

export default class BrickManager {
  private _events: Events
  private _bricks: Brick[] = []

  public constructor(events: Events) {
    this._events = events
    this._events.get<BallMoveEventArgs>('ballmove').subscribe({
      next: args => {
        for (const brick of this._bricks) {
          if (this.isCollided(brick, { x: args.x, y: args.y, r: args.r })) {

          }
        }
      }
    })

    this._events.get<RedrawEventArgs>('redraw').subscribe({
      next: args => {
        for (const brick of this._bricks) {
          args.context.fillStyle = brick.color
          args.context.fillRect(brick.x, brick.y, brick.width, brick.height)
        }
      }
    })
  }
  private isCollided(brick: Brick, ball: { x: number, y: number, r: number }): boolean {
    throw new Error('Method not implemented.')
  }
}