import * as GitHub from '../shared/github.js'

export default {
    template: `
    <nav class="nav">
        <div class="nav-heading text-primary">
            <slot></slot>
        </div>
        <a class="pure-button button-primary" href="https://www.github.com/jlzhjp/js-games">GitHub</a>
        <img class="avatar" :src="avatarUrl" @click="openProfile()"/>
    </nav>
    `,
    data: () => {
        return {
            avatarUrl: null,
        }
    },
    methods: {
        openProfile() {
            window.open('https://github.com/jlzhjp', '_self')
        }
    },
    created: async function () {
        this.avatarUrl = await GitHub.getAvatarUrl()
    },
}
