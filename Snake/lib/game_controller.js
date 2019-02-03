'use strict'

import Game from './game.js'
import Grid from './grid.js'
import Snake from './snake.js'
import Food from './food.js'

export default class GameController {
    constructor(canvas) {
        this.__canvas = canvas
        this.__game = null
    }

    get onstop() {
        return this.__game.onstop
    }

    get score() {
        return this.__game.score
    }

    startNew() {
        if (this.__game) {
            this.__game.stop()
        }
        this.__game = this.__createNewGame()
        this.__game.start()
    }

    pause() {
        this.__game.pause()
    }

    start() {
        this.__game.start()
    }

    __createNewGame() {
        let game = new Game(this.__canvas),
            grid = new Grid(game.mapWidth / 15, game.mapHeight / 15),
            snake = new Snake(3),
            food = new Food(snake)

        game.addObject(grid)
        grid.addObject(snake)
        grid.addObject(food)

        return game
    }
}