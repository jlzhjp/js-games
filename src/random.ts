import Coordinate from './coordinate'

export function random(min: number, max: number) {
  return min + Math.random() * (max - min)
}

export function randomInt(min: number, max: number) {
  return random(min, max) | 0
}

export function randomItem<T>(arr: T[]) {
  return arr[randomInt(0, arr.length)]
}

export function randomCoordinate(xMax: number, yMax: number): Coordinate {
  return new Coordinate(randomInt(0, xMax), randomInt(0, yMax))
}
