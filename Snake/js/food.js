'use strict'

import { jsonEquals, } from '../../shared/utils.js'

export default class Food {
    constructor(snake) {
        this.__snake = snake
        this.__color = '#FFCDD2'
    }

    // Game Object
    get occupiedCells() {
        return [this.__foodPosition]
    }

    draw(context) {
        if (this.__foodPosition == undefined) {
            return
        }
        context.fillStyle = this.__color
        context.fillCell(this.__foodPosition.x, this.__foodPosition.y)
    }

    update(args) {
        if (this.__foodPosition === undefined) {
            this.__updateFoodPosition(args)
        } else if (this.__snake.occupiedCells.findIndex(
            p => jsonEquals(this.__foodPosition, p)
        ) > -1) {
            this.__snake.grow(1)
            this.__updateFoodPosition(args)
        }
    }

    __updateFoodPosition(args) {
        while (true) {
            let x = this.__random(0, args.gridWidth),
                y = this.__random(0, args.gridHeight)
            if (!args.occupiedCells.includes({
                x,
                y
            })) {
                this.__foodPosition = { x, y }
                break
            }
        }
    }

    __random(min, max) {
        return min + ((Math.random() * (max - min)) | 0)
    }
}
