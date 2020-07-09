import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { useState } from 'react'
import { ThemeProvider } from 'react-jss'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import { merge, of, fromEvent } from 'rxjs'
import config from './config'
import Game from './routes/Game'
import Home from './routes/Home'
import { applyAnimation } from './src/ui/backgroundAnimation'
import {
  AppBar,
  Toolbar,
  IconButton,
  Icon,
  Typography,
  Avatar,
  createMuiTheme,
  makeStyles,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
  ListSubheader,
  StylesProvider,
} from '@material-ui/core'
import { create } from 'jss'
import preset from 'jss-preset-default'

const jss = create(preset())

const background = document.querySelector<HTMLCanvasElement>('#background')!

merge(of(undefined), fromEvent(window, 'resize')).subscribe(() => {
  background.width = document.body.clientWidth
  background.height = document.body.clientHeight
})

applyAnimation(background)

const theme = createMuiTheme({})
document.body.style.backgroundColor = theme.palette.background.default

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
  list: {
    width: '250px',
  },
  container: {
    marginTop: '1rem',
  },
}))

const App = () => {
  const styles = useStyles()

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AppBar position='static'>
            <Toolbar>
              <IconButton
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                edge='start'
                aria-label='menu'
              >
                <Icon>menu</Icon>
              </IconButton>
              <Typography
                className={styles.title}
                variant='h6'
                component={Link}
                to='/'
              >
                Games
              </Typography>
              <Avatar alt={config.author} src={config.avatar} />
            </Toolbar>
          </AppBar>

          <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
            <div className={styles.list} onClick={() => setIsDrawerOpen(false)}>
              <List>
                <ListItem button component={Link} to='/'>
                  <ListItemIcon>
                    <Icon>home</Icon>
                  </ListItemIcon>
                  <ListItemText>Home</ListItemText>
                </ListItem>
              </List>
              <Divider />
              <ListSubheader>Games</ListSubheader>
              <List>
                {config.games.map((game) => (
                  <ListItem
                    button
                    key={game.id}
                    component={Link}
                    to={`/game/${game.id}`}
                  >
                    <ListItemText>{game.name}</ListItemText>
                  </ListItem>
                ))}
              </List>
            </div>
          </Drawer>

          <div className={styles.container}>
            <Switch>
              {/* Remount when parameters change */}
              <Route path='/game/:id' key={location.pathname}>
                <Game />
              </Route>
              <Route path='/'>
                <Home />
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </StylesProvider>
  )
}

ReactDOM.render(<App />, document.querySelector('#root'))
