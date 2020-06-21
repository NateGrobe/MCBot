import React from 'react'
import {
  TextField,
  Button,
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'

//redux
import { findChannel, clearChannel } from '../reducers/channelReducer'
import { connect } from 'react-redux'


const ChannelForm = props => {
  const history = useHistory()

  const getChannel = async event => {
    event.preventDefault()
    const content = event.target.username.value
    await props.findChannel(content)
    history.push('/bot')
  }

  const clearChannel = async () => {
    props.clearChannel()
  }

  const channelInput = () => {
    return (
      <div>
        <form onSubmit={getChannel}>
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
      </div>
    )
  }

  const channelSelected = () => {
    return (
      <div>
        Welcome {props.channel.token}

        <Button variant='contained' color='primary' onClick={clearChannel}>
          change
        </Button>
      </div>
    )
  }

  return (
    <div>
      {!props.channel.id && channelInput()}
      {props.channel.id && channelSelected()}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    channel: state.channel
  }
}

const mapDispatchToProps = {
  findChannel,
  clearChannel
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelForm)
