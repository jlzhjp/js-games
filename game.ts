import { Observable } from 'rxjs'

export enum GameState {
  Init,
  Running,
  Paused,
  Stopped,
}


export default abstract class Game {
  public abstract start(canvas: HTMLCanvasElement): void
  public abstract pause(): void
  public abstract resume(): void
  public abstract stop(): void

  public abstract get state$(): Observable<GameState>
  public abstract get totalScore$(): Observable<number>

  public abstract get canvasWidth(): number
  public abstract get canvasHeight(): number
}
