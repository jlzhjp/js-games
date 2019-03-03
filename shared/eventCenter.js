import Event from '../extensions/event.js'

export default class EventCenter {
  constructor () {
    this.__events = { }
  }

  register (name) {
    this.__events[name] = new Event()
  }

  unregister (name) {
    this.__check(name)
    delete this.__events[name]
  }

  listen (name, handler) {
    this.__check(name)
    this.__events[name].on(handler)
  }

  unlisten (name, handler) {
    this.__check(name)
    this.__events[name].off(handler)
  }

  trigger (name, args) {
    this.__check(name)
    this.__events[name].trigger(args)
  }

  __check (name) {
    if (!this.__events.hasOwnProperty(name)) {
      throw new Error(`Can not find event ${name}.`)
    }
  }
}
