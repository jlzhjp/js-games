import _ from 'lodash'
import { RedrawEventArgs, UpdateEventArgs } from "../eventArgs"
import Events from "../events"
import Coordinate from "../utils/coordinate"
import { CellChangedEventArgs, GridRedrawEventArgs, GridUpdateEventArgs } from "./eventArgs"

export default class Grid {
  private _row: number
  private _column: number
  private _events: Events
  private _occupiedCells: Coordinate[] = []

  public constructor(events: Events, row: number, column: number) {
    this._row = row
    this._column = column
    this._events = events

    this._events.registerDefault<CellChangedEventArgs>('celloccupied')
      .subscribe({
        next: args => this._occupiedCells.push(args.cell)
      })
    this._events.registerDefault<CellChangedEventArgs>('cellreleased')
      .subscribe({
        next: args => _.remove(this._occupiedCells, x => x.equals(args.cell))
      })

    this._events.registerDefault<GridUpdateEventArgs>('gridupdate')
    this._events.registerDefault<GridRedrawEventArgs>('gridredraw')

    this._events.get<UpdateEventArgs>('update').subscribe({
      next: _ => this.update()
    })
    this._events.get<RedrawEventArgs>('redraw').subscribe({
      next: args => this.draw(args)
    })
  }

  public get row() { return this._column }
  public get column() { return this._row }

  protected update() {
    this._events.emitDefault('gridupdate',
      new GridUpdateEventArgs(this._occupiedCells, this._row, this._column))
  }

  public draw(args: RedrawEventArgs) {
    this._events.emitDefault('gridredraw',
      new GridRedrawEventArgs(args.context, this._row, this._column))
  }
}
