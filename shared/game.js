import GameState from './gameState.js'

export default class Game {
  constructor (event, canvas, tick = 50) {
    if (Game.__has === true) {
      throw new Error('Another instance is running.')
    }
    this.__canvas = canvas
    this.__context = this.__canvas.getContext('2d')
    this.__tick = tick
    this.__intervalId = null
    this.__frameId = null
    this.__state = GameState.INIT
    this.__event = event

    this.__background = 'white'
    this.__score = 0

    this.__handleKeyDown = args => {
      args.game = this
      this.__event.trigger('keydown', args)
    }

    Game.__has = true

    event.register('stop')
    event.register('score')
    event.register('redraw')
    event.register('update')
    event.register('keydown')

    event.listen('score', args => {
      this.__score += args.score
    })
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
    this.event.trigger('score', { score: value - this.__score })
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
    this.__cleanup()
  }

  resume () {
    this.__boot()
    this.__state = GameState.RUNNING
  }

  stop () {
    if (this.__state === GameState.STOPPED) {
      return
    }
    this.__cleanup()
    this.__event.trigger('stop', { })
    this.__state = GameState.STOPPED
    Game.__has = false
  }

  __boot () {
    window.addEventListener('keydown', this.__handleKeyDown)
    this.__intervalId = setInterval(() => {
      this.__event.trigger('update', { game: this })
    }, this.__tick)

    let loop = () => {
      this.__context.fillStyle = this.__background
      this.__context.fillRect(0, 0, this.mapWidth, this.mapHeight)

      this.__event.trigger('redraw', { context: this.__context })
      this.__frameId = window.requestAnimationFrame(loop)
    }
    loop()
  }

  __cleanup() {
    if (this.__intervalId) {
      clearInterval(this.__intervalId)
    }
    if (this.__frameId) {
      window.cancelAnimationFrame(this.__frameId)
    }
    window.removeEventListener('keydown', this.__handleKeyDown)
  }
}
