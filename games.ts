import placeholder from './assets/akari.jpg'
import SnakeInit from './src/_Snake/initializer'
import TetrisInit from './src/_Tetris/initializer'

export default [
  {
    id: 1,
    name: "Snake",
    source: "",
    cover: placeholder,
    init: SnakeInit
  },
  {
    id: 2,
    name: "Tetris",
    source: "",
    cover: placeholder,
    init: TetrisInit
  }
]