import Vue from 'https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.1/vue.esm.browser.min'
import NavBar from './components/navbar'
import GameCard from './components/game_card'
import { hidePreloader } from './shared/utils'
import * as GitHub from './shared/github'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    NavBar,
    GameCard
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
