import Game from '../game'

export default (): Game => {
  return new Game(new HTMLCanvasElement(), 10)
}