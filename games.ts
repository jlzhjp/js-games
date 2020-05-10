import placeholder from './assets/akari.jpg'
import blockBreakerInit from './src/_BlockBreaker/initializer'
import snakeInit from './src/_Snake/initializer'
import tetrisInit from './src/_Tetris/initializer'

export default [
  {
    id: 1,
    name: 'Snake',
    src: 'https://github.com/jlzhjp/web-games/tree/master/src/_Snake',
    cover: placeholder,
    init: snakeInit
  },
  {
    id: 2,
    name: 'Tetris',
    src: 'https://github.com/jlzhjp/web-games/tree/master/src/_Tetris',
    cover: placeholder,
    init: tetrisInit
  },
  {
    id: 3,
    name: 'BlockBreaker',
    src: 'https://github.com/jlzhjp/web-games/tree/master/src/_BlockBreaker',
    cover: placeholder,
    init: blockBreakerInit
  }
]
