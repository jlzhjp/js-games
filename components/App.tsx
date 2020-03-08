import React from 'react'
import TopBar from './TopBar'
import { BrowserRouter as Router } from 'react-router-dom'
import styles from '../styles/App.css'
import Routes from '../routes/Routes'

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