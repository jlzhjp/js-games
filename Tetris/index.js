import Vue from 'https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.1/vue.esm.browser.min.js'
import NavBar from '../components/navbar.js'
import GameControl from '../components/game_control.js'
import Grid from './lib/grid.js'
import Game from '../shared/game.js'
import { hidePreloader } from '../shared/utils.js'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    'nav-bar': NavBar,
    'game-control': GameControl
  },
  data: () => {
    return {
      game: null
    }
  },
  methods: {
    startNewGame () {
      if (this.game && this.game.state !== 'stopped') {
        this.game.stop()
      }
      this.game = this.__createNewGame(this.$refs.canvas)
      this.game.start()
    },
    pauseGame () {
      this.game.pause()
    },
    startGame () {
      this.game.start()
    },
    __createNewGame (canvas) {
      let game = new Game(canvas, 400)
      let grid = new Grid()
      game.addObject(grid)
      return game
    }
  }
})

window.addEventListener('load', () => hidePreloader())
