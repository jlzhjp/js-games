import { GameState } from './game'

export class EventArgs { }

export class RedrawEventArgs extends EventArgs {
  public width: number
  public height: number
  public background: string
  public context: CanvasRenderingContext2D

  public constructor(width: number, height: number, background: string, context: CanvasRenderingContext2D) {
    super()
    this.width = width
    this.height = height
    this.background = background
    this.context = context
  }
}

export class UpdateEventArgs extends EventArgs { }

export class StateChangedEventArgs extends EventArgs {
  private _newState: GameState;
  public constructor(newState: GameState) {
    super()
    this._newState = newState
  }

  public get newState() { return this._newState }
}

export class ScoreEventArgs extends EventArgs {
  public score: number = 0

  public constructor(score: number) {
    super()
    this.score = score
  }
}

export class DOMEventArgs<TEvent> extends EventArgs {
  public native: TEvent

  public constructor(event: TEvent) {
    super()
    this.native = event
  }
}