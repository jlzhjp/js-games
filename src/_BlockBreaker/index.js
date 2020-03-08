import Game from '../shared/game.js'
import GameState from '../shared/gameState.js'
import EventCenter from '../shared/eventCenter.js';
import { hidePreloader } from '../shared/utils.js';
import NavBar from '../components/navbar.js'
import GameControl from '../components/gameControl.js'
import Baffle from './lib/baffle.js';
import Ball from './lib/ball.js'

window.game = null

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    NavBar,
    GameControl,
  },
  data: () => {
    return {
      score: 0,
      show: 'start'
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
      this.show = 'start'
    },
    __createNewGame (canvas) {
      let event = new EventCenter()
      let game = new Game(event, canvas, 60 / 1000)
      new Ball(event)
      new Baffle(event)

      event.listen('stop', (_) => { this.show = 'over' })
      event.listen('score', (args) => { this.score += args.score })

      return game
    }
  },
})

window.addEventListener('load', () => hidePreloader())