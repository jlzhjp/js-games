import { AppBar, Avatar, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import avatar from '../assets/akari.jpg'
import styles from '../styles/TopBar.scss'

export default function TopBar() {
  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <Typography className={styles.title} variant="h6">Games</Typography>
          <Avatar src={avatar} />
        </Toolbar>
      </AppBar>
    </>
  )
}