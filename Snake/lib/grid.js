export default class Grid {
  constructor (event, gridWidth, gridHeight) {
    this.__background = 'white'
    this.__gridWidth = gridWidth
    this.__gridHeight = gridHeight
    this.__event = event
    this.__occupiedCells = []

    this.__event.register('occupycell')
    this.__event.register('releasecell')
    this.__event.register('gridupdate')
    this.__event.register('gridredraw')

    this.__event.listen('update', (args) => this.update(args))
    this.__event.listen('redraw', (args) => this.draw(args))
    this.__event.listen('occupycell', (args) => {
      this.__occupiedCells.push(args.cell)
    })
    this.__event.listen('releasecell', (args) => {
      let index = this.__occupiedCells.findIndex((pos) => pos.equals(args.cell))
      this.__occupiedCells.splice(index, 1)
    })
  }

  update (args) {
    this.__event.trigger('gridupdate', {
      game: args.game,
      gridWidth: this.__gridWidth,
      gridHeight: this.__gridHeight,
      occupiedCells: this.__occupiedCells
    })
  }

  draw (args) {
    this.__event.trigger('gridredraw', { context: this.__getGridDrawingContext(args.context) })
  }

  get gridWidth () {
    return this.__gridWidth
  }
  get gridHeight () {
    return this.__gridHeight
  }

  __getGridDrawingContext (context) {
    let cellWidth = context.canvas.width / this.__gridWidth
    let cellHeight = context.canvas.height / this.__gridWidth
    return {
      set fillStyle (value) {
        context.fillStyle = value
      },
      get fillStyle () {
        return context.fillStyle
      },
      fillCell: (x, y) => {
        context.fillRect(cellWidth * x, cellHeight * y, cellWidth, cellHeight)
      }
    }
  }
}
