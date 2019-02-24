export default function Enum (items) {
  if (items instanceof Array) {
    let result = { }
    items.forEach((item, index) => { result[item] = index })
    return Object.freeze(result)
  }
  return Object.freeze(items)
}
