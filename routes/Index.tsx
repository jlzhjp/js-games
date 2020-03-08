import React from 'react'
import GameCard from '../components/GameCard'
import games from '../games'
import styles from '../styles/Index.css'

const getGameCards = () =>
  games.map(g => {
    const url = `/game/${g.id}`
    return <GameCard key={g.id} name={g.name} cover={g.cover} url={url} />
  })

export default function Index() {
  return (
    <div className={styles.gameCardWrapper}>
      {getGameCards()}
    </div>
  )
}