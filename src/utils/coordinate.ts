import { IEqualityComparable } from "../interfaces/comparable"

export default class Coordinate implements IEqualityComparable<Coordinate> {
  private _x: number
  private _y: number

  public get x() { return this._x }
  public set x(value: number) { this._x = value }
  public get y() {return this._y }
  public set y(value: number) { this._y = value }

  constructor(x: number = 0, y: number = 0) {
    this._x = x
    this._y = y
  }

  equals(rhs: Coordinate): boolean {
    return this.x === rhs.x && this.y === rhs.y
  }

}
