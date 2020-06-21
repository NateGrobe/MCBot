import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { channels } from '../shared/constants'
const { ipcRenderer } = window

const BotPage = props => {
  const [botStarted, setBotStarted] = useState(false)
  const [botButtonVal, setBotButtonVal] = useState('start')

  const runBot = () => {
    if (!botStarted) {
      ipcRenderer.send(channels.START_BOT, {
        id: props.channel.id,
        status: 'run'
      })
      setBotStarted(true)
      setBotButtonVal('stop')
    } else {
      ipcRenderer.send(channels.START_BOT, {
        id: props.channel.id,
        status: 'stop'
      })
      setBotButtonVal('start')
      setBotStarted(false)
    }
  }

  const noChannelSelected = () => {
    return (
      <h1>Please select a channel</h1>
    )
  }

  const runBotButton = () => {
    return (
      <Button variant='contained' color='primary' onClick={runBot}>
        {botButtonVal}
      </Button>
    )
  }

  return (
    <div>
      {!props.channel.id && noChannelSelected()}
      {props.channel.token}
      <br />
      <br />
      {props.channel.id && runBotButton()}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    channel: state.channel
  }
}

export default connect(
  mapStateToProps,
  null
)(BotPage)
