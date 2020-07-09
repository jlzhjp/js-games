import * as React from 'react'
import { Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    textAlign: 'center'
  }
})

export default function Home() {
  const styles = useStyles()
  return (
    <div className={styles.root}>
      <Typography variant='h1' component='h1'>
        Welcome!
      </Typography>
    </div>
  )
}
