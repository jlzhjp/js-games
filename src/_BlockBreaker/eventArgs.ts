import { EventArgs } from '../eventArgs'

export class BallMoveEventArgs extends EventArgs {
  public width: number
  public height: number
  public x: number
  public y: number
  public r: number

  public constructor(width: number, height: number, x: number, y: number, r: number) {
    super()
    this.width = width
    this.height = height
    this.x = x
    this.y = y
    this.r = r
  }
}