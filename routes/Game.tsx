import * as React from 'react'
import { useRef, useEffect, useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import config from '../config'
import GameControl from '../components/GameControl'

export default function Game() {
  const { id } = useParams()
  const gameInfo = useRef(
    () => config.games.find((g) => g.id.toString() === id)!
  )
  const gameRef = useRef(() => gameInfo.current().game())
  useEffect(() => gameRef.current().stop())

  if (!gameInfo) return <span>Invalid game id.</span>

  return (
    <div>
      <GameControl
        name={gameInfo.current().name}
        game={gameRef.current()}
      />
    </div>
  )
}
