export default class Baffle {
  constructor (event) {
    this.__event = event
    this.__speed = 2
    this.__delta = 0
    this.__height = 2
    this.__width = 80
    this.__left = 0
    this.__lost = false

    event.listen('redraw', args => this.draw(args))
    event.listen('update', args => this.update(args))
    event.listen('keydown', args => {
      if (args.key === 'ArrowLeft') {
        this.__delta = -this.__speed
      } else if (args.key === 'ArrowRight') {
        this.__delta = this.__speed
      }
    })
    event.listen('keyup', args => {
      if (args.key === 'ArrowLeft' || args.key === 'ArrowRight') {
        this.__delta = 0
      }
    })
    event.listen('ballmove', args => {
      if (args.y + args.radius >= args.game.mapHeight &&
        (args.x < this.__left || args.x > this.__left + this.__width)) {
        this.__lost = true
      }
    })
  }

  update (args) {
    if (this.__lost) {
      args.game.stop()
    }

    this.__left += this.__delta
  }

  draw (args) {
    let ctx = args.context
    let canvasHeight = ctx.canvas.height
    ctx.fillStyle = 'red'
    ctx.fillRect(this.__left, canvasHeight - this.__height, this.__width, this.__height)
  }
}