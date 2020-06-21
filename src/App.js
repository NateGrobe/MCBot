import React from 'react'
import {
  Container,
  TextField,
  Button,
} from '@material-ui/core'

import { findUserId } from './reducers/userReducer'
import { connect } from 'react-redux'

import { channels } from './shared/constants'
const { ipcRenderer } = window

const App = (props) => {

  const getUserId = async event => {
    event.preventDefault()
    const content = event.target.username.value
    props.findUserId(content)
  }

  const startBot = () => {
    ipcRenderer.send(channels.START_BOT, {
      id: props.user.id
    })
  }

  const userForm = () => {
    return (
      <form onSubmit={getUserId}>
        <div>
          <TextField label='Username' name='username' />
        </div>
        <br />
        <div>
          <Button variant='contained' color='primary' type='submit'>
            submit
        </Button>
        </div>
      </form>
    )
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

  
  console.log(props.user)

  return (
    <Container>
      {props.user.length === 0 && userForm()}
      {props.user.length !== 0 && props.user.token}

      <br />
      <br />
      
      {props.user.length !== 0 && onButton()}


    </Container>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  findUserId
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
