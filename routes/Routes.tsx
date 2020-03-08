import React from 'react'
import { Route, Switch } from 'react-router'
import { useLocation } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Game from '../routes/Game'
import Index from '../routes/Index'

export default function Routes() {
  const location = useLocation()
  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames={{
        enter: 'animated zoomIn faster',
      }} timeout={{
        enter: 500,
      }}>
        {/* make sure to pass `location` to `Switch` so it can match the old location as it animates out. */}
        <Switch location={location}>
          <Route path='/game/:id' component={Game} />
          <Route path='/' component={Index} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  )
}