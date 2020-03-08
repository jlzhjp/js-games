export interface IEqualityComparable<T> {
  equals(rhs: T): boolean
}