import { fromEvent, interval } from 'rxjs'
import { animationFrame } from 'rxjs/internal/scheduler/animationFrame'
import { filter, map, takeUntil } from 'rxjs/operators'
import { DOMEventArgs, RedrawEventArgs, ScoreEventArgs, StateChangedEventArgs, UpdateEventArgs } from './eventArgs'
import Events from './events'

export const enum GameState {
  Init,
  Running,
  Paused,
  Stopped
}

export default class Game {
  private _state: GameState = GameState.Init
  private _events: Events = new Events()
  private _background: string = 'white'
  private _score: number = 0

  constructor(canvas: HTMLCanvasElement, tick: number = 50) {
    let context = <CanvasRenderingContext2D>canvas.getContext('2d')

    // Register events
    this._events.registerDefault<StateChangedEventArgs>('statechanged')
    this._events.registerDefault('over').subscribe({
      next: _ => this.stop()
    })
    this._events.registerDefault<ScoreEventArgs>('score')
      .subscribe({
        next: args => this._score += args.score
      })
    let stop$ = this._events.get<StateChangedEventArgs>('statechanged').pipe(
      filter(args => args.newState === GameState.Stopped)
    )
    this._events.register('keyup', fromEvent(document, 'keyup').pipe(
      takeUntil(stop$),
      filter(_ => this.isRunning),
      map(e => new DOMEventArgs(<KeyboardEvent>e))
    ))
    this._events.register('keydown', fromEvent(document, 'keydown').pipe(
      takeUntil(stop$),
      filter(_ => this.isRunning),
      map(e => new DOMEventArgs(<KeyboardEvent>e))
    ))
    this._events.register<UpdateEventArgs>('update', interval(tick).pipe(
      takeUntil(stop$),
      filter(_ => this.isRunning),
      map(_ => new UpdateEventArgs())
    ))

    // To avoid flickering
    let cache = document.createElement('canvas')
    let cachectx = <CanvasRenderingContext2D>cache.getContext('2d')
    cache.height = canvas.height
    cache.width = canvas.width

    this._events.register<RedrawEventArgs>('redraw', interval(0, animationFrame)
      .pipe(
        takeUntil(stop$),
        filter(_ => this.isRunning),
        map(_ => new RedrawEventArgs(
          cache.width,
          cache.height,
          this._background,
          cachectx))
      )).subscribe({
        next: args => {
          context.drawImage(cache, 0, 0, cache.width, cache.height)
          args.context.fillStyle = args.background
          args.context.fillRect(0, 0, args.width, args.height)
        }
      })
  }

  public get events(): Events { return this._events }
  public get state(): GameState { return this._state }
  public get score(): number { return this._score }
  public get isRunning(): boolean { return this._state === GameState.Running }
  public get isPaused(): boolean { return this._state === GameState.Paused }
  public get isStopped(): boolean { return this._state === GameState.Stopped }

  public start() {
    if (this._state !== GameState.Init) {
      throw new Error('Cannot start a game twice')
    }
    this._state = GameState.Running
    this._events.emitDefault('statechanged', new StateChangedEventArgs(GameState.Running))
  }

  public pause() {
    if (this._state === GameState.Running) {
      this._state = GameState.Paused
      this._events.emitDefault('statechanged', new StateChangedEventArgs(GameState.Paused))
    }
  }

  public resume() {
    if (this._state === GameState.Paused) {
      this._state = GameState.Running
      this._events.emitDefault('statechanged', new StateChangedEventArgs(GameState.Running))
    }
  }

  public stop() {
    this._state = GameState.Stopped
    this._events.emitDefault('statechanged', new StateChangedEventArgs(GameState.Stopped))
  }
}
