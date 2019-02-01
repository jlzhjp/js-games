export default {
    template: `
        <div class="card-1 hoverable game-card" @click="openGame">
            <img class="pure-img game-cover" :src="cover" />
            <div class="card-footer">
                <span class="card-title">{{ title }}</span>
                <a class="button pure-button game-link" :href="projurl">Source</a>
            </div>
        </div>
    `,
    props: {
        title: String,
        url: String,
        cover: String,
        projurl: String,
    },
    methods: {
        openGame() {
            window.open(this.url, '_self')
        }
    }
}