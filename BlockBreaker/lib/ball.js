export default class Ball {
  constructor (event) {
    this.__event = event
    this.__speedX = -1
    this.__speedY = 1
    this.__radius = 5
    this.__x = 100
    this.__y = 150
    this.__color = 'blue'

    event.register('ballmove')

    event.listen('update', args => this.update(args))
    event.listen('redraw', args => this.draw(args))
    event.register('ballmove')
  }

  update (args) {
    let height = args.game.mapHeight
    let width = args.game.mapWidth

    this.__x += this.__speedX
    this.__y += this.__speedY

    if (this.__x - this.__radius <= 0 || this.__x + this.__radius >= width) {
      this.__speedX = -this.__speedX
    } else if (this.__y - this.__radius <= 0 || this.__y + this.__radius >= height) {
      this.__speedY = -this.__speedY
    }
    this.__event.trigger('ballmove' ,{ x : this.__x, y: this.__y, radius: this.__radius, game: args.game })
  }

  draw (args) {
    let ctx = args.context
    ctx.beginPath()
    ctx.arc(this.__x, this.__y, this.__radius, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.fillStyle = this.__color
    ctx.fill()
  }
}