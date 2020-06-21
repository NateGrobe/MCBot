import React from 'react'

import { Container } from '@material-ui/core'
import ChannelForm from './components/ChannelForm'
import BotPage from './components/BotPage'
import {
  Link,
  Switch,
  Route
} from 'react-router-dom'



const App = () => {


  /*
  const startBot = () => {
    ipcRenderer.send(channels.START_BOT, {
      id: props.user.id
    })
  }

  const onButton = () => {
    return (
      <Button variant='contained' color='primary' onClick={startBot}>
        Run Bot
      </Button>
    )
  }

  const offButton = () => {
    return (
      <Button variant='contained' color='primary' >
        Run Bot
      </Button>
    )
  }
  */

  const style = { padding: 5 }


  return (
    <Container>
      <div>
        <Link style={style} to='/'>Channel</Link>
        <Link style={style} to='/bot'>Bot</Link>
      </div>

      <Switch>
        <Route path='/bot'>
          <BotPage />
        </Route>
        <Route path='/'>
          <ChannelForm />
        </Route>
      </Switch>

    </Container>
  )
}

export default App
