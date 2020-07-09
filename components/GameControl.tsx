import Game, { GameState } from '../Game'
import { useRef, useEffect, useCallback } from 'react'
import * as React from 'react'
import { useObservable } from 'rxjs-hooks'
import {
  Button,
  Typography,
  makeStyles,
  Card,
} from '@material-ui/core'

interface Prop {
  name: string
  game: Game
}

const useStyles = makeStyles({
  root: {
    position: 'relative',
    margin: '0 auto',
    height: 'fit-content',
    width: 'fit-content',
  },
  panel: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(5px)',
    textAlign: 'center',
    width: '100%',
    height: '100%',
  },
  panelItem: {
    position: 'absolute',
  },
  title: {
    extend: 'panelItem',
    position: 'absolute',
    top: '10%',
    width: '100%',
    textAlign: 'center',
  },
  subtitle: {
    extend: 'panelItem',
    top: '25%',
    width: '100%',
    textAlign: 'center',
  },
  action1: {
    extend: 'panelItem',
    top: '50%',
  },
  action2: {
    extend: 'panelItem',
    top: '70%',
  },
  canvas: {
    display: 'block',
  },
})

export default function GameControl(prop: Prop) {
  const { name, game } = prop
  const styles = useStyles()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const gameState = useObservable(() => game.state$, GameState.Init)
  const totalScore = useObservable(() => game.totalScore$, 0)

  const startClickCallback = useCallback(() => {
    if (canvasRef.current) {
      game.start(canvasRef.current)
    }
  }, [])

  const resumeClickCallback = useCallback(() => {
    game.resume()
  }, [])

  useEffect(() => {
    const blurHandler = () => game.pause()
    const keyPressHandler = (e: KeyboardEvent) => {
      if (e.key === ' ') game.pause()
    }

    window.addEventListener('blur', blurHandler)
    window.addEventListener('keypress', keyPressHandler)

    return () => {
      window.removeEventListener('blur', blurHandler)
      window.removeEventListener('keypress', keyPressHandler)
    }
  }, [])

  const renderPanel = () => {
    switch (gameState) {
      case GameState.Init:
        return (
          <div className={styles.panel}>
            <Typography className={styles.title} variant='h2'>
              {name}
            </Typography>
            <Button className={styles.action1} onClick={startClickCallback}>
              Start
            </Button>
          </div>
        )
      case GameState.Running:
        return null
      case GameState.Paused:
        return (
          <div className={styles.panel}>
            <Typography className={styles.title} variant='h2'>
              Paused
            </Typography>
            <Typography className={styles.subtitle} variant='subtitle1'>
              Your Score: {totalScore}
            </Typography>
            <Button className={styles.action1} onClick={resumeClickCallback}>
              Resume
            </Button>
          </div>
        )
      case GameState.Stopped:
        return (
          <div className={styles.panel}>
            <Typography className={styles.title} variant='h2'>
              Game Over
            </Typography>
            <Typography className={styles.subtitle} variant='subtitle1'>
              Your Score: {totalScore}
            </Typography>
          </div>
        )
    }
  }

  return (
    <Card className={styles.root}>
      {renderPanel()}
      <canvas
        className={styles.canvas}
        height={game.canvasHeight}
        width={game.canvasWidth}
        ref={canvasRef}
      ></canvas>
    </Card>
  )
}
