import * as GitHub from '../shared/github.js'

export default {
    template: `
        <nav class="nav">
            <div class="left-group">
                <div class="nav-heading">
                    <slot></slot>
                </div>
            </div>
            <div class="right-group">
                <a class="pure-button gh-button" href="https://www.github.com/jlzhjp/js-games">GitHub</a>
                <img class="gh-avatar" :src="avatarUrl" />
            </div>
        </nav>
    `,
    data: function () {
        return {
            avatarUrl: null,
        }
    },
    created: async function () {
        this.avatarUrl = await GitHub.getAvatarUrl()
    }
}