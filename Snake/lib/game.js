'use strict'

import Container from './container.js'

export default class Game extends Container {
    constructor(canvas) {
        if (Game.__has === true) {
            throw 'Another instance is running.'
        }
        super()
        this.__canvas = canvas
        this.__context = this.__canvas.getContext('2d')
        this.__tick = 50
        this.__intervalId = null
        this.__state = null

        this.__onstop= []
        this.__onscore = []

        this.__objects = []
        this.__background = 'white'
        this.__score = 0
        Game.__has = true
    }

    get mapHeight() {
        return this.__canvas.height
    }
    get mapWidth() {
        return this.__canvas.width
    }
    get state() {
        return this.__state
    }
    get onstop() {
        return this.__onstop
    }
    get onscore() {
        return this.__onscore
    }
    get score() {
        return this.__score
    }

    set score(value) {
        this.__score = value
        this.onscore.forEach((listener) => listener(this.score))
    }

    start() {
        if (this.__state === 'stopped') {
            throw 'This game has stopped.'
        }

        this.__intervalId = setInterval(() => {
            for (let obj of super._objects) {
                obj.update({ game: this })
            }

            this.__context.fillStyle = this.__background
            this.__context.fillRect(0, 0, this.mapWidth, this.mapHeight)

            for (let obj of super._objects) {
                obj.draw(this.__context)
            }
        }, this.__tick)

        this.__state = 'running'
    }

    pause() {
        if (this.__state === 'paused') {
            return
        }
        if (this.__intervalId) {
            clearInterval(this.__intervalId)
            this.__state = 'paused'
        }
    }

    stop() {
        if (this.__state === 'stopped') {
            return
        }
        this.pause()
        this.__state = 'stopped'
        this.__onstop.forEach(listener => listener())
        Game.__has = false
    }
}