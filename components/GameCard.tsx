import { Button, Card, CardActionArea, CardActions, CardContent, Link, Typography } from '@material-ui/core'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import styles from '../styles/GameCard.scss'

interface IProps {
  name: string
  cover: string
  url: string
  src: string
}

export default function GameCard(props: IProps) {
  return (
    <div className={styles.wrapper}>
      <Card>
        <CardActionArea>
          <Link underline='none' component={RouterLink} to={props.url}>
            <img className={styles.cover} src={props.cover} />
          </Link>
          <CardContent>
            <Typography component='h3' variant='h3'>
              {props.name}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button href={props.src}>View Source</Button>
        </CardActions>
      </Card>
    </div>
  )
}