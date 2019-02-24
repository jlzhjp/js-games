import Container from './container.js'
import GameState from './gameState.js'
import Event from '../extensions/event.js'

export default class Game extends Container {
  constructor (canvas, tick = 50) {
    if (Game.__has === true) {
      throw new Error('Another instance is running.')
    }
    super()
    this.__canvas = canvas
    this.__context = this.__canvas.getContext('2d')
    this.__tick = tick
    this.__intervalId = null
    this.__frameId = null
    this.__state = GameState.INIT

    this.__objects = []
    this.__background = 'white'
    this.__score = 0
    Game.__has = true

    this.onstop = new Event()
    this.onscore = new Event()
  }

  get mapHeight () {
    return this.__canvas.height
  }
  get mapWidth () {
    return this.__canvas.width
  }
  get state () {
    return this.__state
  }
  get score () {
    return this.__score
  }
  set score (value) {
    this.__score = value
    this.onscore.trigger({ score: this.__score })
  }

  start () {
    if (this.__state !== GameState.INIT) {
      throw new Error('This game has started.')
    }
    this.__boot()
    this.__state = GameState.RUNNING
  }

  pause () {
    if (this.__state === GameState.PAUSED) {
      return
    }
    if (this.__intervalId) {
      clearInterval(this.__intervalId)
    }
    if (this.__frameId) {
      window.cancelAnimationFrame(this.__frameId)
    }
  }

  resume () {
    this.__boot()
    this.__state = GameState.RUNNING
  }

  stop () {
    if (this.__state === GameState.STOPPED) {
      return
    }
    this.pause()
    this.onstop.trigger()
    this.__state = GameState.STOPPED
    Game.__has = false
  }

  __boot () {
    this.__intervalId = setInterval(() => {
      this.updateAll({ game: this })
    }, this.__tick)

    let loop = () => {
      this.__context.fillStyle = this.__background
      this.__context.fillRect(0, 0, this.mapWidth, this.mapHeight)

      this.drawAll(this.__context)
      this.__frameId = window.requestAnimationFrame(loop)
    }
    loop()
  }
}
