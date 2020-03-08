import React, { useState, createRef, useEffect } from 'react'
import Game, { GameState } from '../src/game'
import { Button, Typography, Card } from '@material-ui/core'
import styles from '../styles/GameControl.css'
import { StateChangedEventArgs, ScoreEventArgs } from '../src/eventArgs'
import red from '@material-ui/core/colors/red'
import green from '@material-ui/core/colors/green'
import yellow from '@material-ui/core/colors/yellow'

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
      .subscribe({ next: args => setScore(args.score) })
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

  const PanelTemplate: React.FC<{ children: React.ReactNode }> = (props) =>
    <div className={`animated fadeIn ${styles.mask}`}>
      {props.children}
    </div>


  const panel = (() => {
    switch (status) {
      case GameState.Init:
        return (
          <PanelTemplate>
            <Typography className={styles.title} variant='h2' component='h2'>{name}</Typography>
            <Button className={styles.btnFirst} onClick={start}>Start</Button>
          </PanelTemplate>
        )
      case GameState.Paused:
        return (
          <PanelTemplate>
            <Typography className={styles.title} variant='h2' component='h2'>Paused</Typography>
            <Typography className={styles.score} variant='h5' component='span'>Current Score: {score}</Typography>
            <Button className={styles.btnFirst} onClick={resume}>Resume</Button>
            <Button className={styles.btnSecond} onClick={back}>Back</Button>
          </PanelTemplate>
        )
      case GameState.Stopped:
        return (
          <PanelTemplate>
            <Typography className={styles.title} variant='h2' component='h2'>Game Over</Typography>
            <Typography className={styles.score} variant='h5' component='span'>Current Score: {score}</Typography>
            <Button className={styles.btnFirst} onClick={back}>Back</Button>
          </PanelTemplate>
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