import Vue from 'https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.1/vue.esm.browser.min.js'
import NavBar from '../components/navbar.js'
import GameControl from '../components/game_control.js'
import Game from './lib/game.js'
import Grid from './lib/grid.js'
import Snake from './lib/snake.js'
import Food from './lib/food.js'
import { hidePreloader, } from '../shared/utils.js'

new Vue({
    el: '#app',
    components: {
        'nav-bar': NavBar,
        'game-control': GameControl,
    },
    data: () => {
        return {
            game: null,
        }
    },
    methods: {
        startNewGame() {
            if (this.game && this.game.state !== 'stopped') {
                this.game.stop()
            }
            this.game = this.__createNewGame(this.$refs.canvas)
            this.game.start()
        },
        pauseGame() {
            this.game.pause()
        },
        startGame() {
            this.game.start()
        },
        __createNewGame(canvas) {
            let game = new Game(canvas)
            let grid = new Grid(game.mapWidth / 15, game.mapHeight / 15)
            let snake = new Snake(3)
            let food = new Food(snake)

            game.addObject(grid)
            grid.addObject(snake)
            grid.addObject(food)

            return game
        },
    },
})

window.addEventListener('load', () => hidePreloader())
