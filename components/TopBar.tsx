import React, { useState } from 'react'
import { AppBar, Typography, Toolbar, Avatar } from '@material-ui/core'
import avatar from '../assets/akari.jpg'
import styles from '../styles/TopBar.css'

export default function TopBar() {
  return (
    <React.Fragment>
      <AppBar position='static'>
        <Toolbar>
          <Typography className={styles.title} variant="h6">Games</Typography>
          <Avatar src={avatar} />
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}