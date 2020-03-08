import Game from '../game'
import Foods from './foods'
import Grid from './grid'
import Snake from './snake'

export default (canvas: HTMLCanvasElement): Game => {
  canvas.width = 600
  canvas.height = 600
  let game = new Game(canvas)
  new Grid(game.events, 50, 50)
  new Snake(game.events)
  new Foods(game.events)
  return game
}