import Brick from './brick.js'

export default class Grid {
  constructor (event) {
    this.__fixedBlocks = []
    this.__currentBrick = this.__nextBrick()
    this.__gridWidth = 12
    this.__lineColor = '#E0F2F1'
    this.__gridHeight = 24
    this.__lost = false
    for (let y = 0; y < this.__gridHeight; ++y) {
      this.__fixedBlocks.push(this.__createEmptyRow())
    }
    this.__event = event

    this.__event.listen('redraw', (args) => this.draw(args))
    this.__event.listen('update', (args) => this.update(args))

    window.addEventListener('keydown', (event) => this.act(event.key))
  }

  act (key) {
    switch (key) {
      case 'ArrowUp':
        this.__tryRotate(this.__currentBrick)
        break
      case 'ArrowLeft':
        this.__moveLeft()
        break
      case 'ArrowRight':
        this.__moveRight()
        break
      case 'ArrowDown':
        this.__drop()
        break
      default:
        break
    }
  }
  draw (args) {
    let ctx = args.context
    if (!this.__currentBrick) {
      return
    }
    let mapWidth = ctx.canvas.width
    let mapHeight = ctx.canvas.height
    let cellWidth = mapWidth / this.__gridWidth
    let cellHeight = mapHeight / this.__gridHeight

    let fillCell = (x, y) => {
      ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight)
    }

    // Draw fixed blocks
    for (let y = 0; y < this.__gridHeight; ++y) {
      for (let x = 0; x < this.__gridWidth; ++x) {
        if (this.__fixedBlocks[y][x]) {
          ctx.fillStyle = this.__fixedBlocks[y][x]
          fillCell(x, y)
        }
      }
    }

    // Draw dropping brick
    ctx.fillStyle = this.__currentBrick.color
    let matrix = this.__currentBrick.matrix
    let pos = this.__currentBrick.position
    let n = matrix.length
    for (let y = 0; y < n; ++y) {
      for (let x = 0; x < n; ++x) {
        if (matrix[y][x]) {
          fillCell(pos.x + x, pos.y + y)
        }
      }
    }

    // Draw lines
    // Horizontal
    ctx.strokeStyle = this.__lineColor
    for (let i = 1; i < this.__gridHeight; ++i) {
      ctx.beginPath()
      ctx.moveTo(0, i * cellHeight)
      ctx.lineTo(mapWidth, i * cellHeight)
      ctx.stroke()
    }

    // Vertical
    for (let i = 1; i < this.__gridWidth; ++i) {
      ctx.beginPath()
      ctx.moveTo(i * cellWidth, 0)
      ctx.lineTo(i * cellWidth, mapHeight)
      ctx.stroke()
    }
  }

  update (args) {
    if (this.__lost) {
      args.game.stop()
    }
    for (let y = 0; y < this.__gridHeight; ++y) {
      if (this.__fixedBlocks[y].every(val => val !== null)) {
        this.__fixedBlocks.splice(y, 1)
        this.__fixedBlocks.unshift(this.__createEmptyRow())
        this.__event.trigger('score', { score: 10 })
      }
    }
    this.__moveDown()
  }
  __nextBrick () {
    return Brick.random(this.__gridWidth)
  }

  __createEmptyRow () {
    let row = new Array(this.__gridWidth)
    row.fill(null, 0, this.__gridWidth)
    return row
  }
  __tryRotate () {
    this.__currentBrick.rotateClockwise()
    if (!this.__isBrickValid(this.__currentBrick)) {
      this.__currentBrick.rotateCounterClockwise()
    }
  }
  __moveLeft () {
    --this.__currentBrick.position.x
    if (!this.__isBrickValid(this.__currentBrick)) {
      ++this.__currentBrick.position.x
      return false
    }
    return true
  }
  __moveRight () {
    ++this.__currentBrick.position.x
    if (!this.__isBrickValid(this.__currentBrick)) {
      --this.__currentBrick.position.x
      return false
    }
    return true
  }
  __moveDown () {
    ++this.__currentBrick.position.y
    if (!this.__isBrickValid(this.__currentBrick)) {
      --this.__currentBrick.position.y
      this.__fixBrick(this.__currentBrick)
      return false
    }
    return true
  }
  __fixBrick (brick) {
    let pos = brick.position
    let matrix = brick.matrix
    let n = matrix.length
    for (let y = 0; y < n; ++y) {
      for (let x = 0; x < n; ++x) {
        if (matrix[y][x]) {
          if (pos.y + y < 0) {
            this.__lost = true
            return
          }
          this.__fixedBlocks[pos.y + y][pos.x + x] = brick.color
        }
      }
    }
    this.__currentBrick = this.__nextBrick()
  }

  __drop () {
    while (true) {
      if (!this.__moveDown()) {
        return
      }
    }
  }
  __getFixedBlocks (x, y) {
    if (x < 0 || x >= this.__gridWidth || y < 0 || y >= this.__gridHeight) {
      return null
    }
    return this.__fixedBlocks[y][x]
  }
  __isBrickValid (brick) {
    let pos = brick.position
    let matrix = brick.matrix
    let n = matrix.length
    for (let y = 0; y < n; ++y) {
      for (let x = 0; x < n; ++x) {
        if (matrix[y][x] && (pos.x + x < 0 ||
          pos.x + x >= this.__gridWidth ||
          pos.y + y >= this.__gridHeight ||
          this.__getFixedBlocks(pos.x + x, pos.y + y))) {
          return false
        }
      }
    }
    return true
  }
}
