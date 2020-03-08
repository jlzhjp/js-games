import _ from 'lodash'
import Coordinate from '../utils/coordinate'
import { randomItem, randomInt } from '../utils/random'
import bricks from './bricks'

export default class Brick {
  private _color: string
  private _position: Coordinate
  private _matrix: boolean[][]

  public constructor(color: string, pos: Coordinate, martrix: boolean[][]) {
    this._color = color
    this._position = pos
    this._matrix = martrix
  }

  public static random(column: number) {
    let item = randomItem(bricks)
    return new Brick(item.color,
      new Coordinate(randomInt(0, column - item.matrix.length), -item.matrix.length),
      _.cloneDeep(item.matrix))
  }

  public get color(): string { return this._color }
  public get position(): Coordinate { return this._position }
  public get matrix(): boolean[][] { return this._matrix }

  public rotateCounterClockwise(): void {
    let a = this._matrix
    let n = a.length
    for (let i = 0; i < n / 2; i++) {
      for (var j = i; j < n - i - 1; j++) {
        let tmp = a[i][j]
        a[i][j] = a[j][n - i - 1]
        a[j][n - i - 1] = a[n - i - 1][n - j - 1]
        a[n - i - 1][n - j - 1] = a[n - j - 1][i]
        a[n - j - 1][i] = tmp
      }
    }
  }

  public rotateClockwise(): void {
    let a = this._matrix
    let n = a.length
    for (var i = 0; i < n / 2; i++) {
      for (let j = i; j < n - i - 1; j++) {
        let tmp = a[i][j]
        a[i][j] = a[n - j - 1][i]
        a[n - j - 1][i] = a[n - i - 1][n - j - 1]
        a[n - i - 1][n - j - 1] = a[j][n - i - 1]
        a[j][n - i - 1] = tmp
      }
    }
  }
}
