
export default class Food {
    constructor(gridj) {
        this._grid = grid
        this._grid.onrefresh.push((context) => {
            
        })
    }
    randomBetween(min, max) {
        min + Math.floor(Math.random() * (max - min))
    }

}