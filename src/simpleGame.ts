import * as _ from 'lodash'
import { fromEvent, interval, Observable, Subject } from 'rxjs'
import { animationFrame } from 'rxjs/internal/scheduler/animationFrame'
import { filter, map, takeUntil } from 'rxjs/operators'
import {
  DOMEventArgs,
  RedrawEventArgs,
  ScoreEventArgs,
  UpdateEventArgs,
} from './eventArgs'
import EventBus from './eventBus'
import SimpleGameSubject from './simpleGameSubject'
import Game, { GameState } from '../Game'
import Effect, { Layer } from './effect'

// a very simple game engine
export default class SimpleGame extends Game {
  private _eventBus: EventBus = new EventBus()
  private _canvas: HTMLCanvasElement | null = null
  private _context: CanvasRenderingContext2D | null = null
  private _subjects: SimpleGameSubject[] = []
  private _effects: Effect[] = []
  private _background: string = 'white'
  private _state: GameState = GameState.Init
  private _canvasWidth: number
  private _canvasHeight: number
  private _tick: number
  private _totalScore: number = 0
  private _totalScore$: Subject<number> = new Subject<number>()
  private _state$: Subject<GameState> = new Subject<GameState>()

  constructor(canvasWidth: number, canvasHeight: number, tick: number) {
    super()
    this._canvasWidth = canvasWidth
    this._canvasHeight = canvasHeight
    this._tick = tick
    this._state$.subscribe((state) => (this._state = state))
  }

  public get state(): GameState {
    return this._state
  }
  public get totalScore(): number {
    return this._totalScore
  }
  public get state$(): Observable<GameState> {
    return this._state$
  }
  public get totalScore$(): Observable<number> {
    return this._totalScore$
  }
  public get canvasWidth(): number {
    return this._canvasWidth
  }
  public get canvasHeight(): number {
    return this._canvasHeight
  }

  public withSubjects(subjects: SimpleGameSubject[]): SimpleGame {
    for (const subject of subjects) {
      this._subjects.push(subject)
    }
    return this
  }

  // lifecycle
  public start(canvas: HTMLCanvasElement) {
    if (this._state !== GameState.Init) {
      throw Error('Cannot start a game twice.')
    }

    const stop$ = this._state$.pipe(
      filter((state) => state === GameState.Stopped)
    )

    // Register events
    this._eventBus.registerDefault('over').subscribe(() => this.stop())

    this._eventBus
      .registerDefault<ScoreEventArgs>('score')
      .subscribe((args) => {
        this._totalScore += args.delta
        this._totalScore$.next(this._totalScore)
      })

    this._eventBus.register(
      'keyup',
      fromEvent(document, 'keyup').pipe(
        takeUntil(stop$),
        filter((_) => this._state === GameState.Running),
        map((e) => new DOMEventArgs(<KeyboardEvent>e))
      )
    )

    this._eventBus.register(
      'keydown',
      fromEvent(document, 'keydown').pipe(
        takeUntil(stop$),
        filter((_) => this._state === GameState.Running),
        map((e) => new DOMEventArgs(<KeyboardEvent>e))
      )
    )

    // game logic
    this._eventBus.register<UpdateEventArgs>(
      'update',
      interval(this._tick).pipe(
        takeUntil(stop$),
        filter((_) => this._state === GameState.Running),
        map(
          () =>
            new UpdateEventArgs(canvas.width, canvas.height, (effect) =>
              this._effects.push(effect)
            )
        )
      )
    )

    // drawing
    this._canvas = canvas
    this._context = canvas.getContext('2d')!

    // avoid flickering
    const cache = document.createElement('canvas')
    const cacheContext = cache.getContext('2d')!
    cache.height = this._canvas.height
    cache.width = this._canvas.width

    this._eventBus
      .register<RedrawEventArgs>(
        'redraw',
        interval(1000 / 60, animationFrame).pipe(
          takeUntil(stop$),
          filter(() => this._state === GameState.Running),
          map(
            () =>
              new RedrawEventArgs(
                cache.width,
                cache.height,
                this._background,
                cacheContext
              )
          )
        )
      )
      .subscribe((args) => {
        _.remove(this._effects, (e) => e.finished)

        this._effects
          .filter((e) => e.layer === Layer.Top)
          .forEach((e) => {
            e.drawFrame(cacheContext)
          })

        // copy cache to the real canvas
        this._context!.drawImage(cache, 0, 0, cache.width, cache.height)

        // next loop
        cacheContext.fillStyle = args.background
        cacheContext.fillRect(0, 0, args.width, args.height)

        this._effects
          .filter((e) => e.layer === Layer.Bottom)
          .forEach((e) => {
            e.drawFrame(this._context!)
          })
      })

    for (const subject of this._subjects) {
      subject.connect(this._eventBus)
    }

    this._state$.next(GameState.Running)
  }

  public pause() {
    if (this._state === GameState.Running) {
      this._state$.next(GameState.Paused)
    }
  }

  public resume() {
    if (this._state === GameState.Paused) {
      this._state$.next(GameState.Running)
    }
  }

  public stop() {
    this._state$.next(GameState.Stopped)
  }
}
