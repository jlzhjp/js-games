import placeholder from './assets/akari.jpg'
import SnakeInit from './src/_Snake/initializer'
import TetrisInit from './src/_Tetris/initializer'

export default [
  {
    id: 1,
    name: 'Snake',
    src: 'https://github.com/jlzhjp/web-games/tree/master/src/_Snake',
    cover: placeholder,
    init: SnakeInit
  },
  {
    id: 2,
    name: 'Tetris',
    src: 'https://github.com/jlzhjp/web-games/tree/master/src/_Tetris',
    cover: placeholder,
    init: TetrisInit
  }
]