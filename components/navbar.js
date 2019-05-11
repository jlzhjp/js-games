export default {
  template: `
    <nav class="nav">
      <div class="nav-heading text-primary">
        <slot></slot>
      </div>
      <a class="pure-button button-primary" href="https://www.github.com/jlzhjp/js-games">GitHub</a>
    </nav>
    `,
  methods: {
    openProfile () {
      window.open('https://github.com/jlzhjp', '_self')
    }
  }
}
