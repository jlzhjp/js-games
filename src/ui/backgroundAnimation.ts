import * as _ from 'lodash'
import {merge, of, fromEvent, interval} from 'rxjs'
import { animationFrame } from 'rxjs/internal/scheduler/animationFrame'
import Coordinate from '../coordinate'
import { random } from '../random'
import {grey} from '@material-ui/core/colors'

class Square {
  constructor(
    size: number,
    pos: Coordinate,
    speedX: number = 0,
    speedY: number = 0,
    angle: number = 0,
    rotate: number = 0
  ) {
    this.size = size
    this.pos = pos
    this.speedX = speedX
    this.speedY = speedY
    this.angle = angle
    this.rotate = rotate
  }

  public static readonly DENSITY = 0.1
  public static readonly OPACITY = 0.7
  public static readonly COLOR = grey[400]

  // center of the square
  public pos: Coordinate = new Coordinate(0, 0)
  public size = 10
  public angle: number = 0
  public speedX: number = 0
  public speedY: number = 0
  public rotate: number = 0

  public get mass() {
    return this.size ** 3 * Square.DENSITY
  }
}

export function applyAnimation(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')!
  const squares: Square[] = []

  const { PI, sqrt } = Math

  merge(of(undefined), fromEvent(window, 'resize')).subscribe(() => {
    ctx.fillStyle = Square.COLOR
    ctx.shadowColor = Square.COLOR
    ctx.shadowBlur = 20
  })

  interval(1000 / 60, animationFrame).subscribe(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let s of squares) {
      s.pos.x += s.speedX
      s.pos.y += s.speedY
      s.angle += s.rotate

      ctx.save()

      ctx.globalAlpha = Square.OPACITY
      ctx.translate(s.pos.x, s.pos.y)
      ctx.rotate(s.angle)
      ctx.fillRect(-s.size / 2, -s.size / 2, s.size, s.size)

      ctx.restore()
    }
  })

  interval(1000, animationFrame).subscribe(() => {
    _.remove(squares, (s) => {
      // center to corner
      const ctc = (sqrt(2) * s.size) / 2
      return (
        s.pos.x + ctc < 0 ||
        s.pos.x - ctc > canvas.width ||
        s.pos.y + ctc < 0 ||
        s.pos.y - ctc > canvas.height
      )
    })

    if (squares.length < 20) {
      const size = random(60, 120)
      const ctc = (sqrt(2) * size) / 2

      const pos = new Coordinate(random(0, canvas.width), -ctc)
      const sx = random(-0.3, 0.3)
      const sy = random(0.3, 1)
      const initAngle = random(-PI, PI)
      const rotate = random(-PI / 300, PI / 300)

      // center to corner
      squares.push(new Square(size, pos, sx, sy, initAngle, rotate))
    }
  })
}
