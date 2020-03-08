import Game from '../game'
import Grid from './grid'

export default (canvas: HTMLCanvasElement): Game => {
  canvas.width = 600
  canvas.height = 600
  let game = new Game(canvas, 150)
  new Grid(game.events)
  return game
}