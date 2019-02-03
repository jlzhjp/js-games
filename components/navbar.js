'use strict'

import * as GitHub from '../shared/github.js'

export default {
    template: `
        <nav class="nav">
            <div class="nav-heading">
                <slot></slot>
            </div>
            <a class="button pure-button" href="https://www.github.com/jlzhjp/js-games">GitHub</a>
            <img class="avatar" :src="avatarUrl" />
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