import Shade from './shade.js'
import Swticher from './switcher.js'

export default {
    template: `
    <shade :show="showShade">
        <slot></slot>
        <switcher slot="shade-content" :show="show">
            <div class="control-panel" slot="new">
                <h2 class="control-panel-title text-primary">{{ title }}</h2>
                <button class="pure-button button-secondary" @click="handleStartNew()">Start</button>
            </div>

            <div class="control-panel" slot="pause">
                <h2 class="control-panel-title text-primary">Paused</h2>
                <div class="text-success">Current Score: {{ score }}</div>
                <button class="pure-button button-secondary" @click="handleStart()">Continue</button>
                <button class="pure-button button-error" @click="handleStartNew()">Restart</button>
            </div>

            <div class="control-panel" slot="over">
                <h2 class="control-panel-title text-primary">Game Over</h2>
                <div class="text-success">Your Score: {{ score }}</div>
                <button class="pure-button button-secondary" @click="handleStartNew()">Restart</button>
            </div>
        </switcher>
    </shade>
    `,
    props: {
        title: {
            type: String,
            required: true,
        },
        over: {
            type: Boolean,
            default: false,
        },
        score: {
            type: Number,
            default: 0,
        },
    },
    data: () => {
        return {
            show: 'new',
        }
    },
    computed: {
        showShade() {
            return this.show !== 'none'
        }
    },
    components: {
        'shade': Shade,
        'switcher': Swticher,
    },
    methods: {
        handleStartNew() {
            this.$emit('onstartnew')
            this.show = 'none'
        },
        handlePause() {
            this.$emit('onpause')
            this.show = 'pause'
        },
        handleStart() {
            this.$emit('onstart')
            this.show = 'none'
        },
    },
    mounted() {
        window.addEventListener('blur', () => {
            if (this.show === 'none') {
                this.handlePause()
            }
        })
        window.addEventListener('keypress', (event) => {
            if (event.key === ' ') {
                event.preventDefault()
                this.handlePause()
            }
        })
    },
    updated() {
        if (this.over) {
            this.show = 'over'
        }
    }
}
