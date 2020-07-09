import SimpleGame from './src/simpleGame'
import Foods from './src/Snake/foods'
import SnakeGrid from './src/Snake/grid'
import TetrisGrid from './src/Tetris/grid'
import Snake from './src/Snake/snake'

export default {
  author: 'jlzhjp',
  avatar: 'https://avatars1.githubusercontent.com/u/35339647?s=100',
  repo: 'https://github.com/jlzhjp/web-games',
  theme: {
    backgroundColor: '#ffffff',
  },
  games: [
    {
      id: 1,
      name: 'Snake',
      game: () =>
        new SimpleGame(600, 600, 50).withSubjects([
          new SnakeGrid(40, 40),
          new Snake(),
          new Foods(),
        ]),
    },
    {
      id: 2,
      name: 'Tetris',
      game: () => new SimpleGame(500, 500, 500).withSubjects([
        new TetrisGrid()
      ])
    },
  ],
}
