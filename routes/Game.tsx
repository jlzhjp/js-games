import React, { useEffect, createRef } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import games from '../games'
import GameControl from '../components/GameControl'
import styles from '../styles/Game.css'

interface RouteInfo {
  id: string
}

const getGameInfo = (id: number) => games.find(x => x.id === id)

export default function Game(props: RouteComponentProps<RouteInfo>) {
  const gameInfo = getGameInfo(parseInt(props.match.params.id))
  if (!gameInfo) return <span>Error: Invalid game id!</span>

  return (
    <div className={styles.centerWrapper}>
      <GameControl name={gameInfo.name} init={gameInfo.init} />
    </div>
  )
}