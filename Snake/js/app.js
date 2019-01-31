import Game from './game.js'
import Grid from './grid.js'
import Snake from './snake.js'
import Food from './food.js'

export default class App {
    main() {
        let game = new Game(document.querySelector('#maincanvas')),
            grid = new Grid(game.mapWidth / 15, game.mapHeight / 15),
            snake = new Snake(3),
            food = new Food(snake)

        game.addObject(grid)
        grid.addObject(snake)
        grid.addObject(food)

        game.start()
    }
}