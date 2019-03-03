import { randomItem, randomInt } from '../../shared/utils.js'
import Coordinate from '../../extensions/coordinate.js'

export default class Brick {
  static get bricks () {
    let O = true
    let _ = false
    return [
      {
        color: '#E1BEE7',
        matrix: [
          [O, O],
          [O, O]
        ]
      },
      {
        color: '#FFCDD2',
        matrix: [
          [_, _, O, _],
          [_, _, O, _],
          [_, _, O, _],
          [_, _, O, _]
        ]
      },
      {
        color: '#D1C4E9',
        matrix: [
          [O, _, _],
          [O, O, O],
          [_, _, _]
        ]
      },
      {
        color: '#C5CAE9',
        matrix: [
          [_, O, O],
          [O, O, _],
          [_, _, _]
        ]
      },
      {
        color: '#BBDEFB',
        matrix: [
          [O, O, _],
          [_, O, O],
          [_, _, _]
        ]
      },
      {
        color: '#B2DFDB',
        matrix: [
          [_, O, _],
          [O, O, O],
          [_, _, _]
        ]
      }
    ]
  }
  static random (width) {
    let item = randomItem(Brick.bricks)
    item.position = new Coordinate(randomInt(0, width - item.matrix.length), -item.matrix.length)
    return new Brick(item)
  }

  constructor (item) {
    this.__matrix = item.matrix
    this.__color = item.color
    this.__position = item.position
  }

  get matrix () {
    return this.__matrix
  }
  get color () {
    return this.__color
  }
  get position () {
    return this.__position
  }

  rotateCounterClockwise () {
    let a = this.__matrix
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

  rotateClockwise () {
    let a = this.__matrix
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
