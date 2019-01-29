import Game from './game.js'
import Grid from './grid.js'
import Snake from './snake.js'

export default class App {
    main() {
        let game = new Game(document.querySelector('#maincanvas'))
        let grid = new Grid(game, game.mapWidth / 15, game.mapHeight / 15)
        let snake = new Snake(game, grid)
        game.start()
    }
}