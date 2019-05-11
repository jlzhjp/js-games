import NavBar from './components/navbar.js'
import GameCard from './components/gameCard.js'
import { hidePreloader } from './shared/utils.js'
import { games } from './shared/api.js'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    NavBar,
    GameCard
  },
  data: function () {
    return {
      games
    }
  }
})

window.addEventListener('load', () => hidePreloader())
