import { Button, Card, CardActionArea, CardActions, CardContent, Link, Typography } from '@material-ui/core'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import styles from '../styles/GameCard.css'

interface IProps {
  name: string
  cover: string
  url: string
}

export default function GameCard(props: IProps) {
  return (
    <div className={styles.wrapper}>
      <Link underline='none' component={RouterLink} to={props.url}>
        <Card>
          <CardActionArea>
            <img className={styles.cover} src={props.cover} />
            <CardContent>
              <Typography component='h3' variant='h3'>
                {props.name}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button>View Source</Button>
          </CardActions>
        </Card>
      </Link>
    </div>
  )
}