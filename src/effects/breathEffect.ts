import Effect, { Layer } from '../effect'
import Coordinate from '../coordinate'
import { interval } from 'rxjs'

export default class BreathEffect implements Effect {
  layer: Layer = Layer.Bottom
  finished: boolean = false

  private _func: (x: number) => number
  private _x: number = 0
  private _color: string
  private _position: Coordinate

  public constructor(
    position: Coordinate,
    layer: Layer,
    minRadius: number,
    maxRadius: number,
    color: string
  ) {
    this._position = position
    this._color = color
    this.layer = layer
    const A = (maxRadius - minRadius) / 2
    this._func = (x) => A * (Math.cos(x) + 1) + minRadius

    interval(1000 / 60).subscribe(() => this._x += 0.07)
  }

  public drawFrame(context: CanvasRenderingContext2D): void {
    context.fillStyle = this._color
    context.beginPath()
    context.arc(
      this._position.x,
      this._position.y,
      this._func(this._x),
      0,
      2 * Math.PI
    )
    context.fill()
  }

  public cancel() {
    this.finished = true
  }
}
