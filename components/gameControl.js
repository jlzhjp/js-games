import Shade from './shade.js'
import Swticher from './switcher.js'

export default {
  template: `
    <shade :show="showShade">
      <slot></slot>
      <switcher slot="shade-content" :show="show">
        <div class="control-panel" slot="new">
          <h2 class="control-panel-title text-primary">{{ title }}</h2>
          <button class="pure-button button-secondary" @click="$emit('onstart')">Start</button>
        </div>

        <div class="control-panel" slot="pause">
          <h2 class="control-panel-title text-primary">Paused</h2>
          <div class="text-success">Current Score: {{ score }}</div>
          <button class="pure-button button-secondary" @click="$emit('onresume')">Continue</button>
          <button class="pure-button button-error" @click="$emit('onrestart')">Restart</button>
        </div>

        <div class="control-panel" slot="over">
          <h2 class="control-panel-title text-primary">Game Over</h2>
          <div class="text-success">Your Score: {{ score }}</div>
          <button class="pure-button button-secondary" @click="$emit('onrestart')">Restart</button>
        </div>
      </switcher>
    </shade>
  `,
  props: {
    show: {
      type: String,
      default: 'new'
    },
    title: {
      type: String,
      required: true
    },
    score: {
      type: Number,
      default: 0
    }
  },
  computed: {
    showShade () {
      return this.show !== 'none'
    }
  },
  components: {
    shade: Shade,
    switcher: Swticher
  },
  mounted () {
    window.addEventListener('blur', () => {
      if (this.show === 'none') {
        this.$emit('onpause')
      }
    })
    window.addEventListener('keypress', event => {
      if (event.key === ' ') {
        event.preventDefault()
        this.$emit('onpause')
      }
    })
  }
}
