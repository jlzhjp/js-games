class Brick {
  constructor (event) {
    this.__event = event
    this.__bricks = []

    event.listen('redraw', args => this.draw(args))
  }

  draw (args) {
    
  }
}