import Coordinate from "../utils/coordinate";
import { EventArgs } from "../eventArgs";

export class CellChangedEventArgs extends EventArgs {
  public cell: Coordinate

  constructor(cell: Coordinate) {
    super()
    this.cell = cell
  }
}

export class GridUpdateEventArgs extends EventArgs {
  public occupiedCells: Coordinate[]
  public row: number
  public column: number

  constructor(cells: Coordinate[], row: number, column: number) {
    super()
    this.occupiedCells = cells
    this.row = row
    this.column = column
  }
}

export class GridRedrawEventArgs extends EventArgs {
  private _context: CanvasRenderingContext2D
  public _row: number
  public _column: number

  public constructor(context: CanvasRenderingContext2D, row: number, column: number) {
    super()
    this._context = context
    this._row = row
    this._column = column
  }

  public get row(): number { return this._row }
  public get column(): number { return this._column }
  private get cellWidth(): number { return this._context.canvas.width / this.column }
  private get cellHeight(): number { return this._context.canvas.height / this.row }

  public set fillStyle(value) { this._context.fillStyle = value }
  public get fillStyle() { return this._context.fillStyle }

  public fillCell(x: number, y: number) {
    this._context.fillRect(this.cellWidth * x, this.cellHeight * y, this.cellWidth, this.cellHeight)
  }
}

export class SnakeMoveEventArgs extends EventArgs {
  private _row: number
  private _column: number
  private _body: Coordinate[]
  private _occupiedCells: Coordinate[]

  public constructor(row: number, column: number, body: Coordinate[], occupiedCells: Coordinate[]) {
    super()
    this._row = row
    this._column = column
    this._body = body
    this._occupiedCells = occupiedCells
  }

  public get row(): number { return this._row }
  public get column(): number  { return this._column }
  public get body(): Coordinate[] { return this._body }
  // Used to generate new food.
  public get occupiedCells(): Coordinate[] { return this._occupiedCells }
  public get head(): Coordinate { return this._body[0] }
}
export class SnakeGrowEventArgs extends EventArgs {
  private _growSize: number

  public constructor(growSize: number) {
    super()
    this._growSize = growSize
  }

  public get growSize() { return this._growSize }
}