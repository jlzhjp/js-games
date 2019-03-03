export default class Coordinate {
  constructor (x, y) {
    this.x = x
    this.y = y
  }
  equals (rhs) {
    return this.x === rhs.x && this.y === rhs.y
  }
}
