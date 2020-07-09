export enum Layer {
  Top,
  Bottom
}

export default interface Effect {
  layer: Layer
  finished: boolean

  drawFrame(context: CanvasRenderingContext2D): void
}