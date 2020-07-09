import { EqualityComparable } from './comparable'

export default class Coordinate implements EqualityComparable<Coordinate> {
  public x: number
  public y: number

  public constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  public equals(rhs: Coordinate) {
    return this.x === rhs.x && this.y === rhs.y
  }
}
