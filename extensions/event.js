export default class Event {
  constructor () {
    this.__handlers = [ ]
  }

  on (handler) {
    this.__handlers.push(handler)
  }

  off (handler) {
    this.__handlers = this.handlers.filter(h => h !== handler)
  }

  trigger (data) {
    this.__handlers.slice(0).forEach(h => h(data))
  }

  expose () {
    return this.__handlers
  }
}
