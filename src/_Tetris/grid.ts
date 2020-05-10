import { DOMEventArgs, EventArgs, RedrawEventArgs, ScoreEventArgs, UpdateEventArgs } from '../eventArgs'
import Events from '../events'
import Brick from './brick'

export default class Grid {
  private _fixedBlocks: string[][] = []
  private _currentBrick = this.nextBrick()
  private _lineColor: string = '#E0F2F1'
  private _column: number = 24
  private _row: number = 24
  private _lost: boolean = false
  private _events: Events

  public constructor(event: Events) {
    this._events = event
    for (let y = 0; y < this._row; ++y) {
      this._fixedBlocks.push(this.createEmptyRow())
    }

    this._events.get<DOMEventArgs<KeyboardEvent>>('keydown').subscribe({
      next: args => this.act(args.native.key)
    })
    this._events.get<RedrawEventArgs>('redraw').subscribe({
      next: args => this.draw(args)
    })
    this._events.get<UpdateEventArgs>('update').subscribe({
      next: _ => this.update()
    })
  }

  private act(key: string) {
    switch (key) {
      case 'ArrowUp':
        this.tryRotate()
        break
      case 'ArrowLeft':
        this.moveLeft()
        break
      case 'ArrowRight':
        this.moveRight()
        break
      case 'ArrowDown':
        this.drop()
        break
    }
  }

  protected draw(args: RedrawEventArgs) {
    let ctx = args.context
    if (!this._currentBrick) {
      return
    }
    let mapWidth = ctx.canvas.width
    let mapHeight = ctx.canvas.height
    let cellWidth = mapWidth / this._column
    let cellHeight = mapHeight / this._row

    let fillCell = (x: number, y: number) => {
      ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight)
    }

    // Draw fixed blocks
    for (let y = 0; y < this._row; ++y) {
      for (let x = 0; x < this._column; ++x) {
        if (this._fixedBlocks[y][x]) {
          ctx.fillStyle = this._fixedBlocks[y][x]
          fillCell(x, y)
        }
      }
    }

    // Draw dropping brick
    ctx.fillStyle = this._currentBrick.color
    let matrix = this._currentBrick.matrix
    let pos = this._currentBrick.position
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
    ctx.strokeStyle = this._lineColor
    for (let i = 1; i < this._row; ++i) {
      ctx.beginPath()
      ctx.moveTo(0, i * cellHeight)
      ctx.lineTo(mapWidth, i * cellHeight)
      ctx.stroke()
    }

    // Vertical
    for (let i = 1; i < this._column; ++i) {
      ctx.beginPath()
      ctx.moveTo(i * cellWidth, 0)
      ctx.lineTo(i * cellWidth, mapHeight)
      ctx.stroke()
    }
  }

  protected update() {
    if (this._lost) {
      this._events.emitDefault('over', new EventArgs())
    }
    for (let y = 0; y < this._row; ++y) {
      if (this._fixedBlocks[y].every(x => x !== null)) {
        this._fixedBlocks.splice(y, 1)
        this._fixedBlocks.unshift(this.createEmptyRow())
        this._events.emitDefault('score', new ScoreEventArgs(10))
      }
    }
    this.moveDown()
  }

  private nextBrick() {
    return Brick.random(this._column)
  }

  private createEmptyRow() {
    let row = new Array(this._column)
    row.fill(null, 0, this._column)
    return row
  }

  private tryRotate() {
    this._currentBrick.rotateClockwise()
    if (!this.isBrickValid(this._currentBrick)) {
      this._currentBrick.rotateCounterClockwise()
    }
  }

  private moveLeft() {
    --this._currentBrick.position.x
    if (!this.isBrickValid(this._currentBrick)) {
      ++this._currentBrick.position.x
      return false
    }
    return true
  }

  private moveRight() {
    ++this._currentBrick.position.x
    if (!this.isBrickValid(this._currentBrick)) {
      --this._currentBrick.position.x
      return false
    }
    return true
  }

  private moveDown() {
    ++this._currentBrick.position.y
    if (!this.isBrickValid(this._currentBrick)) {
      --this._currentBrick.position.y
      this.fixBrick(this._currentBrick)
      return false
    }
    return true
  }

  private fixBrick(brick: Brick) {
    let pos = brick.position
    let matrix = brick.matrix
    let n = matrix.length
    for (let y = 0; y < n; ++y) {
      for (let x = 0; x < n; ++x) {
        if (matrix[y][x]) {
          if (pos.y + y < 0) {
            this._lost = true
            return
          }
          this._fixedBlocks[pos.y + y][pos.x + x] = brick.color
        }
      }
    }
    this._currentBrick = this.nextBrick()
  }

  private drop() {
    while (this.moveDown()) { }
  }

  private getFixedBlocks(x: number, y: number) {
    if (x < 0 || x >= this._column || y < 0 || y >= this._row) {
      return null
    }
    return this._fixedBlocks[y][x]
  }

  private isBrickValid(brick: Brick): boolean {
    let pos = brick.position
    let matrix = brick.matrix
    let n = matrix.length
    for (let y = 0; y < n; ++y) {
      for (let x = 0; x < n; ++x) {
        if (matrix[y][x] && (pos.x + x < 0 ||
          pos.x + x >= this._column ||
          pos.y + y >= this._row ||
          this.getFixedBlocks(pos.x + x, pos.y + y))) {
          return false
        }
      }
    }
    return true
  }
}
