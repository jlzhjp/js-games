import Game from '../game'
import Grid from './grid'
import Snake from './snake'
import Foods from './foods'

export default (canvas: HTMLCanvasElement): Game => {
  canvas.width = 600
  canvas.height = 600
  let game = new Game(canvas)
  new Grid(game.events, 50, 50)
  new Snake(game.events)
  new Foods(game.events)
  return game
}