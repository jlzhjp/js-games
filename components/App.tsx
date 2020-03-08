import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from '../routes/Routes'
import styles from '../styles/App.css'
import TopBar from './TopBar'

export default function App() {
  return (
    <Router>
      <TopBar />
      <div className={styles.wrapper}>
        <Routes />
      </div>
    </Router>
  )
}