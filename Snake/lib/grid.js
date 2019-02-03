'use strict'

import Container from './container.js'

export default class Grid extends Container {
    constructor(gridWidth, gridHeight) {
        super()
        this.__background = 'white'
        this.__gridWidth = gridWidth
        this.__gridHeight = gridHeight
    }

    update(args) {
        for (let obj of super._objects) {
            obj.update({
                game: args.game,
                gridWidth: this.__gridWidth,
                gridHeight: this.__gridHeight,
                occupiedCells: this.__getOccupiedCells()
            })
        }
    }

    draw(context) {
        context.fillStyle = this.__background
        context.fillRect(0, 0, context.canvas.width, context.canvas.height)
        for (let obj of super._objects) {
            obj.draw(this.__getGridDrawingContext(context))
        }
    }

    get gridWidth() {
        return this.__gridWidth
    }

    get gridHeight() {
        return this.__gridHeight
    }

    __getOccupiedCells() {
        let res = []
        for (let obj of super._objects) {
            res.push(...obj.occupiedCells)
        }
        return res
    }

    __getGridDrawingContext(context) {
        let cellWidth = context.canvas.width / this.__gridWidth,
            cellHeight = context.canvas.height / this.__gridWidth
        return {
            set fillStyle(value) {
                context.fillStyle = value
            },
            get fillStyle() {
                return context.fillStyle
            },
            fillCell: (x, y) => {
                context.fillRect(cellWidth * x, cellHeight * y, cellWidth, cellHeight)
            }
        }
    }
}
