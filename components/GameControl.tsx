import { Button, Card, Typography } from '@material-ui/core'
import React, { createRef, useEffect, useState } from 'react'
import { ScoreEventArgs, StateChangedEventArgs } from '../src/eventArgs'
import Game, { GameState } from '../src/game'
import styles from '../styles/GameControl.scss'

interface IProps {
  name: string
  init: (canvas: HTMLCanvasElement) => Game
}

let game: Game | null = null

export default function GameControl(props: IProps) {
  const { name, init } = props
  const [status, setStatus] = useState<GameState>(GameState.Init)
  const [score, setScore] = useState<number>(0)
  const canvasRef = createRef<HTMLCanvasElement>()

  const start = () => {
    if (game === null) {
      game = init(canvasRef.current as HTMLCanvasElement)
    }
    game.events.get<StateChangedEventArgs>('statechanged')
      .subscribe({ next: args => setStatus(args.newState) })
    game.events.get<ScoreEventArgs>('score')
      .subscribe({ next: args => setScore(prev => prev + args.score) })
    game.start()
  }

  const stop = () => game?.stop()
  const pause = () => game?.pause()
  const resume = () => game?.resume()
  const back = () => {
    game?.stop()
    game = null
    setStatus(GameState.Init)
  }

  useEffect(() => {
    game = init(canvasRef.current as HTMLCanvasElement)
    return () => {
      stop()
      game = null
    }
  }, [])

  const handleKeypress = (e: KeyboardEvent) => {
    if (e.key === ' ') {
      if (status === GameState.Running) {
        pause()
      } else if (status === GameState.Paused) {
        resume()
      }
    }
  }
  const handleBlur = (_: FocusEvent) => pause()

  // https://stackoverflow.com/questions/53845595
  useEffect(() => {
    document.addEventListener('keypress', handleKeypress)
    window.addEventListener('blur', handleBlur)

    return () => {
      document.removeEventListener('keypress', handleKeypress)
      document.removeEventListener('blur', handleBlur)
    }
  })

  const panel = (() => {
    switch (status) {
      case GameState.Init:
        return (
          <div className={`${styles.mask}`}>
            <Typography className={styles.title} variant='h2' component='h2'>{name}</Typography>
            <Button className={styles.actionFirst} onClick={start}>Start</Button>
          </div>
        )
      case GameState.Paused:
        return (
          <div className={`animated fadeIn ${styles.mask}`}>
            <Typography className={styles.title} variant='h2' component='h2'>Paused</Typography>
            <Typography className={styles.score} variant='h5' component='span'>Current Score: {score}</Typography>
            <Button className={styles.actionFirst} onClick={resume}>Resume</Button>
            <Button className={styles.actionSecond} onClick={back}>Back</Button>
          </div>
        )
      case GameState.Stopped:
        return (
          <div className={`animated fadeIn ${styles.mask}`}>
            <Typography className={styles.title} variant='h2' component='h2'>Game Over</Typography>
            <Typography className={styles.score} variant='h5' component='span'>Current Score: {score}</Typography>
            <Button className={styles.actionFirst} onClick={back}>Back</Button>
          </div>
        )
      case GameState.Running:
        return null
    }
  })()

  return (
    <div className={styles.wrapper}>
      {panel}
      <Card>
        <canvas className={styles.canvas} ref={canvasRef} />
      </Card>
    </div>
  )
}