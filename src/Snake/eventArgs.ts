import Coordinate from '../coordinate'
import { EventArgs, UpdateEventArgs, RedrawEventArgs } from '../eventArgs'

export class CellChangedEventArgs extends EventArgs {
  public readonly cell: Coordinate

  constructor(cell: Coordinate) {
    super()
    this.cell = cell
  }
}

export class GridUpdateEventArgs extends UpdateEventArgs {
  public readonly occupiedCells: Coordinate[]
  public readonly row: number
  public readonly column: number
  public readonly cellWidth: number
  public readonly cellHeight: number

  constructor(
    updateArgs: UpdateEventArgs,
    cells: Coordinate[],
    row: number,
    column: number
  ) {
    super(updateArgs.width, updateArgs.height, updateArgs.addEffect)
    this.occupiedCells = cells
    this.row = row
    this.column = column
    this.cellWidth = updateArgs.width / this.column
    this.cellHeight = updateArgs.height / this.row
  }
}

export class GridRedrawEventArgs extends RedrawEventArgs {
  public readonly row: number
  public readonly column: number
  public readonly cellWidth: number
  public readonly cellHeight: number

  public constructor(
    redrawArgs: RedrawEventArgs,
    row: number,
    column: number
  ) {
    super(redrawArgs.width, redrawArgs.height, redrawArgs.background, redrawArgs.context)
    this.row = row
    this.column = column
    this.cellHeight = this.context.canvas.height / this.row
    this.cellWidth = this.context.canvas.width / this.column
  }

  public fillCell(x: number, y: number) {
    this.context.fillRect(
      this.cellWidth * x,
      this.cellHeight * y,
      this.cellWidth,
      this.cellHeight
    )
  }
}

export class SnakeMoveEventArgs extends EventArgs {
  public readonly row: number
  public readonly column: number
  public readonly body: Coordinate[]
  public readonly occupiedCells: Coordinate[]
  public readonly head: Coordinate

  public constructor(
    row: number,
    column: number,
    body: Coordinate[],
    occupiedCells: Coordinate[]
  ) {
    super()
    this.row = row
    this.column = column
    this.body = body
    this.occupiedCells = occupiedCells
    this.head = body[0]
  }
}

export class SnakeGrowEventArgs extends EventArgs {
  public readonly growSize: number

  public constructor(growSize: number) {
    super()
    this.growSize = growSize
  }
}
