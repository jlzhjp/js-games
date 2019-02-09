import Vue from 'https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.1/vue.esm.browser.min.js'
import NavBar from './components/navbar.js'
import GameCard from './components/game_card.js'
import { hidePreloader } from './shared/utils.js'
import * as GitHub from './shared/github.js'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    'nav-bar': NavBar,
    'game-card': GameCard
  },
  data: function () {
    return {
      games: null
    }
  },
  created: async function () {
    this.games = await GitHub.getAllGames()
  }
})

window.addEventListener('load', () => hidePreloader())
