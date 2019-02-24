import Vue from 'https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.1/vue.esm.browser.min.js'
import NavBar from '../components/navbar.js'
import GameControl from '../components/gameControl.js'
import Grid from './lib/grid.js'
import Snake from './lib/snake.js'
import Food from './lib/food.js'
import Game from '../shared/game.js'
import GameState from '../shared/gameState.js'
import { hidePreloader } from '../shared/utils.js'

window.addEventListener('load', () => hidePreloader())

window.game = null

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    NavBar,
    GameControl
  },
  data: () => {
    return {
      score: 0,
      show: 'new'
    }
  },
  methods: {
    startGame () {
      window.game = this.__createNewGame(this.$refs.canvas)
      window.game.start()
      this.show = 'none'
    },
    pauseGame () {
      window.game.pause()
      this.show = 'pause'
    },
    resumeGame () {
      window.game.resume()
      this.show = 'none'
    },
    restartGame () {
      // Clean Up
      if (window.game && window.game.state !== GameState.STOPPED) {
        window.game.stop()
      }
      this.score = 0
      this.show = 'new'
    },
    __createNewGame (canvas) {
      let game = new Game(canvas)
      let grid = new Grid(game.mapWidth / 15, game.mapHeight / 15)
      let snake = new Snake(3)
      let food = new Food(snake)

      game.addObject(grid)
      grid.addObject(snake)
      grid.addObject(food)

      game.onstop.on(() => { this.show = 'over' })
      game.onscore.on((e) => { this.score = e.score })

      return game
    }
  }
})
