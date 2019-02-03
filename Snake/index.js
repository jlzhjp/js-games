'use strict'

import Vue from 'https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.0-beta.3/vue.esm.browser.js'
import NavBar from '../components/navbar.js'
import Swticher from '../components/switcher.js'
import Shade from '../components/shade.js'
import GameController from './lib/game_controller.js'
import { hidePreloader } from '../shared/utils.js'

let vm = new Vue({
    el: '#app',
    data: function () {
        return {
            show: 'new'
        }
    },
    computed: {
        showShade() {
            return this.show !== 'none'
        }
    },
    components: {
        'nav-bar': NavBar,
        'shade': Shade,
        'switcher': Swticher,
    },
    methods: {
        startNew() {
            window.controller.startNew()
            this.show = 'none'
        },
        start() {
            window.controller.start()
            this.show = 'none'
        },
        pause() {
            window.controller.pause()
            this.show = 'pause'
        },
    },
    mounted: function () {
        window.controller = new GameController(this.$refs.canvas)
        controller.game.onstop.push(() => vm.show = 'over')
    }
})

window.addEventListener('load', () => hidePreloader())
window.addEventListener('blur', () => {
    if (vm.show === 'none') {
        vm.pause()
    }
})
window.addEventListener('keypress', event => {
    event.preventDefault()
    if (event.key === ' ' && vm.show === 'none') {
        vm.pause()
    }
})