export default class Game {
    constructor(canvas) {
        this._canvas = canvas
        this._context = this._canvas.getContext('2d')
        this._fps = 20
        this._intervalId = null
        this._onrefresh = []
        this._stopped = false

        this._context.fillStyle = 'white'
        // Initialize
        this._context.fillRect(0, 0, this.mapWidth, this.mapHeight)
    }

    get mapHeight() {
        return this._canvas.height
    }

    get mapWidth() {
        return this._canvas.width
    }

    get onrefresh() {
        return this._onrefresh
    }

    // 事件相关
    register(type, listener, options) {
        window.addEventListener(type, listener, options)
    }

    unregister(type, listener, options) {
        window.removeEventListener(type, listener, options)
    }

    start() {
        if (this._stopped)
            throw Error('This game has stopped.')
        this._intervalId = setInterval(() => {
            for (let listener of this._onrefresh) {
                listener(this._context)
            }
        }, 1000 / this._fps)
    }

    pause() {
        clearInterval(this._intervalId)
    }

    stop() {
        clearInterval(this._intervalId)
    }
}