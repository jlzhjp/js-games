import Effect from './effect'

// tag class
export class EventArgs {}

export class RedrawEventArgs extends EventArgs {
  public readonly width: number
  public readonly height: number
  public readonly background: string
  public readonly context: CanvasRenderingContext2D

  public constructor(
    width: number,
    height: number,
    background: string,
    context: CanvasRenderingContext2D,
  ) {
    super()
    this.width = width
    this.height = height
    this.background = background
    this.context = context
  }
}

export class UpdateEventArgs extends EventArgs {
  public readonly width: number
  public readonly height: number
  public readonly addEffect: (effect: Effect) => void

  public constructor(
    width: number,
    height: number,
    addEffect: (effect: Effect) => void
  ) {
    super()
    this.width = width
    this.height = height
    this.addEffect = addEffect
  }
}

export class ScoreEventArgs extends EventArgs {
  public readonly delta: number = 0

  public constructor(delta: number) {
    super()
    this.delta = delta
  }
}

export class DOMEventArgs<TEvent> extends EventArgs {
  public readonly native: TEvent

  public constructor(event: TEvent) {
    super()
    this.native = event
  }
}
