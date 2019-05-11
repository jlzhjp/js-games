export default class Baffle {
  constructor(event) {
    this.__event = event    
    this.__speed = 23
    this.__height = 2
    this.__width = 80
    this.__left = 0
    event.listen('redraw', args => this.draw(args))
    event.listen('keydown', args => {
      if (args.key === 'ArrowLeft' && this.__left >= 0) {
        this.__left -= this.__speed
      } else if (args.key === 'ArrowRight' && this.__left <= args.game.mapWidth - this.__width) {
        this.__left += this.__speed
      }
    })
  }

  update (args) {
  }

  draw (args) {
    let ctx = args.context
    let canvasHeight = ctx.canvas.height
    ctx.fillStyle = 'red'
    ctx.fillRect(this.__left, canvasHeight - this.__height, this.__width, this.__height)
  }
}