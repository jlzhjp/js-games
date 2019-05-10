export default {
  template: `
    <nav class="nav">
      <div class="nav-heading text-primary">
        <slot></slot>
      </div>
      <a class="pure-button button-primary" href="https://www.github.com/jlzhjp/js-games">GitHub</a>
      <img class="avatar" src="https://avatars3.githubusercontent.com/u/35339647?s=460&v=4" @click="openProfile()"/>
    </nav>
    `,
  methods: {
    openProfile () {
      window.open('https://github.com/jlzhjp', '_self')
    }
  }
}
