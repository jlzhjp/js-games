import * as _ from 'lodash'
import Coordinate from '../coordinate'
import { RedrawEventArgs, UpdateEventArgs } from '../eventArgs'
import EventBus from '../eventBus'
import SimpleGameSubject from '../simpleGameSubject'
import {
  CellChangedEventArgs,
  GridRedrawEventArgs,
  GridUpdateEventArgs,
} from './eventArgs'

export default class Grid implements SimpleGameSubject {
  private _row: number
  private _column: number
  private _occupiedCells: Coordinate[] = []

  public constructor(row: number, column: number) {
    this._row = row
    this._column = column
  }

  public get row() {
    return this._column
  }
  public get column() {
    return this._row
  }

  public connect(eventBus: EventBus): void {
    eventBus
      .registerDefault<CellChangedEventArgs>('celloccupied')
      .subscribe((args) => this._occupiedCells.push(args.cell))
    eventBus
      .registerDefault<CellChangedEventArgs>('cellreleased')
      .subscribe((args) =>
        _.remove(this._occupiedCells, (x) => x.equals(args.cell))
      )

    eventBus.registerDefault<GridUpdateEventArgs>('gridupdate')
    eventBus.registerDefault<GridRedrawEventArgs>('gridredraw')

    eventBus.get<UpdateEventArgs>('update').subscribe((args) => {
      eventBus.emitDefault(
        'gridupdate',
        new GridUpdateEventArgs(
          args,
          this._occupiedCells,
          this._row,
          this._column
        )
      )
    })

    eventBus.get<RedrawEventArgs>('redraw').subscribe((args) => {
      eventBus.emitDefault(
        'gridredraw',
        new GridRedrawEventArgs(args, this._row, this._column)
      )
    })
  }
}
